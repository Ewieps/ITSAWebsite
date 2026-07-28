"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Star } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Achievement } from "@/lib/supabase"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Juara 1": Trophy,
  "Juara 2": Medal,
  "Juara 3": Medal,
}
const colorMap: Record<string, string> = {
  "Juara 1": "text-yellow-600",
  "Juara 2": "text-gray-500",
  "Juara 3": "text-amber-600",
}

export default function PrestasiPage() {
  const [prestasi, setPrestasi] = useState<Achievement[]>([])

  useEffect(() => {
    supabase
      .from("achievements")
      .select("*")
      .order("date", { ascending: false })
      .then(({ data }) => setPrestasi(data || []))
  }, [])

  const total = prestasi.length
  const juara1 = prestasi.filter((p) => p.rank === "Juara 1").length
  const juara2 = prestasi.filter((p) => p.rank === "Juara 2").length
  const juara3 = prestasi.filter((p) => p.rank === "Juara 3").length

  const statistik = [
    { label: "Total Prestasi", value: String(total), icon: Trophy },
    { label: "Juara 1", value: String(juara1), icon: Award },
    { label: "Juara 2", value: String(juara2), icon: Medal },
    { label: "Juara 3", value: String(juara3), icon: Star },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Hall of Fame</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Prestasi Kami</h1>
            <p className="text-xl text-primary-foreground/80">
              Pencapaian gemilang yang telah diraih ITS Archery dalam berbagai kompetisi tingkat lokal, regional, hingga
              nasional.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistik.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prestasi Terbaru</h2>
            <p className="text-xl text-muted-foreground">
              Pencapaian terkini yang membanggakan dari para atlet ITS Archery
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {prestasi.length === 0 && (
              <p className="text-center text-muted-foreground">Belum ada data prestasi.</p>
            )}
            {prestasi.map((item) => {
              const Icon = iconMap[item.rank] || Trophy
              const iconColor = colorMap[item.rank] || "text-primary"
              const tahun = item.date ? new Date(item.date).getFullYear() : ""
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className={`w-6 h-6 ${iconColor}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-1">{item.competition}</CardTitle>
                          <CardDescription className="text-base">
                            {item.category} &middot; {item.athlete}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            item.level === "Nasional"
                              ? "default"
                              : item.level === "Regional"
                                ? "secondary"
                                : "outline"
                          }
                          className="mb-2"
                        >
                          {item.level}
                        </Badge>
                        <div className="text-sm text-muted-foreground">{tahun}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-lg px-4 py-2 ${
                          item.rank?.includes("1")
                            ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                            : item.rank?.includes("2")
                              ? "border-gray-500 text-gray-700 bg-gray-50"
                              : "border-amber-500 text-amber-700 bg-amber-50"
                        }`}
                      >
                        {item.rank}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
