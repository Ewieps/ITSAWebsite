"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, Users, AlertCircle, CheckCircle } from "lucide-react"

// Konfigurasi periode pendaftaran
const REGISTRATION_CONFIG = {
  isOpen: true, // Ubah ke false untuk menutup pendaftaran
  openDate: "1 Agustus 2024",
  closeDate: "31 Agustus 2024",
  maxParticipants: 50,
  currentParticipants: 23,
}

export default function PendaftaranPage() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nim: "",
    fakultas: "",
    jurusan: "",
    semester: "",
    email: "",
    noTelepon: "",
    alamat: "",
    pengalamanPanahan: "",
    motivasi: "",
    ketersediaan: "",
    persetujuan: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const fakultasList = [
    "Fakultas Teknologi Industri dan Rekayasa Sistem",
    "Fakultas Teknik Sipil, Perencanaan, dan Kebumian",
    "Fakultas Teknologi Kelautan",
    "Fakultas Teknologi Elektro dan Informatika Cerdas",
    "Fakultas Sains dan Analitika Data",
    "Fakultas Vokasi",
    "Fakultas Bisnis dan Manajemen Teknologi",
  ]

  if (!REGISTRATION_CONFIG.isOpen) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-red-500 text-white mb-6">Pendaftaran Ditutup</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Pendaftaran ITS Archery</h1>
              <p className="text-xl text-primary-foreground/80">
                Pendaftaran anggota baru ITS Archery untuk periode ini telah ditutup.
              </p>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Pendaftaran Ditutup</strong>
                  <br />
                  Pendaftaran anggota baru telah ditutup pada {REGISTRATION_CONFIG.closeDate}. Pendaftaran berikutnya
                  akan dibuka pada periode yang akan datang.
                </AlertDescription>
              </Alert>

              <Card className="mt-8">
                <CardHeader className="text-center">
                  <CardTitle>Informasi Pendaftaran</CardTitle>
                  <CardDescription>Detail periode pendaftaran ITS Archery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Periode Pendaftaran</p>
                        <p className="text-sm text-muted-foreground">
                          {REGISTRATION_CONFIG.openDate} - {REGISTRATION_CONFIG.closeDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Kuota Peserta</p>
                        <p className="text-sm text-muted-foreground">
                          {REGISTRATION_CONFIG.currentParticipants}/{REGISTRATION_CONFIG.maxParticipants} pendaftar
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Ingin mendapat notifikasi pendaftaran berikutnya?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Daftarkan email Anda untuk mendapat pemberitahuan ketika pendaftaran dibuka kembali.
                    </p>
                    <div className="flex gap-2">
                      <Input placeholder="Email Anda" className="flex-1" />
                      <Button>Notify Me</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <section className="py-20 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Pendaftaran Berhasil!</h1>
              <p className="text-xl text-green-100">
                Terima kasih telah mendaftar sebagai anggota ITS Archery. Kami akan menghubungi Anda segera.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Card>
                <CardHeader>
                  <CardTitle>Langkah Selanjutnya</CardTitle>
                  <CardDescription>Apa yang akan terjadi setelah pendaftaran</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Verifikasi Data</p>
                      <p className="text-sm text-muted-foreground">
                        Tim kami akan memverifikasi data yang Anda berikan
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Konfirmasi Email</p>
                      <p className="text-sm text-muted-foreground">
                        Anda akan menerima email konfirmasi dalam 1-2 hari kerja
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Orientasi Anggota</p>
                      <p className="text-sm text-muted-foreground">Menghadiri sesi orientasi untuk anggota baru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-green-500 text-white mb-6">Pendaftaran Dibuka</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bergabung dengan ITS Archery</h1>
            <p className="text-xl text-primary-foreground/80">
              Daftarkan diri Anda sekarang dan jadilah bagian dari komunitas panahan terbaik di ITS.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Info */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">Periode Pendaftaran</p>
              <p className="text-sm text-muted-foreground">
                {REGISTRATION_CONFIG.openDate} - {REGISTRATION_CONFIG.closeDate}
              </p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">Kuota Tersisa</p>
              <p className="text-sm text-muted-foreground">
                {REGISTRATION_CONFIG.maxParticipants - REGISTRATION_CONFIG.currentParticipants} dari{" "}
                {REGISTRATION_CONFIG.maxParticipants} slot
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">Proses Seleksi</p>
              <p className="text-sm text-muted-foreground">1-2 minggu setelah penutupan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Form Pendaftaran Anggota Baru</CardTitle>
                <CardDescription>
                  Lengkapi semua data dengan benar. Pastikan informasi yang Anda berikan akurat.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Data Pribadi */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Data Pribadi</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                        <Input
                          id="namaLengkap"
                          value={formData.namaLengkap}
                          onChange={(e) => handleInputChange("namaLengkap", e.target.value)}
                          placeholder="Masukkan nama lengkap"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nim">NIM *</Label>
                        <Input
                          id="nim"
                          value={formData.nim}
                          onChange={(e) => handleInputChange("nim", e.target.value)}
                          placeholder="Contoh: 5025211234"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fakultas">Fakultas *</Label>
                        <select
                          id="fakultas"
                          value={formData.fakultas}
                          onChange={(e) => handleInputChange("fakultas", e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                          required
                        >
                          <option value="">Pilih Fakultas</option>
                          {fakultasList.map((fakultas) => (
                            <option key={fakultas} value={fakultas}>
                              {fakultas}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jurusan">Jurusan/Departemen *</Label>
                        <Input
                          id="jurusan"
                          value={formData.jurusan}
                          onChange={(e) => handleInputChange("jurusan", e.target.value)}
                          placeholder="Contoh: Teknik Informatika"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester Saat Ini *</Label>
                      <RadioGroup
                        value={formData.semester}
                        onValueChange={(value) => handleInputChange("semester", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1-2" id="semester-1-2" />
                          <Label htmlFor="semester-1-2">Semester 1-2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3-4" id="semester-3-4" />
                          <Label htmlFor="semester-3-4">Semester 3-4</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5-6" id="semester-5-6" />
                          <Label htmlFor="semester-5-6">Semester 5-6</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="7+" id="semester-7" />
                          <Label htmlFor="semester-7">Semester 7+</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Kontak */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Informasi Kontak</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="nama@email.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noTelepon">Nomor Telepon *</Label>
                        <Input
                          id="noTelepon"
                          value={formData.noTelepon}
                          onChange={(e) => handleInputChange("noTelepon", e.target.value)}
                          placeholder="+62 812-3456-7890"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alamat">Alamat Lengkap *</Label>
                      <Textarea
                        id="alamat"
                        value={formData.alamat}
                        onChange={(e) => handleInputChange("alamat", e.target.value)}
                        placeholder="Masukkan alamat lengkap"
                        required
                      />
                    </div>
                  </div>

                  {/* Pengalaman & Motivasi */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Pengalaman & Motivasi</h3>

                    <div className="space-y-2">
                      <Label htmlFor="pengalamanPanahan">Pengalaman Panahan</Label>
                      <RadioGroup
                        value={formData.pengalamanPanahan}
                        onValueChange={(value) => handleInputChange("pengalamanPanahan", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pemula" id="pemula" />
                          <Label htmlFor="pemula">Pemula (belum pernah)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dasar" id="dasar" />
                          <Label htmlFor="dasar">Dasar (pernah coba 1-5 kali)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="menengah" id="menengah" />
                          <Label htmlFor="menengah">Menengah (latihan rutin {"<"} 1 tahun)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="berpengalaman" id="berpengalaman" />
                          <Label htmlFor="berpengalaman">Berpengalaman ({">"} 1 tahun)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivasi">Motivasi Bergabung *</Label>
                      <Textarea
                        id="motivasi"
                        value={formData.motivasi}
                        onChange={(e) => handleInputChange("motivasi", e.target.value)}
                        placeholder="Ceritakan motivasi Anda bergabung dengan ITS Archery..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ketersediaan">Ketersediaan Waktu *</Label>
                      <RadioGroup
                        value={formData.ketersediaan}
                        onValueChange={(value) => handleInputChange("ketersediaan", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sangat-aktif" id="sangat-aktif" />
                          <Label htmlFor="sangat-aktif">Sangat Aktif (bisa hadir semua latihan)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="aktif" id="aktif" />
                          <Label htmlFor="aktif">Aktif (bisa hadir 2-3x seminggu)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="terbatas" id="terbatas" />
                          <Label htmlFor="terbatas">Terbatas (1-2x seminggu)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Persetujuan */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="persetujuan"
                        checked={formData.persetujuan}
                        onCheckedChange={(checked) => handleInputChange("persetujuan", checked as boolean)}
                      />
                      <Label htmlFor="persetujuan" className="text-sm leading-relaxed">
                        Saya menyetujui untuk mengikuti semua aturan dan ketentuan yang berlaku di ITS Archery, bersedia
                        mengikuti program latihan yang telah ditetapkan, dan berkomitmen untuk aktif dalam kegiatan UKM.
                        *
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={!formData.persetujuan || isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Daftar Sekarang"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
