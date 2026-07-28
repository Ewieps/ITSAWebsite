"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import type { HeroSlide } from "@/lib/supabase"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function HomePage() {
  const [stats, setStats] = useState({ achievements: 0 })
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    supabase
      .from("achievements")
      .select("id", { count: "exact", head: true })
      .then(({ count }) => setStats({ achievements: count || 0 }))
  }, [])

  const fetchSlides = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/hero-slides")
      const data = await res.json()
      if (data.success) {
        setSlides((data.items || []).filter((s: HeroSlide) => s.is_active))
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    fetchSlides()
  }, [fetchSlides])

  useEffect(() => {
    if (!api || slides.length <= 1) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    onSelect()
    return () => { api.off("select", onSelect) }
  }, [api, slides.length])

  // Auto-play
  useEffect(() => {
    if (!api || slides.length <= 1) return
    const interval = setInterval(() => api.scrollNext(), 5000)
    return () => clearInterval(interval)
  }, [api, slides.length])

  const hasSlides = slides.length > 0

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark py-12 sm:py-20 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 relative z-10">
              <Badge className="bg-accent text-accent-foreground">ITS Archery</Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                ITS Archery,
                <span className="block text-accent">Membidik Dengan</span><span className="block text-destructive">Hati!</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-lg">
                Bergabunglah dengan komunitas panahan Institut Teknologi Sepuluh Nopember. Kembangkan skill,
                raih prestasi, dan jadilah bagian dari keluarga besar ITS Archery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href="/pendaftaran">Bergabung Sekarang</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                  asChild
                >
                  <Link href="/tentang-kami">Pelajari Lebih Lanjut</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              {hasSlides ? (
                <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
                  <CarouselContent>
                    {slides.map((slide) => (
                      <CarouselItem key={slide.id}>
                        <div className="relative">
                          <img
                            src={slide.image_url}
                            alt={slide.title || "ITS Archery"}
                            className="w-full h-[350px] md:h-[450px] object-cover rounded-lg shadow-2xl"
                          />
                          {(slide.title || slide.subtitle) && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg p-4 sm:p-6">
                              {slide.title && <p className="text-white font-semibold text-base sm:text-lg line-clamp-2">{slide.title}</p>}
                              {slide.subtitle && <p className="text-white/80 text-xs sm:text-sm mt-1 line-clamp-1">{slide.subtitle}</p>}
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              ) : (
                <Image
                  src="/uploads/material/ITSAlogo.png"
                  alt="ITS Archery"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-2xl mx-auto"
                />
              )}
              {slides.length > 1 && (
                <div className="flex justify-center gap-3 mt-4">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => api?.scrollTo(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`w-3 h-3 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -m-[18px]`}
                    >
                      <span className={`block w-2.5 h-2.5 rounded-full ${i === current ? "bg-white" : "bg-white/40"}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tertarik untuk bergabung dengan ITS Archery?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Mulai atau lanjutkan perjalananmu di ranah Panahan!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link href="/pendaftaran">Daftar Sekarang</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/kontak">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
