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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Achievement } from "@/lib/supabase"

interface Props {
  item: Achievement | null
  open: boolean
  onClose: () => void
  onSave: (data: Partial<Achievement>) => Promise<void>
}

const EMPTY: Partial<Achievement> = {
  title: "",
  competition: "",
  category: "",
  rank: "",
  athlete: "",
  level: "Lokal",
  date: "",
  photo_url: "",
}

export function AchievementDialog({ item, open, onClose, onSave }: Props) {
  const [form, setForm] = useState<Partial<Achievement>>(EMPTY)
  const [saving, setSaving] = useState(false)

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
          <DialogTitle>{item ? "Edit Prestasi" : "Tambah Prestasi"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Judul</Label>
            <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Kejuaraan</Label>
            <Input value={form.competition || ""} onChange={(e) => set("competition", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Input value={form.category || ""} onChange={(e) => set("category", e.target.value)} placeholder="Barebow / Recurve / etc." required />
            </div>
            <div className="space-y-2">
              <Label>Peringkat</Label>
              <Input value={form.rank || ""} onChange={(e) => set("rank", e.target.value)} placeholder="Juara 1 / Silver / etc." required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Atlet</Label>
            <Input value={form.athlete || ""} onChange={(e) => set("athlete", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Level</Label>
              <Select value={form.level || "Lokal"} onValueChange={(v) => set("level", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lokal">Lokal</SelectItem>
                  <SelectItem value="Regional">Regional</SelectItem>
                  <SelectItem value="Nasional">Nasional</SelectItem>
                  <SelectItem value="Internasional">Internasional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tanggal</Label>
              <Input type="date" value={form.date || ""} onChange={(e) => set("date", e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>URL Foto (opsional)</Label>
            <Input value={form.photo_url || ""} onChange={(e) => set("photo_url", e.target.value)} placeholder="/uploads/achievements/..." />
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
