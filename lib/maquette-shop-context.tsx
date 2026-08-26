"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const FAVORITES_KEY = "ojetables-maquette-favorites";
const CART_COUNT_KEY = "ojetables-maquette-cart-count";
const CART_CHANGED_EVENT = "ojetables-maquette-cart-changed";
const FAVORITES_CHANGED_EVENT = "ojetables-maquette-favorites-changed";

const EMPTY_FAVORITES_RAW = "[]";

type MaquetteShopContextValue = {
  cartCount: number;
  favoriteKeys: ReadonlySet<string>;
  addToCart: (productKey: string, productName: string) => void;
  toggleFavorite: (productKey: string) => void;
  isFavorite: (productKey: string) => boolean;
};

const MaquetteShopContext = createContext<MaquetteShopContextValue | null>(null);

function readFavoriteKeysRaw(): string {
  try {
    return window.sessionStorage.getItem(FAVORITES_KEY) ?? EMPTY_FAVORITES_RAW;
  } catch {
    return EMPTY_FAVORITES_RAW;
  }
}

function parseFavoriteKeys(raw: string): Set<string> {
  try {
    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed);
  } catch {
    return new Set();
  }
}

function readCartCount(): number {
  try {
    const raw = window.sessionStorage.getItem(CART_COUNT_KEY);
    const value = Number.parseInt(raw ?? "0", 10);
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function subscribeToStore(eventName: string, onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
}

export function MaquetteShopProvider({ children }: { children: ReactNode }) {
  // sessionStorage n’est lu qu’après hydratation — évite mismatch SSR (favoris / panier).
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    setSessionReady(true);
  }, []);

  const cartCountStored = useSyncExternalStore(
    (onStoreChange) => subscribeToStore(CART_CHANGED_EVENT, onStoreChange),
    readCartCount,
    () => 0,
  );

  const favoriteKeysRawStored = useSyncExternalStore(
    (onStoreChange) => subscribeToStore(FAVORITES_CHANGED_EVENT, onStoreChange),
    readFavoriteKeysRaw,
    () => EMPTY_FAVORITES_RAW,
  );

  const cartCount = sessionReady ? cartCountStored : 0;
  const favoriteKeys = useMemo(
    () => (sessionReady ? parseFavoriteKeys(favoriteKeysRawStored) : new Set<string>()),
    [favoriteKeysRawStored, sessionReady],
  );

  const persistFavorites = useCallback((keys: Set<string>) => {
    window.sessionStorage.setItem(FAVORITES_KEY, JSON.stringify([...keys]));
    window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
  }, []);

  const persistCartCount = useCallback((count: number) => {
    window.sessionStorage.setItem(CART_COUNT_KEY, String(count));
    window.dispatchEvent(new Event(CART_CHANGED_EVENT));
  }, []);

  const addToCart = useCallback(
    (productKey: string, productName: string) => {
      void productKey;
      void productName;
      persistCartCount(readCartCount() + 1);
    },
    [persistCartCount],
  );

  const toggleFavorite = useCallback(
    (productKey: string) => {
      const next = new Set(parseFavoriteKeys(readFavoriteKeysRaw()));
      if (next.has(productKey)) {
        next.delete(productKey);
      } else {
        next.add(productKey);
      }
      persistFavorites(next);
    },
    [persistFavorites],
  );

  const isFavorite = useCallback(
    (productKey: string) => favoriteKeys.has(productKey),
    [favoriteKeys],
  );

  const value = useMemo(
    () => ({
      cartCount,
      favoriteKeys,
      addToCart,
      toggleFavorite,
      isFavorite,
    }),
    [cartCount, favoriteKeys, addToCart, toggleFavorite, isFavorite],
  );

  return <MaquetteShopContext.Provider value={value}>{children}</MaquetteShopContext.Provider>;
}

export function useMaquetteShop(): MaquetteShopContextValue {
  const context = useContext(MaquetteShopContext);
  if (!context) {
    throw new Error("useMaquetteShop must be used within MaquetteShopProvider");
  }
  return context;
}
