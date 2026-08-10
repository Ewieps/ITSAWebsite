"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Event } from "@/lib/supabase"

const todayStr = () => new Date().toISOString().slice(0, 10)

export default function KegiatanPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [selected, setSelected] = useState<Event | null>(null)
  const [kategori, setKategori] = useState("Semua")

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false })
      .then(({ data }) => setEvents(data || []))
  }, [])

  const today = todayStr()
  const categories = Array.from(new Set(events.map((e) => e.category).filter(Boolean)))
  const inCategory = (e: Event) => kategori === "Semua" || e.category === kategori
  const upcoming = events.filter(
    (e) => (e.status !== "Selesai" && (!e.date || e.date >= today)) && inCategory(e)
  )
  const finished = events.filter(
    (e) => (e.status === "Selesai" || (e.date && e.date < today)) && inCategory(e)
  )

  const EventCard = ({ event }: { event: Event }) => {
    const isUpcoming = event.status !== "Selesai" && (!event.date || event.date >= today)
    return (
      <Card
        className="hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setSelected(event)}
      >
        {event.photo_url && (
          <div className="relative h-40 overflow-hidden rounded-t-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={event.photo_url} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <Badge variant="secondary">{event.category}</Badge>
              </div>
              <CardDescription className="text-base mb-4 line-clamp-3">{event.description}</CardDescription>
            </div>
            <Badge
              variant="outline"
              className={isUpcoming ? "text-green-700 border-green-500 bg-green-50" : "text-gray-600 border-gray-400"}
            >
              {event.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {event.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{event.date}</span>
              </div>
            )}
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
         
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Program & Kegiatan</h1>
            <p className="text-xl text-primary-foreground/80">
              Berbagai kegiatan yang kami telah, akan, dan sedang lakukan di ITS Archery. Simak agenda selanjutnya!
            </p>
          </div>
        </div>
      </section>

      {/* Category filter */}
      {categories.length > 0 && (
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {["Semua", ...categories].map((cat) => (
                <Button
                  key={cat}
                  variant={kategori === cat ? "default" : "outline"}
                  onClick={() => setKategori(cat)}
                  className="rounded-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Agenda Saat ini</h2>
            <p className="text-xl text-muted-foreground">Kegiatan yang sedang berlangsung & akan datang</p>
          </div>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {upcoming.length === 0 && (
              <p className="text-center text-muted-foreground">Belum ada agenda mendatang.</p>
            )}
            {upcoming.map((agenda) => <EventCard key={agenda.id} event={agenda} />)}
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
              {finished.map((kegiatan) => <EventCard key={kegiatan.id} event={kegiatan} />)}
            </div>
          </div>
        </section>
      )}

      {selected && (
        <Dialog open={!!selected} onOpenChange={(o) => { if (!o) setSelected(null) }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogTitle className="sr-only">{selected.title}</DialogTitle>
            <div className="space-y-4">
              {selected.photo_url && (
                <img
                  src={selected.photo_url}
                  alt={selected.title}
                  className="max-h-[70vh] w-auto max-w-full mx-auto object-contain rounded-lg"
                />
              )}
              <div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-2xl">{selected.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{selected.category}</Badge>
                    <Badge variant={selected.status === "Mendatang" ? "default" : selected.status === "Berlangsung" ? "secondary" : "outline"}>
                      {selected.status}
                    </Badge>
                  </div>
                </div>
                {(selected.date || selected.time || selected.location) && (
                  <div className="grid sm:grid-cols-3 gap-3 text-sm mt-4">
                    {selected.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{selected.date}</span>
                      </div>
                    )}
                    {selected.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{selected.time}</span>
                      </div>
                    )}
                    {selected.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selected.location}</span>
                      </div>
                    )}
                  </div>
                )}
                {selected.description && (
                  <p className="text-muted-foreground mt-4 whitespace-pre-line">{selected.description}</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
