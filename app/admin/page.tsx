"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  LogOut,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  User,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Trophy,
  Calendar,
  Image as ImageIcon,
  Landmark,
  Users,
} from "lucide-react"
import { signOut, getSession } from "@/lib/supabase"
import type {
  Registration,
  Achievement,
  Event,
  GalleryImage,
  Cabinet,
  CabinetMember,
} from "@/lib/supabase"
import { AchievementDialog } from "@/components/admin/achievement-dialog"
import { EventDialog } from "@/components/admin/event-dialog"
import { GalleryDialog } from "@/components/admin/gallery-dialog"
import { CabinetDialog } from "@/components/admin/cabinet-dialog"
import HeroSlidesPanel from "@/components/admin/hero-slides-panel"

async function apiAdmin(path: string, method: string, body?: unknown) {
  const res = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}

function RegistrationDetail({ reg }: { reg: Registration }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border rounded-lg">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{reg.nama_lengkap}</p>
            <p className="text-sm text-muted-foreground">
              {reg.nrp} &middot; {reg.jurusan}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={reg.tipe === "atlet" ? "default" : "secondary"}>
            {reg.tipe === "atlet" ? "Atlet" : "Umum"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(reg.created_at).toLocaleDateString("id-ID")}
          </span>
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t">
          <div className="grid grid-cols-2 gap-2 text-sm pt-3">
            <div>
              <span className="text-muted-foreground">No. Telepon</span>
              <p className="font-medium">{reg.no_telepon}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Tanggal Daftar</span>
              <p className="font-medium">
                {new Date(reg.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            {reg.tipe === "atlet" && reg.jenis_panah && (
              <div>
                <span className="text-muted-foreground">Jenis Panah</span>
                <p className="font-medium">{reg.jenis_panah}</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground font-medium">Jawaban Pengetahuan</span>
            {reg.jawaban_pengetahuan?.map((j, i) => (
              <div key={i} className="text-sm">
                <p className="text-muted-foreground">{j.pertanyaan}</p>
                <p className="mt-1">{j.jawaban}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground font-medium">Berkas</span>
            <div className="flex flex-wrap gap-2 text-sm">
              {reg.file_url_komitmen ? (
                <a href={reg.file_url_komitmen} target="_blank" rel="noopener noreferrer" className="underline text-accent hover:text-accent/80">
                  Surat Komitmen
                </a>
              ) : (
                <span className="text-muted-foreground">Surat Komitmen: -</span>
              )}
              {reg.file_url_bukti_ig ? (
                <a href={reg.file_url_bukti_ig} target="_blank" rel="noopener noreferrer" className="underline text-accent hover:text-accent/80">
                  Bukti Instagram
                </a>
              ) : (
                <span className="text-muted-foreground">Bukti Instagram: -</span>
              )}
              {reg.file_url_portofolio ? (
                <a href={reg.file_url_portofolio} target="_blank" rel="noopener noreferrer" className="underline text-accent hover:text-accent/80">
                  Portofolio
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()

  // Auth
  const [authChecked, setAuthChecked] = useState(false)

  // Settings
  const [regOpen, setRegOpen] = useState(true)
  const [savingReg, setSavingReg] = useState(false)
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactInstagram, setContactInstagram] = useState("")
  const [contactYoutube, setContactYoutube] = useState("")
  const [savingContact, setSavingContact] = useState(false)

  // Registrations
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [syncingSheets, setSyncingSheets] = useState(false)
  const [loadingReg, setLoadingReg] = useState(true)

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loadingAch, setLoadingAch] = useState(true)
  const [achDialogOpen, setAchDialogOpen] = useState(false)
  const [achEditItem, setAchEditItem] = useState<Achievement | null>(null)

  // Events
  const [events, setEvents] = useState<Event[]>([])
  const [loadingEvt, setLoadingEvt] = useState(true)
  const [evtDialogOpen, setEvtDialogOpen] = useState(false)
  const [evtEditItem, setEvtEditItem] = useState<Event | null>(null)

  // Gallery
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [loadingGal, setLoadingGal] = useState(true)
  const [galDialogOpen, setGalDialogOpen] = useState(false)
  const [galEditItem, setGalEditItem] = useState<GalleryImage | null>(null)

  // Cabinets
  const [cabinets, setCabinets] = useState<Cabinet[]>([])
  const [cabinetMembers, setCabinetMembers] = useState<CabinetMember[]>([])
  const [loadingCab, setLoadingCab] = useState(true)
  const [cabDialogOpen, setCabDialogOpen] = useState(false)
  const [cabEditItem, setCabEditItem] = useState<Cabinet | null>(null)

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string; onConfirm: () => void } | null>(null)

  // ---- Fetchers ----
  const fetchRegistrations = useCallback(async () => {
    setLoadingReg(true)
    const res = await apiAdmin("/api/admin/registrations", "GET")
    setRegistrations(res.items || [])
    setLoadingReg(false)
  }, [])

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings")
      const data = await res.json()
      if (data.success) {
        if (data.settings.registration) setRegOpen(data.settings.registration.isOpen ?? true)
        if (data.settings.contact) {
          setContactPhone(data.settings.contact.phone || "")
          setContactEmail(data.settings.contact.email || "")
          setContactInstagram(data.settings.contact.instagram || "")
          setContactYoutube(data.settings.contact.youtube || "")
        }
      }
    } catch { /* ignore */ }
  }, [])

  const fetchAchievements = useCallback(async () => {
    setLoadingAch(true)
    const res = await apiAdmin("/api/admin/achievements", "GET")
    setAchievements(res.items || [])
    setLoadingAch(false)
  }, [])

  const fetchEvents = useCallback(async () => {
    setLoadingEvt(true)
    const res = await apiAdmin("/api/admin/events", "GET")
    setEvents(res.items || [])
    setLoadingEvt(false)
  }, [])

  const fetchGallery = useCallback(async () => {
    setLoadingGal(true)
    const res = await apiAdmin("/api/admin/gallery", "GET")
    setGallery(res.items || [])
    setLoadingGal(false)
  }, [])

  const fetchCabinets = useCallback(async () => {
    setLoadingCab(true)
    const res = await apiAdmin("/api/admin/cabinets", "GET")
    setCabinets(res.items || [])
    setLoadingCab(false)
  }, [])

  // ---- Auth check ----
  useEffect(() => {
    const check = async () => {
      const session = await getSession()
      if (!session) {
        router.replace("/admin/login")
        return
      }
      setAuthChecked(true)
      fetchRegistrations()
      fetchSettings()
      fetchAchievements()
      fetchEvents()
      fetchGallery()
      fetchCabinets()
    }
    check()
  }, [router, fetchRegistrations, fetchSettings, fetchAchievements, fetchEvents, fetchGallery, fetchCabinets])

  // ---- Settings ----
  const saveRegSetting = async (isOpen: boolean) => {
    setSavingReg(true)
    setRegOpen(isOpen)
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "registration", value: { isOpen } }),
      })
    } catch {
      setRegOpen(!isOpen)
    }
    setSavingReg(false)
  }

  const saveContactSetting = async () => {
    setSavingContact(true)
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "contact",
          value: { phone: contactPhone, email: contactEmail, instagram: contactInstagram, youtube: contactYoutube },
        }),
      })
    } catch { /* ignore */ }
    setSavingContact(false)
  }

  // ---- CRUD ----
  const handleSheetsSync = async () => {
    setSyncingSheets(true)
    try {
      const res = await fetch("/api/admin/sheets-sync", { method: "POST" })
      const data = await res.json()
      alert(data.message || (data.success ? "Sinkronisasi berhasil." : "Sinkronisasi gagal."))
    } catch {
      alert("Tidak dapat terhubung ke server.")
    }
    setSyncingSheets(false)
  }

  const handleSaveAchievement = async (data: Partial<Achievement>) => {
    if (data.id) {
      await apiAdmin("/api/admin/achievements", "PUT", data)
    } else {
      await apiAdmin("/api/admin/achievements", "POST", data)
    }
    fetchAchievements()
  }

  const handleSaveEvent = async (data: Partial<Event>) => {
    if (data.id) {
      await apiAdmin("/api/admin/events", "PUT", data)
    } else {
      await apiAdmin("/api/admin/events", "POST", data)
    }
    fetchEvents()
  }

  const handleSaveGallery = async (data: Partial<GalleryImage>) => {
    if (data.id) {
      await apiAdmin("/api/admin/gallery", "PUT", data)
    } else {
      await apiAdmin("/api/admin/gallery", "POST", { ...data, upload_date: new Date().toISOString().slice(0, 10) })
    }
    fetchGallery()
  }

  const handleSaveCabinet = async (data: Partial<Cabinet>) => {
    if (data.id) {
      await apiAdmin("/api/admin/cabinets", "PUT", data)
    } else {
      await apiAdmin("/api/admin/cabinets", "POST", data)
    }
    fetchCabinets()
  }

  const handleSaveCabinetMember = async (data: Partial<CabinetMember>) => {
    if (data.id) {
      await apiAdmin("/api/admin/cabinet-members", "PUT", data)
    } else {
      await apiAdmin("/api/admin/cabinet-members", "POST", data)
    }
    fetchCabinets()
    // Also refresh members for dialog
    if (cabEditItem?.id) {
      const res = await apiAdmin("/api/admin/cabinets", "GET")
      const cab = (res.items || []).find((c: Cabinet) => c.id === cabEditItem.id)
      setCabinetMembers(cab?.cabinet_members || [])
    }
  }

  const handleDeleteCabinetMember = async (id: string) => {
    await apiAdmin("/api/admin/cabinet-members", "DELETE", { id })
    fetchCabinets()
    if (cabEditItem?.id) {
      const res = await apiAdmin("/api/admin/cabinets", "GET")
      const cab = (res.items || []).find((c: Cabinet) => c.id === cabEditItem.id)
      setCabinetMembers(cab?.cabinet_members || [])
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteTarget.onConfirm()
    setDeleteTarget(null)
  }

  const handleLogout = async () => {
    fetch("/api/admin/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    })
      .catch(() => {})
      .finally(async () => {
        await signOut()
        router.push("/admin/login")
      })
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Kelola data ITS Archery</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { fetchRegistrations(); fetchAchievements(); fetchEvents(); fetchGallery(); fetchCabinets(); }}>
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        {/* Settings */}
        <Card className="mb-8">
          <CardContent className="p-6 space-y-6">
            {/* Registration toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Pendaftaran</p>
                  <p className="text-sm text-muted-foreground">{regOpen ? "Sedang dibuka" : "Sedang ditutup"}</p>
                </div>
              </div>
              <Button variant={regOpen ? "destructive" : "default"} size="sm" disabled={savingReg} onClick={() => saveRegSetting(!regOpen)}>
                {savingReg ? "Menyimpan..." : regOpen ? "Tutup" : "Buka"}
              </Button>
            </div>
            {/* Contact info */}
            <div className="border-t pt-4">
              <p className="font-medium mb-3">Informasi Kontak (ditampilkan di halaman Kontak)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">No. Telepon</Label>
                  <Input size={1} value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="08xxx" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Email</Label>
                  <Input size={1} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="itsarchery@gmail.com" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Instagram</Label>
                  <Input size={1} value={contactInstagram} onChange={(e) => setContactInstagram(e.target.value)} placeholder="@its_archery" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">YouTube</Label>
                  <Input size={1} value={contactYoutube} onChange={(e) => setContactYoutube(e.target.value)} placeholder="youtube.com/@itsarchery" />
                </div>
              </div>
              <Button size="sm" className="mt-3" disabled={savingContact} onClick={saveContactSetting}>
                {savingContact ? "Menyimpan..." : "Simpan Kontak"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="registrations">
          <TabsList className="mb-4">
            <TabsTrigger value="registrations"><Users className="w-4 h-4 mr-1" /> Pendaftaran</TabsTrigger>
            <TabsTrigger value="achievements"><Trophy className="w-4 h-4 mr-1" /> Prestasi</TabsTrigger>
            <TabsTrigger value="events"><Calendar className="w-4 h-4 mr-1" /> Kegiatan</TabsTrigger>
            <TabsTrigger value="gallery"><ImageIcon className="w-4 h-4 mr-1" /> Galeri</TabsTrigger>
            <TabsTrigger value="cabinets"><Landmark className="w-4 h-4 mr-1" /> Kabinet</TabsTrigger>
            <TabsTrigger value="hero"><ImageIcon className="w-4 h-4 mr-1" /> Hero</TabsTrigger>
          </TabsList>

          {/* ---- Registrations ---- */}
          <TabsContent value="registrations">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                <p className="text-sm text-muted-foreground">{registrations.length} pendaftaran terdaftar</p>
                <Button size="sm" variant="outline" onClick={handleSheetsSync} disabled={syncingSheets}>
                  {syncingSheets ? "Menyinkronkan..." : "Sinkronkan ke Google Sheets"}
                </Button>
              </div>
              {loadingReg ? (
                <p className="text-muted-foreground text-sm">Memuat data...</p>
              ) : registrations.length === 0 ? (
                <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground">Belum ada pendaftaran masuk.</p></CardContent></Card>
              ) : (
                registrations.map((reg) => <RegistrationDetail key={reg.id} reg={reg} />)
              )}
            </div>
          </TabsContent>

          {/* ---- Achievements ---- */}
          <TabsContent value="achievements">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{achievements.length} prestasi</p>
              <Button size="sm" onClick={() => { setAchEditItem(null); setAchDialogOpen(true) }}>
                <Plus className="w-4 h-4 mr-1" /> Tambah
              </Button>
            </div>
            {loadingAch ? (
              <p className="text-muted-foreground text-sm">Memuat...</p>
            ) : achievements.length === 0 ? (
              <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground">Belum ada prestasi.</p></CardContent></Card>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Kejuaraan</TableHead>
                      <TableHead>Atlet</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead className="w-24"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {achievements.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.title}</TableCell>
                        <TableCell>{a.competition}</TableCell>
                        <TableCell>{a.athlete}</TableCell>
                        <TableCell><Badge variant="outline">{a.level}</Badge></TableCell>
                        <TableCell>{a.rank}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => { setAchEditItem(a); setAchDialogOpen(true) }}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteTarget({ id: a.id, label: a.title, onConfirm: async () => { await apiAdmin("/api/admin/achievements", "DELETE", { id: a.id }); fetchAchievements() } })}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <AchievementDialog item={achEditItem} open={achDialogOpen} onClose={() => setAchDialogOpen(false)} onSave={handleSaveAchievement} />
          </TabsContent>

          {/* ---- Events ---- */}
          <TabsContent value="events">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{events.length} kegiatan</p>
              <Button size="sm" onClick={() => { setEvtEditItem(null); setEvtDialogOpen(true) }}>
                <Plus className="w-4 h-4 mr-1" /> Tambah
              </Button>
            </div>
            {loadingEvt ? (
              <p className="text-muted-foreground text-sm">Memuat...</p>
            ) : events.length === 0 ? (
              <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground">Belum ada kegiatan.</p></CardContent></Card>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-24"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((e) => (
                      <TableRow key={e.id}>
                        <TableCell className="font-medium">{e.title}</TableCell>
                        <TableCell>{new Date(e.date).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell>{e.location}</TableCell>
                        <TableCell><Badge variant="outline">{e.category}</Badge></TableCell>
                        <TableCell>
                          <Badge variant={e.status === "Mendatang" ? "default" : e.status === "Berlangsung" ? "secondary" : "outline"}>
                            {e.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => { setEvtEditItem(e); setEvtDialogOpen(true) }}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteTarget({ id: e.id, label: e.title, onConfirm: async () => { await apiAdmin("/api/admin/events", "DELETE", { id: e.id }); fetchEvents() } })}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <EventDialog item={evtEditItem} open={evtDialogOpen} onClose={() => setEvtDialogOpen(false)} onSave={handleSaveEvent} />
          </TabsContent>

          {/* ---- Gallery ---- */}
          <TabsContent value="gallery">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{gallery.length} foto</p>
              <Button size="sm" onClick={() => { setGalEditItem(null); setGalDialogOpen(true) }}>
                <Plus className="w-4 h-4 mr-1" /> Tambah
              </Button>
            </div>
            {loadingGal ? (
              <p className="text-muted-foreground text-sm">Memuat...</p>
            ) : gallery.length === 0 ? (
              <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground">Belum ada foto.</p></CardContent></Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="group relative border rounded-lg overflow-hidden">
                    <img src={g.image_url} alt={g.title} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <p className="font-medium text-sm truncate">{g.title}</p>
                      <p className="text-xs text-muted-foreground">{g.category}</p>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="sm" className="h-7 w-7 p-0" onClick={() => { setGalEditItem(g); setGalDialogOpen(true) }}>
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <Button variant="secondary" size="sm" className="h-7 w-7 p-0 text-destructive" onClick={() => setDeleteTarget({ id: g.id, label: g.title, onConfirm: async () => { await apiAdmin("/api/admin/gallery", "DELETE", { id: g.id }); fetchGallery() } })}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <GalleryDialog item={galEditItem} open={galDialogOpen} onClose={() => setGalDialogOpen(false)} onSave={handleSaveGallery} />
          </TabsContent>

          {/* ---- Cabinets ---- */}
          <TabsContent value="cabinets">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{cabinets.length} kabinet</p>
              <Button size="sm" onClick={() => { setCabEditItem(null); setCabDialogOpen(true) }}>
                <Plus className="w-4 h-4 mr-1" /> Tambah
              </Button>
            </div>
            {loadingCab ? (
              <p className="text-muted-foreground text-sm">Memuat...</p>
            ) : cabinets.length === 0 ? (
              <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground">Belum ada kabinet.</p></CardContent></Card>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tahun</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Ketua</TableHead>
                      <TableHead>Anggota</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-24"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cabinets.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.year}</TableCell>
                        <TableCell className="font-medium">Kabinet {c.name}</TableCell>
                        <TableCell>{c.chairman}</TableCell>
                        <TableCell>{c.cabinet_members?.length || 0} orang</TableCell>
                        <TableCell>
                          {c.is_current ? <Badge>Saat Ini</Badge> : <Badge variant="outline">Selesai</Badge>}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => {
                              setCabEditItem(c)
                              setCabinetMembers(c.cabinet_members || [])
                              setCabDialogOpen(true)
                            }}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteTarget({ id: c.id, label: `Kabinet ${c.name}`, onConfirm: async () => { await apiAdmin("/api/admin/cabinets", "DELETE", { id: c.id }); fetchCabinets() } })}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <CabinetDialog
              cabinet={cabEditItem}
              members={cabinetMembers}
              open={cabDialogOpen}
              onClose={() => setCabDialogOpen(false)}
              onSaveCabinet={handleSaveCabinet}
              onSaveMember={handleSaveCabinetMember}
              onDeleteMember={handleDeleteCabinetMember}
            />
          </TabsContent>

          {/* ---- Hero ---- */}
          <TabsContent value="hero">
            <HeroSlidesPanel />
          </TabsContent>
        </Tabs>

        {/* Delete confirmation */}
        <Dialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hapus?</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Yakin ingin menghapus <span className="font-medium text-foreground">{deleteTarget?.label}</span>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>Batal</Button>
              <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
