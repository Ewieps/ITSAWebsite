import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase-server"
import { appendRegistrationToSheet } from "@/lib/sheets"

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

    const body = await request.json()

    const namaLengkap = body.namaLengkap as string
    const nrp = body.nrp as string
    const jurusan = body.jurusan as string
    const noTelepon = body.noTelepon as string
    const tipe = body.tipe as string
    const jawabanPengetahuan = (body.jawabanPengetahuan as { pertanyaan: string; jawaban: string }[]) || []
    const jenisPanah = (body.jenisPanah as string) || null
    const fileUrlKomitmen = (body.fileUrlKomitmen as string) || ""
    const fileUrlBuktiIg = (body.fileUrlBuktiIg as string) || ""
    const fileUrlPortofolio = (body.fileUrlPortofolio as string) || null

    if (!namaLengkap || !nrp || !jurusan || !noTelepon || !tipe) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi." },
        { status: 400 }
      )
    }

    if (!fileUrlKomitmen || !fileUrlBuktiIg) {
      return NextResponse.json(
        { success: false, message: "Berkas wajib diunggah." },
        { status: 400 }
      )
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

    // Best-effort Google Sheets sync — never fails the registration
    const inserted = await supabase
      .from("registrations")
      .select("*")
      .eq("nrp", nrp)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
    if (inserted.data) {
      appendRegistrationToSheet(inserted.data).catch(() => {})
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
