"use client"

import Image from 'next/image'
import { Scene } from '@/data/scenes'

interface CardImageProps {
  scene: Scene
}

export function CardImage({ scene }: CardImageProps) {
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-square rounded-[var(--r-img)] overflow-hidden bg-[var(--bg)]">
      <Image
        src={scene.image}
        alt={scene.label}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      {/* Fallback gradient for missing images */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--border)] to-[var(--bg)] -z-10" />
    </div>
  )
}
