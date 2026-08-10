import { NextResponse } from "next/server"
import { createServerSupabase, getServerUser } from "@/lib/supabase-server"
import { logAdminAction } from "@/lib/audit-log"

export async function GET() {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .order("updated_at", { ascending: false })
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
    const now = new Date().toISOString()
    const { data: existing } = await supabase
      .from("settings")
      .select("key")
      .eq("key", key)
      .limit(1)
    let error
    if (existing && existing.length > 0) {
      ;({ error } = await supabase
        .from("settings")
        .update({ value, updated_at: now })
        .eq("key", key))
    } else {
      ;({ error } = await supabase
        .from("settings")
        .insert({ key, value, updated_at: now }))
    }
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
    await logAdminAction(supabase, {
      actor: user.email || "unknown",
      action: "update",
      entity: "settings",
      entity_id: key,
      metadata: { key, value },
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 })
  }
}
