"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Eye } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { GalleryImage } from "@/lib/supabase"

const CATEGORIES = ["Semua", "Kompetisi", "Latihan", "Event", "Prestasi"]

export default function GaleriPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [items, setItems] = useState<GalleryImage[]>([])

  useEffect(() => {
    supabase
      .from("gallery")
      .select("*")
      .order("upload_date", { ascending: false })
      .then(({ data }) => setItems(data || []))
  }, [])

  const filtered =
    selectedCategory === "Semua" ? items : items.filter((i) => i.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Galeri Foto</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Galeri ITS Archery</h1>
            <p className="text-xl text-primary-foreground/80">
              Dokumentasi perjalanan dan pencapaian ITS Archery dalam berbagai kegiatan, kompetisi, dan momen
              bersejarah kami.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {item.upload_date}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="space-y-4">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{item.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {item.upload_date}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold">{item.title}</h2>
                      {item.description && (
                        <p className="text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                {items.length === 0
                  ? "Belum ada foto di galeri."
                  : `Tidak ada foto untuk kategori "${selectedCategory}"`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
