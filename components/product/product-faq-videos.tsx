"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { ProductFaqVideo } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductFaqVideosProps = {
  videos: readonly ProductFaqVideo[];
};

const lightboxZIndex = "z-[100]";

export function ProductFaqVideos({ videos }: ProductFaqVideosProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close]);

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null;

  const lightbox =
    activeVideo && isMounted
      ? createPortal(
          <div
            className={cn(
              "fixed inset-0 flex items-center justify-center bg-brand-navy-ink/80 p-4 backdrop-blur-sm",
              lightboxZIndex,
            )}
            role="dialog"
            aria-modal="true"
            aria-label={`Vidéo : ${activeVideo.label}`}
            onClick={close}
          >
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand-kraft/25 bg-brand-navy-deep shadow-2xl shadow-black/40"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-brand-navy-ink/70 text-white transition-colors hover:bg-brand-navy-ink"
                aria-label="Fermer la vidéo"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
              <video
                key={activeVideo.videoUrl}
                src={activeVideo.videoUrl}
                className="aspect-[9/16] max-h-[85vh] w-full bg-black object-contain"
                controls
                autoPlay
                playsInline
              />
              <p className="border-t border-brand-kraft/20 bg-brand-navy-deep px-4 py-3 text-center text-sm font-semibold text-brand-beige">
                {activeVideo.label}
              </p>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {videos.map((video, index) => (
          <button
            key={video.label}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-2xl border-0 bg-brand-navy-deep p-0 text-left shadow-md ring-1 ring-brand-kraft/25 transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-kraft/50"
            aria-label={`Lire la vidéo : ${video.label}`}
          >
            <Image
              src={video.thumbnailUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/90 via-brand-navy/35 to-brand-navy/5"
              aria-hidden
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-beige/80 bg-brand-navy/40 text-white backdrop-blur-sm transition-transform group-hover:scale-105 group-hover:border-brand-kraft/60 group-hover:bg-brand-kraft/25">
                <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 px-4 pb-5 pt-10 text-center text-base font-bold tracking-tight text-brand-beige md:text-lg">
              {video.label}
            </span>
          </button>
        ))}
      </div>

      {lightbox}
    </>
  );
}
