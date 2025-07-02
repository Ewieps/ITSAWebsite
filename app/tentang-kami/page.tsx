import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Trophy, Heart } from "lucide-react"

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Tentang Kami</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">ITS Archery Club</h1>
            <p className="text-xl text-primary-foreground/80">
              Komunitas panahan terdepan di Institut Teknologi Sepuluh Nopember yang berdedikasi untuk mengembangkan
              bakat dan prestasi dalam olahraga panahan.
            </p>
          </div>
        </div>
      </section>

      {/* Sejarah Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Sejarah Kami</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ITS Archery Club didirikan pada tahun 2014 dengan visi menjadi wadah bagi mahasiswa ITS yang memiliki
                  passion dalam olahraga panahan. Berawal dari sekelompok kecil mahasiswa yang tertarik dengan olahraga
                  ini, kini kami telah berkembang menjadi salah satu unit kegiatan mahasiswa yang paling aktif di ITS.
                </p>
                <p>
                  Sepanjang perjalanan kami, ITS Archery telah meraih berbagai prestasi gemilang di tingkat regional
                  maupun nasional. Kami bangga telah melahirkan atlet-atlet panahan yang berprestasi dan berkontribusi
                  dalam dunia panahan Indonesia.
                </p>
                <p>
                  Dengan dukungan dari pihak institut dan komitmen tinggi dari seluruh anggota, kami terus berupaya
                  mengembangkan potensi setiap individu dan mempertahankan tradisi keunggulan dalam olahraga panahan.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Sejarah ITS Archery"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visi & Misi</h2>
            <p className="text-xl text-muted-foreground">Landasan yang mengarahkan setiap langkah kami</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Menjadi komunitas panahan terdepan di Indonesia yang menghasilkan atlet-atlet berprestasi dan
                  berkarakter, serta menjadi pusat pengembangan olahraga panahan di lingkungan akademis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Mengembangkan potensi mahasiswa dalam olahraga panahan, membangun karakter yang kuat, meraih prestasi
                  di berbagai kompetisi, dan menjadi wadah silaturahmi bagi pecinta panahan.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nilai-nilai Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nilai-Nilai Kami</h2>
            <p className="text-xl text-muted-foreground">Prinsip yang menjadi fondasi dalam setiap aktivitas kami</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Presisi</h3>
              <p className="text-muted-foreground">Fokus pada detail dan akurasi dalam setiap tindakan</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kebersamaan</h3>
              <p className="text-muted-foreground">Membangun solidaritas dan kekeluargaan yang kuat</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prestasi</h3>
              <p className="text-muted-foreground">Berusaha mencapai yang terbaik dalam setiap kompetisi</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integritas</h3>
              <p className="text-muted-foreground">Menjunjung tinggi kejujuran dan sportivitas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Struktur Organisasi</h2>
            <p className="text-xl text-muted-foreground">Tim pengurus yang berdedikasi untuk kemajuan ITS Archery</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { nama: "Ahmad Rizki", jabatan: "Ketua Umum", foto: "/placeholder.svg?height=300&width=300" },
              { nama: "Sari Indah", jabatan: "Wakil Ketua", foto: "/placeholder.svg?height=300&width=300" },
              { nama: "Budi Santoso", jabatan: "Sekretaris", foto: "/placeholder.svg?height=300&width=300" },
              { nama: "Maya Putri", jabatan: "Bendahara", foto: "/placeholder.svg?height=300&width=300" },
              { nama: "Doni Pratama", jabatan: "Pelatih Utama", foto: "/placeholder.svg?height=300&width=300" },
              { nama: "Lisa Wati", jabatan: "Humas", foto: "/placeholder.svg?height=300&width=300" },
            ].map((pengurus, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={pengurus.foto || "/placeholder.svg"}
                      alt={pengurus.nama}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle>{pengurus.nama}</CardTitle>
                  <CardDescription className="text-primary font-medium">{pengurus.jabatan}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
