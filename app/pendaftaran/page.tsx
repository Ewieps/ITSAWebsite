"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  Trophy,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  Upload,
  Download,
  Instagram,
  Clock,
} from "lucide-react"

const PERTANYAAN_PENGETAHUAN = [
  "Apa itu olahraga panahan?",
  "Alat apa saja yang biasa digunakan selama olahraga panahan berlangsung?",
]

interface FormData {
  tipe: "" | "umum" | "atlet"
  namaLengkap: string
  nrp: string
  jurusan: string
  noTelepon: string
  jawaban: string[]
  jenisPanah: string
  fileKomitmen: File | null
  fileBuktiIG: File | null
  filePortofolio: File | null
}

function FileInput({
  label,
  icon: Icon,
  file,
  onChange,
  required,
  accept = ".pdf",
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  file: File | null
  onChange: (f: File | null) => void
  required?: boolean
  accept?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-2">
      <Label className="font-medium">
        {label} {required && "*"}
      </Label>
      <div
        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
        {file ? (
          <div className="flex items-center justify-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-primary" />
            <span className="truncate max-w-[140px] sm:max-w-[200px]">{file.name}</span>
            <button
              type="button"
              className="text-red-500 hover:text-red-700 ml-2"
              onClick={(e) => {
                e.stopPropagation()
                onChange(null)
                if (inputRef.current) inputRef.current.value = ""
              }}
            >
              &times;
            </button>
          </div>
        ) : (
          <div className="text-muted-foreground">
            <Upload className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm">Klik untuk unggah (PDF, max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PendaftaranPage() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [regOpen, setRegOpen] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.settings.registration) {
          setRegOpen(data.settings.registration.isOpen ?? true)
        } else {
          setRegOpen(true)
        }
      })
      .catch(() => setRegOpen(true))
  }, [])

  const [formData, setFormData] = useState<FormData>({
    tipe: "",
    namaLengkap: "",
    nrp: "",
    jurusan: "",
    noTelepon: "",
    jawaban: ["", ""],
    jenisPanah: "",
    fileKomitmen: null,
    fileBuktiIG: null,
    filePortofolio: null,
  })

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }))

  const setJawaban = (index: number, value: string) =>
    setFormData((prev) => ({
      ...prev,
      jawaban: prev.jawaban.map((j, i) => (i === index ? value : j)),
    }))

  const totalSteps = formData.tipe === "atlet" ? 5 : 4

  const canNext = () => {
    switch (step) {
      case 0:
        return formData.tipe !== ""
      case 1:
        return formData.namaLengkap.trim() !== "" && formData.nrp.trim() !== "" && formData.jurusan.trim() !== "" && formData.noTelepon.trim() !== "" && (formData.tipe !== "atlet" || formData.jenisPanah.trim() !== "")
      case 2:
        return formData.jawaban.every((j) => j.trim() !== "")
      case 3:
        return formData.fileKomitmen !== null && formData.fileBuktiIG !== null && (formData.tipe !== "atlet" || formData.filePortofolio !== null)
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const fd = new FormData()
      fd.append("namaLengkap", formData.namaLengkap)
      fd.append("nrp", formData.nrp)
      fd.append("jurusan", formData.jurusan)
      fd.append("noTelepon", formData.noTelepon)
      fd.append("tipe", formData.tipe)
      fd.append(
        "jawabanPengetahuan",
        JSON.stringify(
          PERTANYAAN_PENGETAHUAN.map((p, i) => ({
            pertanyaan: p,
            jawaban: formData.jawaban[i],
          }))
        )
      )
      if (formData.tipe === "atlet") {
        fd.append("jenisPanah", formData.jenisPanah)
      }
      fd.append("fileKomitmen", formData.fileKomitmen!)
      fd.append("fileBuktiIG", formData.fileBuktiIG!)
      if (formData.tipe === "atlet" && formData.filePortofolio) {
        fd.append("filePortofolio", formData.filePortofolio)
      }

      const res = await fetch("/api/register", { method: "POST", body: fd })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Terjadi kesalahan.")
        return
      }

      setIsSubmitted(true)
    } catch {
      setError("Tidak dapat terhubung ke server.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <section className="py-20 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Pendaftaran Berhasil!</h1>
              <p className="text-xl text-green-100">
                Terima kasih telah mendaftar sebagai anggota ITS Archery. Kami akan menghubungi Anda segera.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (regOpen === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    )
  }

  if (!regOpen) {
    return (
      <div className="min-h-screen">
        <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-red-500 text-white mb-6">Pendaftaran Ditutup</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Pendaftaran ITS Archery</h1>
              <p className="text-xl text-primary-foreground/80">
                Pendaftaran anggota baru ITS Archery untuk periode ini telah ditutup.
              </p>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Alert className="border-yellow-200 bg-yellow-50">
                <Clock className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Pendaftaran Ditutup</strong>
                  <br />
                  Pendaftaran anggota baru sedang ditutup. Silakan cek kembali nanti atau hubungi kami untuk informasi lebih lanjut.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-green-500 text-white mb-6">Pendaftaran Dibuka</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bergabung dengan ITS Archery</h1>
            <p className="text-xl text-primary-foreground/80">
              Daftarkan diri Anda sekarang dan jadilah bagian dari komunitas panahan terbaik di ITS.
            </p>
          </div>
        </div>
      </section>

      {/* Progress */}
      {step > 0 && (
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex items-center gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      i < step
                        ? "bg-primary text-white"
                        : i === step
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`h-0.5 flex-1 ${i < step ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Form body */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {step === 0 && "Pilih Jenis Pendaftaran"}
                  {step === 1 && "Data Diri"}
                  {step === 2 && "Pengetahuan Dasar Panahan"}
                  {step === 3 && "Unggah Berkas"}
                  {step === 4 && "Ringkasan"}
                </CardTitle>
                <CardDescription>
                  {step === 0 && "Tentukan jalur pendaftaran yang sesuai untuk Anda."}
                  {step === 1 && "Lengkapi data diri Anda dengan benar."}
                  {step === 2 && "Jawab pertanyaan berikut untuk menguji pemahaman Anda tentang panahan."}
                  {step === 3 && "Unggah semua berkas yang diperlukan dalam format PDF."}
                  {step === 4 && "Periksa kembali data Anda sebelum mengirim."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Step 0: Choose type */}
                {step === 0 && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => set("tipe", "umum")}
                      className={`p-6 rounded-lg border-2 text-left transition-all hover:border-primary ${
                        formData.tipe === "umum" ? "border-primary bg-primary/5" : "border-muted"
                      }`}
                    >
                      <Users className="w-8 h-8 text-primary mb-3" />
                      <h3 className="text-lg font-semibold mb-1">Umum (Pemula)</h3>
                      <p className="text-sm text-muted-foreground">
                        Belum pernah atau baru mulai belajar panahan. Cocok untuk pemula.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => set("tipe", "atlet")}
                      className={`p-6 rounded-lg border-2 text-left transition-all hover:border-primary ${
                        formData.tipe === "atlet" ? "border-primary bg-primary/5" : "border-muted"
                      }`}
                    >
                      <Trophy className="w-8 h-8 text-accent mb-3" />
                      <h3 className="text-lg font-semibold mb-1">Atlet</h3>
                      <p className="text-sm text-muted-foreground">
                        Sudah memiliki pengalaman dan peralatan panahan sendiri.
                      </p>
                    </button>
                  </div>
                )}

                {/* Step 1: Personal info */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                        <Input
                          id="namaLengkap"
                          value={formData.namaLengkap}
                          onChange={(e) => set("namaLengkap", e.target.value)}
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nrp">NRP *</Label>
                        <Input
                          id="nrp"
                          value={formData.nrp}
                          onChange={(e) => set("nrp", e.target.value)}
                          placeholder="Contoh: 5025211234"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jurusan">Jurusan / Departemen *</Label>
                        <Input
                          id="jurusan"
                          value={formData.jurusan}
                          onChange={(e) => set("jurusan", e.target.value)}
                          placeholder="Contoh: Teknik Informatika"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noTelepon">Nomor Telepon *</Label>
                        <Input
                          id="noTelepon"
                          value={formData.noTelepon}
                          onChange={(e) => set("noTelepon", e.target.value)}
                          placeholder="+62 812-3456-7890"
                        />
                      </div>
                    </div>
                    {formData.tipe === "atlet" && (
                      <div className="space-y-2">
                        <Label htmlFor="jenisPanah">Jenis Panah yang Digunakan *</Label>
                        <Input
                          id="jenisPanah"
                          value={formData.jenisPanah}
                          onChange={(e) => set("jenisPanah", e.target.value)}
                          placeholder="Contoh: Recurve, Compound, Traditional, dll."
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Knowledge */}
                {step === 2 && (
                  <div className="space-y-6">
                    {PERTANYAAN_PENGETAHUAN.map((pertanyaan, i) => (
                      <div key={i} className="space-y-2">
                        <Label className="font-medium">
                          {i + 1}. {pertanyaan}
                        </Label>
                        <Textarea
                          value={formData.jawaban[i]}
                          onChange={(e) => setJawaban(i, e.target.value)}
                          placeholder="Tuliskan jawaban Anda di sini..."
                          className="min-h-[100px]"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 3: File uploads */}
                {step === 3 && (
                  <div className="space-y-6">
                    <Alert className="border-blue-200 bg-blue-50">
                      <Download className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>Unduh formulir</strong> di bawah, isi, llampirkan kembali sebagai PDF.
                        <br />
                        <a
                          href="/formulir-pendaftaran.docx"
                          download
                          className="underline font-medium hover:text-blue-600 mt-1 inline-block"
                        >
                          Download Formulir Pendaftaran (.docx)
                        </a>
                      </AlertDescription>
                    </Alert>

                    <FileInput
                      label="Surat Komitmen (PDF)"
                      icon={FileText}
                      file={formData.fileKomitmen}
                      onChange={(f) => set("fileKomitmen", f)}
                      required
                    />

                    <FileInput
                      label="Bukti Follow Instagram ITS Archery (PDF)"
                      icon={Instagram}
                      file={formData.fileBuktiIG}
                      onChange={(f) => set("fileBuktiIG", f)}
                      required
                    />

                    {formData.tipe === "atlet" && (
                      <FileInput
                        label="Portofolio Panah (PDF)"
                        icon={FileText}
                        file={formData.filePortofolio}
                        onChange={(f) => set("filePortofolio", f)}
                        required
                      />
                    )}
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <span className="text-muted-foreground">Tipe</span>
                      <span className="font-medium capitalize">{formData.tipe}</span>
                      <span className="text-muted-foreground">Nama Lengkap</span>
                      <span className="font-medium">{formData.namaLengkap}</span>
                      <span className="text-muted-foreground">NRP</span>
                      <span className="font-medium">{formData.nrp}</span>
                      <span className="text-muted-foreground">Jurusan</span>
                      <span className="font-medium">{formData.jurusan}</span>
                      <span className="text-muted-foreground">No. Telepon</span>
                      <span className="font-medium">{formData.noTelepon}</span>
                      {formData.tipe === "atlet" && (
                        <>
                          <span className="text-muted-foreground">Jenis Panah</span>
                          <span className="font-medium">{formData.jenisPanah}</span>
                        </>
                      )}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <h4 className="font-semibold text-sm">Jawaban Pengetahuan</h4>
                      {PERTANYAAN_PENGETAHUAN.map((p, i) => (
                        <div key={i} className="text-sm">
                          <span className="text-muted-foreground">{p}</span>
                          <p className="font-medium mt-1">{formData.jawaban[i]}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <h4 className="font-semibold text-sm">Berkas</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> <span className="break-all">{formData.fileKomitmen?.name}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> <span className="break-all">{formData.fileBuktiIG?.name}</span>
                        </li>
                        {formData.tipe === "atlet" && (
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> <span className="break-all">{formData.filePortofolio?.name}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  {step > 0 ? (
                    <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                    </Button>
                  ) : (
                    <div />
                  )}
                  {step < totalSteps - 1 ? (
                    <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
                      Selanjutnya <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
