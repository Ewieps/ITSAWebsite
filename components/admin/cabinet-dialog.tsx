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
import { Checkbox } from "@/components/ui/checkbox"
import type { Cabinet, CabinetMember } from "@/lib/supabase"

interface Props {
  cabinet: Cabinet | null
  members: CabinetMember[]
  open: boolean
  onClose: () => void
  onSaveCabinet: (data: Partial<Cabinet>) => Promise<void>
  onSaveMember: (data: Partial<CabinetMember>) => Promise<void>
  onDeleteMember: (id: string) => Promise<void>
}

const EMPTY_CABINET: Partial<Cabinet> = {
  year: new Date().getFullYear(),
  name: "",
  chairman: "",
  description: "",
  logo_url: "",
  visi: "",
  misi: "",
  is_current: false,
}

const EMPTY_MEMBER: Partial<CabinetMember> = {
  name: "",
  position: "",
}

export function CabinetDialog({ cabinet, members, open, onClose, onSaveCabinet, onSaveMember, onDeleteMember }: Props) {
  const [form, setForm] = useState<Partial<Cabinet>>(EMPTY_CABINET)
  const [memberForm, setMemberForm] = useState<Partial<CabinetMember>>(EMPTY_MEMBER)
  const [saving, setSaving] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)

  const handleOpen = (nextOpen: boolean) => {
    if (nextOpen && cabinet) {
      setForm({ ...cabinet })
    } else if (nextOpen) {
      setForm({ ...EMPTY_CABINET })
    }
    setShowAddMember(false)
    setMemberForm({ ...EMPTY_MEMBER })
    if (!nextOpen) onClose()
  }

  const handleSubmitCabinet = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSaveCabinet(form)
    setSaving(false)
    onClose()
  }

  const handleAddMember = async () => {
    if (!cabinet?.id || !memberForm.name || !memberForm.position) return
    setSaving(true)
    await onSaveMember({ ...memberForm, cabinet_id: cabinet.id })
    setMemberForm({ ...EMPTY_MEMBER })
    setShowAddMember(false)
    setSaving(false)
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingLogo(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("category", "cabinets")
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (data.success) {
        setForm((p) => ({ ...p, logo_url: data.path }))
      }
    } catch { /* ignore */ }
    setUploadingLogo(false)
  }

  const set = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{cabinet ? "Edit Kabinet" : "Tambah Kabinet"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitCabinet} className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              {form.logo_url ? (
                <img src={form.logo_url} alt="Logo" className="w-20 h-20 rounded-lg object-cover border" />
              ) : (
                <div className="w-20 h-20 rounded-lg border-2 border-dashed flex items-center justify-center text-xs text-muted-foreground">
                  Logo
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Label>Logo Kabinet</Label>
              <Input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploadingLogo} />
              {uploadingLogo && <p className="text-xs text-muted-foreground">Mengunggah...</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tahun</Label>
              <Input type="number" value={form.year || ""} onChange={(e) => set("year", parseInt(e.target.value))} required />
            </div>
            <div className="space-y-2">
              <Label>Nama Kabinet</Label>
              <Input value={form.name || ""} onChange={(e) => set("name", e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Ketua</Label>
            <Input value={form.chairman || ""} onChange={(e) => set("chairman", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi (opsional)</Label>
            <Textarea value={form.description || ""} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Visi</Label>
            <Textarea value={form.visi || ""} onChange={(e) => set("visi", e.target.value)} placeholder="Visi kabinet..." />
          </div>
          <div className="space-y-2">
            <Label>Misi</Label>
            <Textarea value={form.misi || ""} onChange={(e) => set("misi", e.target.value)} placeholder="Misi kabinet..." rows={4} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="is_current"
              checked={!!form.is_current}
              onCheckedChange={(v) => set("is_current", !!v)}
            />
            <Label htmlFor="is_current" className="cursor-pointer">Kabinet saat ini</Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
            <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
          </DialogFooter>
        </form>

        {cabinet?.id && (
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm">Anggota Kabinet</h4>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddMember(!showAddMember)}>
                {showAddMember ? "Batal" : "+ Tambah"}
              </Button>
            </div>

            {showAddMember && (
              <div className="space-y-2 mb-3">
                <div className="flex gap-2">
                  <Input placeholder="Nama" value={memberForm.name || ""} onChange={(e) => setMemberForm((p) => ({ ...p, name: e.target.value }))} className="flex-1" />
                  <Input placeholder="Jabatan" value={memberForm.position || ""} onChange={(e) => setMemberForm((p) => ({ ...p, position: e.target.value }))} className="flex-1" />
                </div>
                <div className="flex gap-2 items-center">
                  <Input
                    type="file"
                    accept="image/*"
                    className="flex-1"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const fd = new FormData()
                      fd.append("file", file)
                      fd.append("category", "cabinets")
                      const res = await fetch("/api/upload", { method: "POST", body: fd })
                      const data = await res.json()
                      if (data.success) setMemberForm((p) => ({ ...p, photo_url: data.path }))
                    }}
                  />
                  <Button type="button" size="sm" onClick={handleAddMember} disabled={saving}>Simpan</Button>
                </div>
              </div>
            )}

            {members.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada anggota.</p>
            ) : (
              <div className="space-y-1">
                {members.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 text-sm p-2 rounded bg-muted/50">
                    {m.photo_url ? (
                      <img src={m.photo_url} alt={m.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs text-muted-foreground">
                        {m.name.charAt(0)}
                      </div>
                    )}
                    <span className="flex-1 min-w-0">
                      <span className="font-medium">{m.name}</span>
                      <span className="text-muted-foreground ml-2">&mdash; {m.position}</span>
                    </span>
                    <Button type="button" variant="ghost" size="sm" className="text-destructive h-7 px-2 shrink-0" onClick={() => onDeleteMember(m.id)}>
                      Hapus
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
