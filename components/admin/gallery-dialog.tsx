"use client"

import { useState } from "react"
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
import type { GalleryImage } from "@/lib/supabase"

interface Props {
  item: GalleryImage | null
  open: boolean
  onClose: () => void
  onSave: (data: Partial<GalleryImage>) => Promise<void>
}

const EMPTY: Partial<GalleryImage> = {
  title: "",
  description: "",
  category: "",
  image_url: "",
}

export function GalleryDialog({ item, open, onClose, onSave }: Props) {
  const [form, setForm] = useState<Partial<GalleryImage>>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

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
      fd.append("category", "gallery")
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (data.success) {
        setForm((p) => ({ ...p, image_url: data.path }))
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
          <DialogTitle>{item ? "Edit Galeri" : "Tambah Galeri"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Judul</Label>
            <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi (opsional)</Label>
            <Textarea value={form.description || ""} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Kategori</Label>
            <Input value={form.category || ""} onChange={(e) => set("category", e.target.value)} placeholder="Latihan / Kompetisi / etc." required />
          </div>
          <div className="space-y-2">
            <Label>Upload Foto</Label>
            <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
            {uploading && <p className="text-sm text-muted-foreground">Mengunggah...</p>}
            {form.image_url && (
              <img src={form.image_url} alt="Preview" className="w-full h-40 object-cover rounded mt-2" />
            )}
          </div>
          <div className="space-y-2">
            <Label>Atau URL Gambar</Label>
            <Input value={form.image_url || ""} onChange={(e) => set("image_url", e.target.value)} placeholder="/uploads/gallery/..." />
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
