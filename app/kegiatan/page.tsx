import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Target, Trophy } from "lucide-react"

export default function KegiatanPage() {
  const kegiatanRutin = [
    {
      nama: "Latihan Rutin",
      deskripsi: "Latihan teknik dasar dan lanjutan panahan",
      jadwal: "Senin, Rabu, Jumat",
      waktu: "16:00 - 18:00 WIB",
      lokasi: "Lapangan Panahan ITS",
      icon: Target,
      color: "bg-primary/10 text-primary",
    },
    {
      nama: "Latihan Fisik",
      deskripsi: "Program conditioning dan strength training",
      jadwal: "Selasa, Kamis",
      waktu: "17:00 - 19:00 WIB",
      lokasi: "Gym ITS",
      icon: Users,
      color: "bg-accent/10 text-accent",
    },
    {
      nama: "Evaluasi Mingguan",
      deskripsi: "Review progress dan strategi latihan",
      jadwal: "Sabtu",
      waktu: "09:00 - 11:00 WIB",
      lokasi: "Ruang Meeting UKM",
      icon: Trophy,
      color: "bg-secondary text-secondary-foreground",
    },
  ]

  const agendaMendatang = [
    {
      nama: "Kejuaraan Internal ITS Archery",
      tanggal: "15 Agustus 2024",
      waktu: "08:00 - 17:00 WIB",
      lokasi: "Lapangan Panahan ITS",
      deskripsi: "Kompetisi internal untuk seleksi atlet terbaik",
      kategori: "Kompetisi",
      status: "Mendatang",
    },
    {
      nama: "Workshop Teknik Panahan",
      tanggal: "22 Agustus 2024",
      waktu: "13:00 - 16:00 WIB",
      lokasi: "Aula Graha ITS",
      deskripsi: "Pelatihan teknik lanjutan dengan pelatih nasional",
      kategori: "Workshop",
      status: "Mendatang",
    },
    {
      nama: "Bakti Sosial & Pengenalan Panahan",
      tanggal: "5 September 2024",
      waktu: "09:00 - 15:00 WIB",
      lokasi: "SDN Keputih 1",
      deskripsi: "Kegiatan sosial dan pengenalan panahan untuk anak-anak",
      kategori: "Sosial",
      status: "Mendatang",
    },
    {
      nama: "Kejuaraan Antar Universitas Jawa Timur",
      tanggal: "20-22 September 2024",
      waktu: "Full Day",
      lokasi: "Universitas Brawijaya, Malang",
      deskripsi: "Kompetisi tingkat regional antar universitas",
      kategori: "Kompetisi",
      status: "Mendatang",
    },
  ]

  const kegiatanSelesai = [
    {
      nama: "Pelatihan Intensif Pra-Kompetisi",
      tanggal: "1-7 Juli 2024",
      lokasi: "Training Camp Batu",
      deskripsi: "Persiapan intensif untuk kejuaraan nasional",
      hasil: "Berhasil meningkatkan performa atlet sebesar 15%",
    },
    {
      nama: "Open House ITS Archery",
      tanggal: "15 Juni 2024",
      lokasi: "Campus Center ITS",
      deskripsi: "Pengenalan UKM kepada mahasiswa baru",
      hasil: "50+ mahasiswa baru bergabung",
    },
    {
      nama: "Kejuaraan Nasional Panahan Indonesia",
      tanggal: "10-12 Juni 2024",
      lokasi: "Jakarta",
      deskripsi: "Partisipasi dalam kejuaraan tingkat nasional",
      hasil: "Meraih 2 medali emas dan 1 medali perak",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Kegiatan & Agenda</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Program Kegiatan</h1>
            <p className="text-xl text-primary-foreground/80">
              Berbagai kegiatan rutin dan agenda khusus yang dirancang untuk mengembangkan kemampuan dan mempererat
              kebersamaan anggota ITS Archery.
            </p>
          </div>
        </div>
      </section>

      {/* Kegiatan Rutin Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kegiatan Rutin</h2>
            <p className="text-xl text-muted-foreground">
              Program latihan dan kegiatan yang dilaksanakan secara berkala
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {kegiatanRutin.map((kegiatan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${kegiatan.color}`}>
                    <kegiatan.icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{kegiatan.nama}</CardTitle>
                  <CardDescription>{kegiatan.deskripsi}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{kegiatan.jadwal}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{kegiatan.waktu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{kegiatan.lokasi}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Mendatang Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Agenda Mendatang</h2>
            <p className="text-xl text-muted-foreground">Kegiatan dan event yang akan segera dilaksanakan</p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {agendaMendatang.map((agenda, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{agenda.nama}</CardTitle>
                        <Badge
                          variant={
                            agenda.kategori === "Kompetisi"
                              ? "default"
                              : agenda.kategori === "Workshop"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {agenda.kategori}
                        </Badge>
                      </div>
                      <CardDescription className="text-base mb-4">{agenda.deskripsi}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-green-700 border-green-500 bg-green-50">
                      {agenda.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{agenda.tanggal}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{agenda.waktu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{agenda.lokasi}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Kegiatan Selesai Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kegiatan Terdahulu</h2>
            <p className="text-xl text-muted-foreground">Rekam jejak kegiatan yang telah berhasil dilaksanakan</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kegiatanSelesai.map((kegiatan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt={kegiatan.nama}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge variant="outline" className="w-fit text-gray-600 border-gray-400">
                    Selesai
                  </Badge>
                  <CardTitle className="line-clamp-2">{kegiatan.nama}</CardTitle>
                  <CardDescription>{kegiatan.deskripsi}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{kegiatan.tanggal}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{kegiatan.lokasi}</span>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 font-medium">Hasil:</p>
                    <p className="text-sm text-green-700">{kegiatan.hasil}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ikuti Kegiatan Kami</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Jangan lewatkan kesempatan untuk berpartisipasi dalam berbagai kegiatan menarik dan mengembangkan kemampuan
            panahan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Daftar Kegiatan
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Lihat Kalender Lengkap
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
