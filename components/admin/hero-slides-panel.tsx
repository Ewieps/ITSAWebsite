"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { GripVertical, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import type { HeroSlide } from "@/lib/supabase"

async function apiAdmin(path: string, method: string, body?: unknown) {
  const res = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}

interface SlideForm {
  image_url: string
  title: string
  subtitle: string
  order_index: number
  is_active: boolean
}

const EMPTY_FORM: SlideForm = {
  image_url: "",
  title: "",
  subtitle: "",
  order_index: 0,
  is_active: true,
}

export default function HeroSlidesPanel() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editItem, setEditItem] = useState<HeroSlide | null>(null)
  const [form, setForm] = useState<SlideForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<HeroSlide | null>(null)

  const fetchSlides = useCallback(async () => {
    setLoading(true)
    const res = await apiAdmin("/api/admin/hero-slides", "GET")
    setSlides(res.items || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchSlides()
  }, [fetchSlides])

  const openDialog = (item: HeroSlide | null) => {
    if (item) {
      setEditItem(item)
      setForm({
        image_url: item.image_url,
        title: item.title || "",
        subtitle: item.subtitle || "",
        order_index: item.order_index,
        is_active: item.is_active,
      })
    } else {
      setEditItem(null)
      setForm({ ...EMPTY_FORM, order_index: slides.length })
    }
    setDialogOpen(true)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("category", "hero")
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (data.success) setForm((p) => ({ ...p, image_url: data.path }))
    } catch { /* ignore */ }
    setUploading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    if (editItem) {
      await apiAdmin("/api/admin/hero-slides", "PUT", { id: editItem.id, ...form })
    } else {
      await apiAdmin("/api/admin/hero-slides", "POST", form)
    }
    setSaving(false)
    setDialogOpen(false)
    fetchSlides()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await apiAdmin("/api/admin/hero-slides", "DELETE", { id: deleteTarget.id })
    setDeleteTarget(null)
    fetchSlides()
  }

  const toggleActive = async (slide: HeroSlide) => {
    await apiAdmin("/api/admin/hero-slides", "PUT", { id: slide.id, is_active: !slide.is_active })
    fetchSlides()
  }

  const moveOrder = async (slide: HeroSlide, direction: -1 | 1) => {
    const newOrder = slide.order_index + direction
    if (newOrder < 0) return
    await apiAdmin("/api/admin/hero-slides", "PUT", { id: slide.id, order_index: newOrder })
    // Swap order with the other slide
    const other = slides.find((s) => s.order_index === newOrder && s.id !== slide.id)
    if (other) {
      await apiAdmin("/api/admin/hero-slides", "PUT", { id: other.id, order_index: slide.order_index })
    }
    fetchSlides()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{slides.length} slide</p>
        <Button size="sm" onClick={() => openDialog(null)}>
          <Plus className="w-4 h-4 mr-1" /> Tambah
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Memuat...</p>
      ) : slides.length === 0 ? (
        <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground">Belum ada slide.</p></CardContent></Card>
      ) : (
        <div className="space-y-3">
          {slides.map((slide) => (
            <div key={slide.id} className="flex items-center gap-4 p-3 border rounded-lg bg-background">
              <div className="shrink-0">
                <img src={slide.image_url} alt="" className="w-24 h-16 rounded object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{slide.title || "(Tanpa judul)"}</p>
                <p className="text-xs text-muted-foreground truncate">{slide.subtitle || "-"}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={slide.is_active ? "default" : "secondary"} className="text-xs">
                    {slide.is_active ? "Aktif" : "Nonaktif"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Urutan: {slide.order_index}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveOrder(slide, -1)} disabled={slide.order_index === 0}>
                  <GripVertical className="w-3 h-3 rotate-90" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveOrder(slide, 1)}>
                  <GripVertical className="w-3 h-3 -rotate-90" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => toggleActive(slide)}>
                  {slide.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => openDialog(slide)}>
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive" onClick={() => setDeleteTarget(slide)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Slide" : "Tambah Slide"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Foto</Label>
              <Input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
              {uploading && <p className="text-xs text-muted-foreground">Mengunggah...</p>}
              {form.image_url && (
                <img src={form.image_url} alt="Preview" className="w-full h-40 object-cover rounded mt-2" />
              )}
            </div>
            <div className="space-y-2">
              <Label>Judul (opsional)</Label>
              <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Judul slide" />
            </div>
            <div className="space-y-2">
              <Label>Subjudul (opsional)</Label>
              <Input value={form.subtitle} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} placeholder="Subjudul slide" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Urutan</Label>
                <Input type="number" value={form.order_index} onChange={(e) => setForm((p) => ({ ...p, order_index: parseInt(e.target.value) || 0 }))} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Button type="button" variant={form.is_active ? "default" : "outline"} className="w-full" onClick={() => setForm((p) => ({ ...p, is_active: !p.is_active }))}>
                  {form.is_active ? "Aktif" : "Nonaktif"}
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button type="submit" disabled={saving || !form.image_url}>{saving ? "Menyimpan..." : "Simpan"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Slide?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Yakin ingin menghapus slide ini?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
