"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar, Users, Settings } from "lucide-react"

export default function RegistrationToggle() {
  const [config, setConfig] = useState({
    isOpen: true,
    openDate: "2024-08-01",
    closeDate: "2024-08-31",
    maxParticipants: 50,
    currentParticipants: 23,
  })

  const handleToggle = () => {
    setConfig((prev) => ({ ...prev, isOpen: !prev.isOpen }))
    // Di sini nanti panggil API untuk update database
  }

  const handleConfigChange = (field: string, value: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Pengaturan Pendaftaran
          </CardTitle>
          <CardDescription>Kelola periode dan status pendaftaran anggota baru</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label className="text-base font-medium">Status Pendaftaran</Label>
              <p className="text-sm text-muted-foreground">
                {config.isOpen ? "Pendaftaran sedang dibuka" : "Pendaftaran ditutup"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={config.isOpen ? "default" : "secondary"}>{config.isOpen ? "BUKA" : "TUTUP"}</Badge>
              <Switch checked={config.isOpen} onCheckedChange={handleToggle} />
            </div>
          </div>

          {/* Configuration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="openDate">Tanggal Buka</Label>
              <Input
                id="openDate"
                type="date"
                value={config.openDate}
                onChange={(e) => handleConfigChange("openDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closeDate">Tanggal Tutup</Label>
              <Input
                id="closeDate"
                type="date"
                value={config.closeDate}
                onChange={(e) => handleConfigChange("closeDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Kuota Maksimal</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={config.maxParticipants}
                onChange={(e) => handleConfigChange("maxParticipants", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Pendaftar Saat Ini</Label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded">
                <Users className="w-4 h-4" />
                <span className="font-medium">{config.currentParticipants}</span>
              </div>
            </div>
          </div>

          <Button className="w-full">Simpan Pengaturan</Button>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{config.currentParticipants}</p>
                <p className="text-sm text-muted-foreground">Total Pendaftar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{config.maxParticipants - config.currentParticipants}</p>
                <p className="text-sm text-muted-foreground">Kuota Tersisa</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round((config.currentParticipants / config.maxParticipants) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Terisi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
