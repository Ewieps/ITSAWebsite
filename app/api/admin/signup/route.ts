import { NextResponse } from "next/server"
import { createAdminSupabase } from "@/lib/supabase-server"
import { timingSafeEqual } from "crypto"

async function getInviteCode() {
  const supabase = createAdminSupabase()
  const { data } = await supabase
    .from("admin_config")
    .select("value")
    .eq("key", "admin_invite_code")
    .limit(1)
  const code = data?.[0]?.value?.code
  if (typeof code === "string" && code.trim()) return code.trim()
  return process.env.ADMIN_INVITE_CODE || null
}

function codeMatches(provided: string, expected: string) {
  const a = Buffer.from(String(provided))
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  const expected = await getInviteCode()
  if (!expected) {
    return NextResponse.json(
      { success: false, message: "Pendaftaran admin sedang dinonaktifkan." },
      { status: 403 }
    )
  }

  let body: { email?: string; password?: string; inviteCode?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 })
  }

  const { email, password, inviteCode } = body
  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Email dan password wajib diisi." }, { status: 400 })
  }
  if (!inviteCode || !codeMatches(inviteCode, expected)) {
    return NextResponse.json({ success: false, message: "Kode undangan salah." }, { status: 403 })
  }
  if (password.length < 8) {
    return NextResponse.json({ success: false, message: "Password minimal 8 karakter." }, { status: 400 })
  }

  try {
    const supabase = createAdminSupabase()
    const { error } = await supabase.auth.admin.createUser({
      email: email.toLowerCase().trim(),
      password,
      email_confirm: true,
    })
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    const message =
      err instanceof Error
        ? `Gagal membuat akun: ${err.message}`
        : "Gagal membuat akun."
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
