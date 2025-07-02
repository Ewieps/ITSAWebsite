import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Star } from "lucide-react"

export default function PrestasiPage() {
  const prestasi = [
    {
      tahun: "2024",
      kompetisi: "Kejuaraan Nasional Panahan Indonesia",
      kategori: "Recurve Putra",
      peringkat: "Juara 1",
      atlet: "Ahmad Rizki Pratama",
      tingkat: "Nasional",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      tahun: "2024",
      kompetisi: "POMNAS XVI",
      kategori: "Compound Putri",
      peringkat: "Juara 2",
      atlet: "Sari Indah Permata",
      tingkat: "Nasional",
      icon: Medal,
      color: "text-gray-500",
    },
    {
      tahun: "2023",
      kompetisi: "Kejuaraan Panahan Jawa Timur",
      kategori: "Recurve Beregu Putra",
      peringkat: "Juara 1",
      atlet: "Tim ITS Archery",
      tingkat: "Regional",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      tahun: "2023",
      kompetisi: "Piala Rektor ITS",
      kategori: "Traditional Bow",
      peringkat: "Juara 1",
      atlet: "Budi Santoso",
      tingkat: "Lokal",
      icon: Award,
      color: "text-yellow-600",
    },
    {
      tahun: "2023",
      kompetisi: "Kejuaraan Antar Universitas Se-Jawa",
      kategori: "Compound Putra",
      peringkat: "Juara 3",
      atlet: "Doni Pratama",
      tingkat: "Regional",
      icon: Medal,
      color: "text-amber-600",
    },
    {
      tahun: "2022",
      kompetisi: "POMDA Jawa Timur",
      kategori: "Recurve Putri",
      peringkat: "Juara 2",
      atlet: "Maya Putri Sari",
      tingkat: "Regional",
      icon: Medal,
      color: "text-gray-500",
    },
  ]

  const statistik = [
    { label: "Total Prestasi", value: "25+", icon: Trophy },
    { label: "Juara 1", value: "12", icon: Award },
    { label: "Juara 2", value: "8", icon: Medal },
    { label: "Juara 3", value: "5", icon: Star },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Hall of Fame</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Prestasi Kami</h1>
            <p className="text-xl text-primary-foreground/80">
              Pencapaian gemilang yang telah diraih ITS Archery dalam berbagai kompetisi tingkat lokal, regional, hingga
              nasional.
            </p>
          </div>
        </div>
      </section>

      {/* Statistik Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistik.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestasi Terbaru Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prestasi Terbaru</h2>
            <p className="text-xl text-muted-foreground">
              Pencapaian terkini yang membanggakan dari para atlet ITS Archery
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {prestasi.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center`}>
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">{item.kompetisi}</CardTitle>
                        <CardDescription className="text-base">
                          {item.kategori} • {item.atlet}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          item.tingkat === "Nasional"
                            ? "default"
                            : item.tingkat === "Regional"
                              ? "secondary"
                              : "outline"
                        }
                        className="mb-2"
                      >
                        {item.tingkat}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{item.tahun}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`text-lg px-4 py-2 ${
                        item.peringkat.includes("1")
                          ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                          : item.peringkat.includes("2")
                            ? "border-gray-500 text-gray-700 bg-gray-50"
                            : "border-amber-500 text-amber-700 bg-amber-50"
                      }`}
                    >
                      {item.peringkat}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Prestasi Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Galeri Prestasi</h2>
            <p className="text-xl text-muted-foreground">Momen-momen bersejarah pencapaian prestasi kami</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt={`Prestasi ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Juara 1 Kejuaraan Nasional 2024</CardTitle>
                  <CardDescription>Momen penyerahan medali emas kepada Ahmad Rizki Pratama</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ingin Meraih Prestasi Bersama Kami?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ITS Archery dan wujudkan potensi terbaik Anda dalam olahraga panahan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
              Bergabung Sekarang
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
