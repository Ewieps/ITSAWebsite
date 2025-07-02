"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Eye } from "lucide-react"

export default function GaleriPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  const categories = ["Semua", "Kompetisi", "Latihan", "Event", "Prestasi"]

  const galeriItems = [
    {
      id: 1,
      title: "Kejuaraan Nasional 2024",
      category: "Kompetisi",
      date: "Juni 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Momen penyerahan medali emas kepada Ahmad Rizki",
    },
    {
      id: 2,
      title: "Latihan Rutin Tim",
      category: "Latihan",
      date: "Juli 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Sesi latihan intensif persiapan kompetisi",
    },
    {
      id: 3,
      title: "Workshop Teknik Panahan",
      category: "Event",
      date: "Mei 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Pelatihan dengan instruktur nasional",
    },
    {
      id: 4,
      title: "Juara 1 POMNAS XVI",
      category: "Prestasi",
      date: "April 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Sari Indah meraih medali perak",
    },
    {
      id: 5,
      title: "Open House ITS Archery",
      category: "Event",
      date: "Juni 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Pengenalan UKM kepada mahasiswa baru",
    },
    {
      id: 6,
      title: "Training Camp Batu",
      category: "Latihan",
      date: "Juli 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Pelatihan intensif di Batu, Malang",
    },
    {
      id: 7,
      title: "Kejuaraan Regional Jatim",
      category: "Kompetisi",
      date: "Maret 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Tim beregu putra meraih juara 1",
    },
    {
      id: 8,
      title: "Bakti Sosial Keputih",
      category: "Event",
      date: "Februari 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Pengenalan panahan untuk anak-anak",
    },
    {
      id: 9,
      title: "Piala Rektor ITS",
      category: "Prestasi",
      date: "Januari 2024",
      image: "/placeholder.svg?height=400&width=600",
      description: "Budi Santoso juara traditional bow",
    },
  ]

  const filteredItems =
    selectedCategory === "Semua" ? galeriItems : galeriItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Galeri Foto</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Galeri ITS Archery</h1>
            <p className="text-xl text-primary-foreground/80">
              Dokumentasi perjalanan dan pencapaian ITS Archery dalam berbagai kegiatan, kompetisi, dan momen
              bersejarah.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
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
                          {item.date}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="space-y-4">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{item.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {item.date}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold">{item.title}</h2>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">Tidak ada foto untuk kategori "{selectedCategory}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Total Foto</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Event Terdokumentasi</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Kompetisi</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5</div>
              <div className="text-muted-foreground">Tahun Dokumentasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bagikan Momen Anda</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Punya foto kegiatan ITS Archery yang menarik? Bagikan dengan kami untuk melengkapi dokumentasi perjalanan
            komunitas kita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Kirim Foto
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Lihat Album Lengkap
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
