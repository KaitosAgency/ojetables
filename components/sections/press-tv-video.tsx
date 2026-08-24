"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

import { pressTvFeature } from "@/lib/site";

function dailymotionEmbedUrl(videoId: string, autoplay = false) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: autoplay ? "0" : "1",
  });
  return `https://www.dailymotion.com/embed/video/${videoId}?${params.toString()}`;
}

export function PressTvVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative mx-auto mt-8 w-full max-w-xl overflow-hidden rounded-2xl border border-border/70 shadow-md md:mt-10 md:max-w-2xl">
      <div className="relative aspect-[16/9] w-full bg-brand-navy-deep">
        {isPlaying ? (
          <iframe
            src={dailymotionEmbedUrl(pressTvFeature.videoId, true)}
            title={pressTvFeature.alt}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
            aria-label={`Lire le reportage Capital : ${pressTvFeature.description}`}
          >
            <Image
              src={pressTvFeature.src}
              alt={pressTvFeature.alt}
              fill
              priority={false}
              sizes="(max-width: 768px) 90vw, 42rem"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span
              className="absolute inset-0 bg-brand-navy/20 transition-colors group-hover:bg-brand-navy/30"
              aria-hidden
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-brand-navy shadow-lg transition-transform group-hover:scale-105 md:h-16 md:w-16">
                <Play className="ml-1 h-6 w-6 fill-current md:h-7 md:w-7" aria-hidden />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
