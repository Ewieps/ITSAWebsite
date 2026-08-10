import { NextResponse } from "next/server"
import { createServerSupabase, getServerUser } from "@/lib/supabase-server"
import { pushAllRegistrationsToSheet, isSheetsConfigured } from "@/lib/sheets"
import { logAdminAction } from "@/lib/audit-log"

export async function POST() {
  const user = await getServerUser()
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  if (!isSheetsConfigured()) {
    return NextResponse.json(
      { success: false, message: "Google Sheets belum dikonfigurasi atau GOOGLE_SERVICE_ACCOUNT_KEY tidak valid (harus JSON satu baris). Set GOOGLE_SERVICE_ACCOUNT_KEY, GOOGLE_SPREADSHEET_ID, dan GOOGLE_SHEET_NAME." },
      { status: 400 }
    )
  }

  try {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    const pushed = await pushAllRegistrationsToSheet(data || [])
    await logAdminAction(supabase, {
      actor: user.email || "unknown",
      action: "sync",
      entity: "google_sheets",
      metadata: { pushed },
    })
    return NextResponse.json({
      success: true,
      message: `Sinkronisasi selesai. ${pushed} baris ditulis ke Google Sheets.`,
      count: pushed,
    })
  } catch (err) {
    console.error("Sync error:", err)
    const message =
      err instanceof Error
        ? `Gagal sinkronisasi: ${err.message}`
        : "Gagal sinkronisasi."
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
