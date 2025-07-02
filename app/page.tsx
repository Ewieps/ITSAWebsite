import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Users, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-accent text-accent-foreground">ITS Archery Club</Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Panahan ITS
                <span className="block text-accent">Precision & Excellence</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-lg">
                Bergabunglah dengan komunitas panahan terbaik di Institut Teknologi Sepuluh Nopember. Kembangkan skill,
                raih prestasi, dan jadilah bagian dari keluarga besar ITS Archery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Bergabung Sekarang
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="ITS Archery Team"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Anggota Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Prestasi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Tahun Berdiri</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Alumni</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa Memilih ITS Archery?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kami menyediakan lingkungan terbaik untuk mengembangkan kemampuan panahan Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Pelatihan Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Pelatihan dengan instruktur berpengalaman dan metode yang terbukti efektif
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Prestasi Gemilang</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track record prestasi di berbagai kompetisi tingkat regional dan nasional
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Komunitas Solid</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Bergabung dengan keluarga besar yang saling mendukung dan memotivasi</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Kegiatan Rutin</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Program latihan rutin dan berbagai kegiatan menarik sepanjang tahun</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Berita Terbaru</h2>
              <p className="text-muted-foreground">Update terkini dari ITS Archery</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">Lihat Semua</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="News thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    Prestasi
                  </Badge>
                  <CardTitle className="line-clamp-2">ITS Archery Raih Juara 1 di Kompetisi Nasional 2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    Tim ITS Archery berhasil meraih prestasi gemilang dengan menjuarai kompetisi panahan tingkat
                    nasional...
                  </CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-muted-foreground">2 hari yang lalu</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/blog/1">Baca Selengkapnya</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Bergabung dengan ITS Archery?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Mulai perjalanan Anda dalam dunia panahan bersama kami. Daftar sekarang dan rasakan pengalaman yang tak
            terlupakan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Daftar Sekarang
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
