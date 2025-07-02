import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react"

export default function KontakPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Hubungi Kami</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Kontak ITS Archery</h1>
            <p className="text-xl text-primary-foreground/80">
              Punya pertanyaan atau ingin bergabung dengan kami? Jangan ragu untuk menghubungi tim ITS Archery. Kami
              siap membantu Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Informasi Kontak</h2>
                <p className="text-muted-foreground mb-8">
                  Berikut adalah berbagai cara untuk menghubungi kami. Tim kami akan merespons pertanyaan Anda sesegera
                  mungkin.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Alamat Sekretariat</h3>
                        <p className="text-muted-foreground">
                          Gedung Student Center ITS
                          <br />
                          Jl. Raya ITS, Keputih, Sukolilo
                          <br />
                          Surabaya, Jawa Timur 60111
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Nomor Telepon</h3>
                        <p className="text-muted-foreground">
                          +62 812-3456-7890 (Ahmad Rizki - Ketua)
                          <br />
                          +62 813-4567-8901 (Sari Indah - Wakil Ketua)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <p className="text-muted-foreground">
                          info@itsarchery.com
                          <br />
                          recruitment@itsarchery.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Jam Operasional</h3>
                        <p className="text-muted-foreground">
                          Senin - Jumat: 16:00 - 18:00 WIB
                          <br />
                          Sabtu: 09:00 - 12:00 WIB
                          <br />
                          Minggu: Tutup
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                    <Youtube className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
                  <CardDescription>Isi form di bawah ini dan kami akan menghubungi Anda kembali</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Lengkap</label>
                      <Input placeholder="Masukkan nama lengkap" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="nama@email.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nomor Telepon</label>
                      <Input placeholder="+62 812-3456-7890" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subjek</label>
                      <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                        <option>Pilih subjek</option>
                        <option>Informasi Pendaftaran</option>
                        <option>Jadwal Latihan</option>
                        <option>Kerjasama</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pesan</label>
                    <Textarea placeholder="Tulis pesan Anda di sini..." className="min-h-[120px]" />
                  </div>

                  <Button className="w-full">Kirim Pesan</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lokasi Kami</h2>
            <p className="text-muted-foreground">Temukan kami di kampus Institut Teknologi Sepuluh Nopember</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Peta lokasi akan ditampilkan di sini
                      <br />
                      (Integrasi dengan Google Maps)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pertanyaan Umum</h2>
            <p className="text-muted-foreground">Jawaban untuk pertanyaan yang sering diajukan</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Bagaimana cara bergabung dengan ITS Archery?",
                answer:
                  "Anda dapat mendaftar melalui open recruitment yang biasanya diadakan di awal semester atau menghubungi kami langsung melalui kontak yang tersedia.",
              },
              {
                question: "Apakah ada biaya untuk bergabung?",
                answer:
                  "Ya, ada biaya pendaftaran dan iuran bulanan yang digunakan untuk operasional UKM, perawatan peralatan, dan kegiatan-kegiatan lainnya.",
              },
              {
                question: "Apakah pemula bisa bergabung?",
                answer:
                  "Tentu saja! Kami menerima anggota dari semua level, termasuk pemula. Kami memiliki program pelatihan khusus untuk pemula.",
              },
              {
                question: "Kapan jadwal latihan rutin?",
                answer:
                  "Latihan rutin dilaksanakan setiap Senin, Rabu, dan Jumat pukul 16:00-18:00 WIB di Lapangan Panahan ITS.",
              },
              {
                question: "Apakah peralatan panahan disediakan?",
                answer:
                  "Untuk pemula, kami menyediakan peralatan dasar untuk latihan. Namun untuk jangka panjang, anggota diharapkan memiliki peralatan sendiri.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Bergabung dengan Kami?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan lebih lanjut atau ingin langsung bergabung
            dengan ITS Archery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Daftar Sekarang
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Kunjungi Kami
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
