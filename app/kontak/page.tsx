"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react"

interface ContactInfo {
  address: string
  phone: string
  phone2: string
  email: string
  instagram: string
  youtube: string
  hours: string[]
}

const FALLBACK: ContactInfo = {
  address: "Gedung Student Center ITS\nJl. Raya ITS, Keputih, Sukolilo\nSurabaya, Jawa Timur 60111",
  phone: "+62 812-3456-7890",
  phone2: "",
  email: "info@itsarchery.com",
  instagram: "",
  youtube: "",
  hours: ["Senin - Jumat: 16:00 - 18:00 WIB", "Sabtu: 09:00 - 12:00 WIB", "Minggu: Tutup"],
}

export default function KontakPage() {
  const [contact, setContact] = useState<ContactInfo>(FALLBACK)
  const [copied, setCopied] = useState<string | null>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
            phone2: Array.isArray(c.phone2) ? c.phone2[0] || "" : (c.phone2 || ""),
            email: Array.isArray(c.email) ? c.email[0] || "" : (c.email || ""),
            instagram: c.instagram || "",
            youtube: c.youtube || "",
          })
        }
      })
      .catch(() => {})
  }, [])

  const copy = (label: string, value: string) => {
    if (!value) return
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(label)
      if (copyTimer.current) clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(null), 1500)
    }).catch(() => {})
  }

  const CopyHint = ({ label }: { label: string }) => (
    <span className="flex items-center gap-1 text-xs text-green-600">
       {copied === label ? "Disalin!" : "Salin"}
    </span>
  )

  const infoCards = [
    { label: "alamat", title: "Alamat Sekretariat", icon: MapPin, value: contact.address, primary: true },
    { label: "cp1", title: "Contact Person (Asa)", icon: Phone, value: contact.phone, primary: false },
    { label: "cp2", title: "Contact Person (Andrya)", icon: Phone, value: contact.phone2, primary: false },
    { label: "email", title: "Email", icon: Mail, value: contact.email, primary: true },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Hubungi Kami</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Kontak ITS Archery</h1>
            <p className="text-xl text-primary-foreground/80">
              Punya pertanyaan atau ingin bergabung dengan kami? Jangan ragu untuk menghubungi CP kami  melalui media dibawah.

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
                  Berikut adalah berbagai cara untuk menghubungi kami. Klik untuk menyalin.
                </p>
              </div>

              <div className="space-y-6">
                {infoCards.map((card) => (
                  <Card key={card.label}>
                    <CardContent className="p-6">
                      <button
                        type="button"
                        onClick={() => copy(card.label, card.value)}
                        disabled={!card.value}
                        className="w-full text-left flex items-start gap-4 group disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${card.primary ? "bg-primary/10" : "bg-accent/10"}`}>
                          <card.icon className={`w-6 h-6 ${card.primary ? "text-primary" : "text-accent"}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold">{card.title}</h3>
                            {card.value && <CopyHint label={card.label} />}
                          </div>
                          {card.label === "email" && card.value ? (
                            <a
                              href={`mailto:${card.value}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-muted-foreground hover:text-primary break-all"
                            >
                              {card.value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground whitespace-pre-line break-all group-hover:text-foreground transition-colors">
                              {card.value || "-"}
                            </p>
                          )}
                        </div>
                      </button>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardContent className="p-6">
                    <button
                      type="button"
                      onClick={() => copy("jam", contact.hours.join("\n"))}
                      className="w-full text-left flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold">Jam Operasional</h3>
                          <CopyHint label="jam" />
                        </div>
                        {contact.hours.map((h, i) => (
                          <p key={i} className="text-muted-foreground">{h}</p>
                        ))}
                      </div>
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Kirim Email</CardTitle>
                  <CardDescription>Isi form di bawah ini untuk mengirim email kepada kami</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama</label>
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
                  <Button className="w-full">Kirim Email</Button>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  )
}
