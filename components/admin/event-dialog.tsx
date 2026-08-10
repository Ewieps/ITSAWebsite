"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Event } from "@/lib/supabase"

interface Props {
  item: Event | null
  open: boolean
  onClose: () => void
  onSave: (data: Partial<Event>) => Promise<void>
}

const EMPTY: Partial<Event> = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  category: "Latihan",
  status: "Mendatang",
  photo_url: "",
}

export function EventDialog({ item, open, onClose, onSave }: Props) {
  const [form, setForm] = useState<Partial<Event>>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(item ? { ...item } : { ...EMPTY })
    }
  }, [open, item])

  const handleOpen = (nextOpen: boolean) => {
    if (nextOpen && item) {
      setForm({ ...item })
    } else if (nextOpen) {
      setForm({ ...EMPTY })
    }
    if (!nextOpen) onClose()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("category", "events")
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (data.success) {
        setForm((p) => ({ ...p, photo_url: data.path }))
      }
    } catch {
      // ignore
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave(form)
    setSaving(false)
    onClose()
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Kegiatan" : "Tambah Kegiatan"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Judul</Label>
            <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea value={form.description || ""} onChange={(e) => set("description", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tanggal (opsional)</Label>
              <Input type="date" value={form.date || ""} onChange={(e) => set("date", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Waktu (opsional)</Label>
              <Input value={form.time || ""} onChange={(e) => set("time", e.target.value)} placeholder="08:00 - 12:00" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Lokasi</Label>
            <Input value={form.location || ""} onChange={(e) => set("location", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Input
                value={form.category || ""}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Kompetisi / Workshop / Sosial / Latihan"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status || "Mendatang"} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mendatang">Mendatang</SelectItem>
                  <SelectItem value="Berlangsung">Berlangsung</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Foto (opsional)</Label>
            <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
            {uploading && <p className="text-sm text-muted-foreground">Mengunggah...</p>}
            {form.photo_url && (
              <img src={form.photo_url} alt="Preview" className="w-full h-40 object-cover rounded mt-2" />
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
            <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
