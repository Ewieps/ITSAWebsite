import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase-server"
import { uploadFile } from "@/lib/storage"

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabase()

    const { data: settings } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "registration")
      .single()

    if (settings && !(settings.value as Record<string, unknown>)?.isOpen) {
      return NextResponse.json(
        { success: false, message: "Pendaftaran sedang ditutup." },
        { status: 403 }
      )
    }

    const formData = await request.formData()

    const namaLengkap = formData.get("namaLengkap") as string
    const nrp = formData.get("nrp") as string
    const jurusan = formData.get("jurusan") as string
    const noTelepon = formData.get("noTelepon") as string
    const tipe = formData.get("tipe") as string
    const jawabanPengetahuan = JSON.parse(formData.get("jawabanPengetahuan") as string || "[]")
    const jenisPanah = formData.get("jenisPanah") as string || null

    if (!namaLengkap || !nrp || !jurusan || !noTelepon || !tipe) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi." },
        { status: 400 }
      )
    }

    let fileUrlKomitmen = ""
    let fileUrlBuktiIg = ""
    let fileUrlPortofolio: string | null = null

    const fileKomitmen = formData.get("fileKomitmen") as File | null
    if (fileKomitmen && fileKomitmen.size > 0) {
      fileUrlKomitmen = await uploadFile(fileKomitmen, "registrations/komitmen")
    }

    const fileBuktiIg = formData.get("fileBuktiIG") as File | null
    if (fileBuktiIg && fileBuktiIg.size > 0) {
      fileUrlBuktiIg = await uploadFile(fileBuktiIg, "registrations/bukti-ig")
    }

    const filePortofolio = formData.get("filePortofolio") as File | null
    if (filePortofolio && filePortofolio.size > 0) {
      fileUrlPortofolio = await uploadFile(filePortofolio, "registrations/portofolio")
    }

    const { error } = await supabase
      .from("registrations")
      .insert({
        nama_lengkap: namaLengkap,
        nrp,
        jurusan,
        no_telepon: noTelepon,
        tipe,
        jawaban_pengetahuan: jawabanPengetahuan,
        jenis_panah: jenisPanah,
        file_url_komitmen: fileUrlKomitmen,
        file_url_bukti_ig: fileUrlBuktiIg,
        file_url_portofolio: fileUrlPortofolio,
      })

    if (error) {
      console.error("Insert error:", error)
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, message: "NRP sudah terdaftar." },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { success: false, message: "Gagal menyimpan data." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: "Pendaftaran berhasil!" })
  } catch (err) {
    console.error("Registration error:", err)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    )
  }
}
