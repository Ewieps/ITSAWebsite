"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Target, Users, Star } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { CabinetWithMembers } from "@/lib/supabase"

const warnaLogo = [
  { color: "#2563EB", name: "Biru", meaning: "Profesional dalam panahan" },
  { color: "#F59E0B", name: "Kuning", meaning: "Optimisme dalam berprestasi" },
  { color: "#EF4444", name: "Merah", meaning: "Semangat Berkembang & Berorganisasi" },
  { color: "#F97316", name: "Jingga", meaning: "Kehangatan & Kekeluargaan" },
  { color: "#8B5CF6", name: "Ungu", meaning: "Menjunjung Tinggi Sportifitas" },
  { color: "#111827", name: "Hitam", meaning: "Integritas Diri dalam Berorganisasi" },
]

const objekLogo = [
  { name: "Orang Memanah", meaning: "Ketenangan & Fokus untuk Mencapai Tujuan" },
  { name: "Busur Panah", meaning: "Identik dengan Panahan" },
  { name: "Tiga Garis Hitam", meaning: "Organisasi yang Dinamis" },
]

const FALLBACK_ABOUT = {
  description:
    "UKM ITS Archery (ITSA) merupakan UKM Olahraga di ITS yang bergerak di bidang panahan. ITSA didirikan pada 8 November 2016 di ITS oleh sekelompok mahasiswa yang memiliki minat dalam olahraga panahan.\n\nSetelah 6 bulan vakum, anggota-anggota yang tergabung di dalamnya mulai tergerak kembali untuk membangkitkan komunitas tersebut. Dengan semangat membara, beberapa anggota yang tersisa berhasil menghidupkan kembali komunitas hingga berkembang seperti sekarang ini.\n\nPada 27 Mei 2019, ITS Archery resmi menjadi UKM di ITS.",
  visi:
    "Menjadi wadah pengembangan diri pada bidang panahan di KM ITS terutama pada bidang minat bakat yang terukur secara nyata dan berkualitas serta menjadi rumah untuk berkembang bagi seluruh anggota dan staff.",
  misi:
    "Meningkatkan minat dan bakat seluruh anggota melalui pelatihan dan pembinaan yang berkelanjutan.\nMeningkatkan rasa tanggungjawab dan komitmen yang kuat melalui profesionalisme yang ada.\nMenciptakan lingkungan yang nyaman bagi seluruh anggota dan staff.",
}

export default function TentangKamiPage() {
  const [cabinets, setCabinets] = useState<CabinetWithMembers[]>([])
  const [about, setAbout] = useState(FALLBACK_ABOUT)

  useEffect(() => {
    supabase
      .from("cabinets")
      .select("*, cabinet_members(*)")
      .order("year", { ascending: true })
      .order("id", { ascending: true })
      .then(({ data }) => setCabinets((data as CabinetWithMembers[]) || []))
  }, [])

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.settings.about) {
          const a = data.settings.about
          setAbout({
            description: a.description || FALLBACK_ABOUT.description,
            visi: a.visi || FALLBACK_ABOUT.visi,
            misi: a.misi || FALLBACK_ABOUT.misi,
          })
        }
      })
      .catch(() => {})
  }, [])

  const current = cabinets.find((c) => c.is_current)
  const past = cabinets.filter((c) => !c.is_current)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
      
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Tentang ITS Archery</h1>
            <p className="text-xl text-primary-foreground/80">
              Disini, Anda dapat menemukan informasi lengkap mengenai ITS Archery; Sejarah, makna, visi & misi, serta kabinet yang telah berkontribusi dalam perjalanan organisasi ini.
            </p>
          </div>
        </div>
      </section>

      {/* Tentang ITSA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <Image
                src="/uploads/material/ITSAlogo.png"
                alt="Logo ITS Archery"
                width={160}
                height={160}
                className="mb-6"
              />
              <h2 className="text-3xl font-bold mb-2">UKM ITS Archery (ITSA)</h2>
              <p className="text-xl text-accent font-semibold italic">
                &ldquo;Membidik dengan Hati&rdquo;
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p className="whitespace-pre-line">{about.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Arti Logo */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Arti Logo</h2>
              <p className="text-xl text-muted-foreground">Makna di balik elemen-elemen logo ITS Archery</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Logo on left */}
              <div className="flex items-center justify-center">
                <Image
                  src="/uploads/material/ITSAlogo.png"
                  alt="Logo ITS Archery"
                  width={320}
                  height={320}
                  className="opacity-80"
                />
              </div>

              {/* Descriptions on right */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Komponen Warna</h3>
                  <div className="space-y-3">
                    {warnaLogo.map((w) => (
                      <div key={w.name} className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white shadow shrink-0"
                          style={{ backgroundColor: w.color }}
                        />
                        <div>
                          <span className="font-medium">{w.name}: </span>
                          <span className="text-muted-foreground">{w.meaning}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Komponen Objek</h3>
                  <div className="space-y-3">
                    {objekLogo.map((o) => (
                      <div key={o.name}>
                        <p className="font-medium">{o.name}</p>
                        <p className="text-sm text-muted-foreground">{o.meaning}</p>
                      </div>
                    ))}
                    <div>
                      <p className="font-medium">Tulisan INSTITUT TEKNOLOGI SEPULUH NOPEMBER ARCHERY</p>
                      <p className="text-sm text-muted-foreground">Melambangkan nama organisasi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi ITSA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visi & Misi</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Visi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground whitespace-pre-line">{about.visi}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Misi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                  {about.misi.split("\n").filter(Boolean).map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kabinet Saat Ini */}
      {current && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-accent text-accent-foreground mb-4">
                <Star className="w-3 h-3 mr-1" />
                Kabinet {current.year}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Kabinet {current.name}</h2>
              <p className="text-lg text-muted-foreground">
                Ketua: <span className="font-semibold text-foreground">{current.chairman}</span>
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                {/* Logo */}
                <div className="flex justify-center md:justify-end">
                  {current.logo_url ? (
                    <img
                      src={current.logo_url}
                      alt={`Logo Kabinet ${current.name}`}
                      className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover shadow-lg border-2 border-accent/30"
                    />
                  ) : (
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground">
                      Logo Kabinet
                    </div>
                  )}
                </div>

                {/* Visi & Misi */}
                <div className="md:col-span-2 space-y-6">
                  {current.visi && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary" />
                          Visi
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{current.visi}</p>
                      </CardContent>
                    </Card>
                  )}
                  {current.misi && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Target className="w-4 h-4 text-accent" />
                          Misi
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground whitespace-pre-line">{current.misi}</p>
                      </CardContent>
                    </Card>
                  )}
                  {!current.visi && !current.misi && current.description && (
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-muted-foreground">{current.description}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Staff / Anggota */}
              {current.cabinet_members?.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-4 text-center">Pengurus Kabinet</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {current.cabinet_members.map((m) => (
                      <div key={m.id} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background border text-center">
                        {m.photo_url ? (
                          <img src={m.photo_url} alt={m.name} className="w-16 h-16 rounded-full object-cover" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-7 h-7 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm leading-tight">{m.name}</p>
                          <p className="text-muted-foreground text-xs">{m.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Kabinet Sebelumnya */}
      {past.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Kabinet Sebelumnya</h2>
              <p className="text-xl text-muted-foreground">Perjalanan ITS Archery dari awal hingga kini</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="multiple" className="space-y-4">
                {[...past].reverse().map((cabinet) => (
                  <AccordionItem
                    key={cabinet.id}
                    value={cabinet.id}
                    className="border rounded-lg px-4 bg-background"
                  >
                    <AccordionTrigger className="py-4">
                      <div className="flex items-center gap-3 text-left">
                        {cabinet.logo_url ? (
                          <img src={cabinet.logo_url} alt="" className="w-8 h-8 rounded-md object-cover shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0 text-xs text-muted-foreground">
                            {String(cabinet.year).slice(-2)}
                          </div>
                        )}
                        <div>
                          <span className="font-semibold">Kabinet {cabinet.name}</span>
                          <span className="text-muted-foreground ml-2">
                            &mdash; {cabinet.chairman}
                          </span>
                          <Badge variant="outline" className="ml-2 text-xs">{cabinet.year}</Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col sm:flex-row gap-6 items-start pb-4">
                        {cabinet.logo_url && (
                          <div className="shrink-0 mx-auto sm:mx-0">
                            <img
                              src={cabinet.logo_url}
                              alt={`Logo Kabinet ${cabinet.name}`}
                              className="w-56 h-56 sm:w-64 sm:h-64 rounded-xl object-cover shadow-md border"
                            />
                          </div>
                        )}
                        {cabinet.description && (
                          <p className="text-muted-foreground flex-1 whitespace-pre-line">{cabinet.description}</p>
                        )}
                        {cabinet.logo_url && !cabinet.description && (
                          <p className="text-muted-foreground">Belum ada deskripsi untuk kabinet ini.</p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
