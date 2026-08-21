"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Check, Copy, Tag, XIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  dismissLeadMagnet,
  getScrollProgress,
  LEAD_MAGNET_RESET_EVENT,
  useScrollTrigger,
} from "@/hooks/use-scroll-trigger";
import { leadMagnet } from "@/lib/site";
import { cn } from "@/lib/utils";

export function LeadMagnetPopup() {
  const scrollTriggered = useScrollTrigger();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (scrollTriggered) {
      setOpen(true);
    }
  }, [scrollTriggered]);

  useEffect(() => {
    function handleReset() {
      setEmail("");
      setRevealed(false);
      setCopied(false);
      setOpen(getScrollProgress() >= leadMagnet.scrollThreshold);
    }

    window.addEventListener(LEAD_MAGNET_RESET_EVENT, handleReset);
    return () => window.removeEventListener(LEAD_MAGNET_RESET_EVENT, handleReset);
  }, []);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      dismissLeadMagnet();
    }
    setOpen(nextOpen);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setRevealed(true);
  }

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(leadMagnet.promoCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-[100] bg-black/20 transition-opacity duration-200",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
            "supports-backdrop-filter:backdrop-blur-[2px]",
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed left-1/2 top-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2",
            "rounded-3xl border border-brand-kraft/30 bg-gradient-to-br from-brand-beige to-white p-6 shadow-2xl md:p-8",
            "transition duration-200 ease-out",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0",
          )}
        >
          <div className="text-center">
            <div
              className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-brand-teal/15 text-brand-teal"
              aria-hidden
            >
              <Tag className="size-5" />
            </div>
            <Dialog.Title className="mt-4 font-bold tracking-tight text-brand-navy">
              <span className="block text-4xl leading-none text-brand-teal md:text-5xl">
                {leadMagnet.titleDiscount}
              </span>
              <span className="mt-2 block text-lg md:text-xl">{leadMagnet.titleRest}</span>
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {revealed ? leadMagnet.revealedDescription : leadMagnet.description}
            </Dialog.Description>
          </div>

          {!revealed ? (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2 text-left">
                <Label htmlFor="lead-magnet-email">Votre e-mail</Label>
                <Input
                  id="lead-magnet-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="vous@etablissement.fr"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="h-10 rounded-md bg-white"
                />
              </div>
              <Button type="submit" variant="brand" size="cta" className="w-full">
                {leadMagnet.emailCta}
              </Button>
              <Dialog.Close
                render={
                  <button
                    type="button"
                    className="w-full text-center text-sm text-muted-foreground transition-colors hover:text-brand-navy"
                  />
                }
              >
                {leadMagnet.dismissLabel}
              </Dialog.Close>
            </form>
          ) : (
            <>
              <div className="mt-6 rounded-2xl border-2 border-dashed border-brand-teal/35 bg-white px-4 py-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">
                  {leadMagnet.promoLabel}
                </p>
                <p className="mt-2 font-mono text-3xl font-bold tracking-widest text-brand-navy">
                  {leadMagnet.promoCode}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{leadMagnet.promoNote}</p>
              </div>

              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "brand", size: "cta" }),
                  "mt-5 inline-flex w-full items-center justify-center gap-2",
                )}
                onClick={handleCopyCode}
              >
                {copied ? (
                  <>
                    <Check className="size-4 shrink-0" aria-hidden />
                    {leadMagnet.copySuccessLabel}
                  </>
                ) : (
                  <>
                    <Copy className="size-4 shrink-0" aria-hidden />
                    {leadMagnet.copyCta}
                  </>
                )}
              </button>

              <Dialog.Close
                render={
                  <button
                    type="button"
                    className="mt-3 w-full text-center text-sm text-muted-foreground transition-colors hover:text-brand-navy"
                  />
                }
              >
                {leadMagnet.continueLabel}
              </Dialog.Close>
            </>
          )}

          <Dialog.Close
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute right-3 top-3 text-brand-navy/60 hover:text-brand-navy"
              />
            }
          >
            <XIcon className="size-4" />
            <span className="sr-only">Fermer</span>
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
