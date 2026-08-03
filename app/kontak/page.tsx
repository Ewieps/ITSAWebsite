"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Instagram, Youtube } from "lucide-react"

interface ContactInfo {
  address: string
  phone: string
  email: string
  instagram: string
  youtube: string
  hours: string[]
  faq: { question: string; answer: string }[]
}

const FALLBACK: ContactInfo = {
  address: "Gedung Student Center ITS\nJl. Raya ITS, Keputih, Sukolilo\nSurabaya, Jawa Timur 60111",
  phone: "+62 812-3456-7890",
  email: "info@itsarchery.com",
  instagram: "",
  youtube: "",
  hours: ["Senin - Jumat: 16:00 - 18:00 WIB", "Sabtu: 09:00 - 12:00 WIB", "Minggu: Tutup"],
  faq: [
    { question: "Bagaimana cara bergabung dengan ITS Archery?", answer: "Anda dapat mendaftar melalui open recruitment yang biasanya diadakan di awal semester atau menghubungi kami langsung melalui kontak yang tersedia." },
    { question: "Apakah pemula bisa bergabung?", answer: "Tentu saja! Kami menerima anggota dari semua level, termasuk pemula. Kami memiliki program pelatihan khusus untuk pemula." },
  ],
}

const toUrl = (value: string, fallback: string) => {
  if (!value) return fallback
  return value.startsWith("http") ? value : `https://${value}`
}

export default function KontakPage() {
  const [contact, setContact] = useState<ContactInfo>(FALLBACK)

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.settings.contact) {
          const c = data.settings.contact
          setContact({
            ...FALLBACK,
            address: c.address || FALLBACK.address,
            phone: Array.isArray(c.phone) ? c.phone[0] || "" : (c.phone || ""),
            email: Array.isArray(c.email) ? c.email[0] || "" : (c.email || ""),
            instagram: c.instagram || "",
            youtube: c.youtube || "",
          })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Hubungi Kami</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Kontak ITS Archery</h1>
            <p className="text-xl text-primary-foreground/80">
              Punya pertanyaan atau ingin bergabung dengan kami? Jangan ragu untuk menghubungi tim ITS Archery.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Informasi Kontak</h2>
                <p className="text-muted-foreground mb-8">
                  Berikut adalah berbagai cara untuk menghubungi kami.
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
                        <p className="text-muted-foreground whitespace-pre-line">{contact.address}</p>
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
                      <div className="min-w-0">
                        <h3 className="font-semibold mb-2">Nomor Telepon</h3>
                        <p className="text-muted-foreground break-all">{contact.phone || "-"}</p>
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
                      <div className="min-w-0">
                        <h3 className="font-semibold mb-2">Email</h3>
                        <a href={contact.email ? `mailto:${contact.email}` : undefined} className="text-muted-foreground hover:text-primary break-all">
                          {contact.email || "-"}
                        </a>
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
                        {contact.hours.map((h, i) => (
                          <p key={i} className="text-muted-foreground">{h}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {(contact.instagram || contact.youtube) && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
                  <div className="flex gap-4">
                    {contact.instagram && (
                      <a href={toUrl(contact.instagram, "#")} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                          <Instagram className="w-5 h-5" />
                        </Button>
                      </a>
                    )}
                    {contact.youtube && (
                      <a href={toUrl(contact.youtube, "#")} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                          <Youtube className="w-5 h-5" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              )}
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

      {/* FAQ */}
      {contact.faq.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Pertanyaan Umum</h2>
              <p className="text-muted-foreground">Jawaban untuk pertanyaan yang sering diajukan</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {contact.faq.map((faq, index) => (
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
      )}
    </div>
  )
}
