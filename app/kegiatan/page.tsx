"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Target, Users, Trophy } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Event } from "@/lib/supabase"

const kategoriIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Kompetisi: Trophy,
  Workshop: Target,
  Sosial: Users,
  Latihan: Target,
}
const kategoriColor: Record<string, string> = {
  Kompetisi: "bg-primary/10 text-primary",
  Workshop: "bg-accent/10 text-accent",
  Sosial: "bg-secondary text-secondary-foreground",
  Latihan: "bg-primary/10 text-primary",
}

export default function KegiatanPage() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false })
      .then(({ data }) => setEvents(data || []))
  }, [])

  const upcoming = events.filter((e) => e.status === "Mendatang")
  const finished = events.filter((e) => e.status === "Selesai")

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Kegiatan & Agenda</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Program Kegiatan</h1>
            <p className="text-xl text-primary-foreground/80">
              Berbagai kegiatan yang kami lakukan di ITS Archery. Simak agenda selanjutnya!
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Agenda Mendatang</h2>
            <p className="text-xl text-muted-foreground">Kegiatan yang akan segera dilaksanakan</p>
          </div>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {upcoming.length === 0 && (
              <p className="text-center text-muted-foreground">Belum ada agenda mendatang.</p>
            )}
            {upcoming.map((agenda) => {
              const Icon = kategoriIcon[agenda.category] || Target
              return (
                <Card key={agenda.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{agenda.title}</CardTitle>
                          <Badge variant={agenda.category === "Kompetisi" ? "default" : "secondary"}>
                            {agenda.category}
                          </Badge>
                        </div>
                        <CardDescription className="text-base mb-4">{agenda.description}</CardDescription>
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
                        <span>{agenda.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{agenda.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{agenda.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Finished */}
      {finished.length > 0 && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Kegiatan Terdahulu</h2>
              <p className="text-xl text-muted-foreground">Rekam jejak kegiatan yang telah berhasil dilaksanakan</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {finished.map((kegiatan) => (
                <Card key={kegiatan.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit text-gray-600 border-gray-400">
                      Selesai
                    </Badge>
                    <CardTitle className="line-clamp-2">{kegiatan.title}</CardTitle>
                    <CardDescription>{kegiatan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{kegiatan.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{kegiatan.location}</span>
                    </div>
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
