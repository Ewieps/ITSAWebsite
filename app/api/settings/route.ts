import { NextResponse } from "next/server"
import { createServerSupabase, getServerUser } from "@/lib/supabase-server"

export async function GET() {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase.from("settings").select("*")
  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
  const settings: Record<string, unknown> = {}
  for (const row of data || []) {
    settings[row.key] = row.value
  }
  return NextResponse.json({ success: true, settings })
}

export async function PUT(request: Request) {
  const user = await getServerUser()
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { key, value } = await request.json()
    if (!key || value === undefined) {
      return NextResponse.json({ success: false, message: "key and value required" }, { status: 400 })
    }
    const supabase = await createServerSupabase()
    const { error } = await supabase
      .from("settings")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 })
  }
}
