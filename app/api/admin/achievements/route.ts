import { NextResponse } from "next/server"
import { createServerSupabase, getServerUser } from "@/lib/supabase-server"
import { logAdminAction } from "@/lib/audit-log"

export async function GET() {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("date", { ascending: false })
  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true, items: data })
}

export async function POST(request: Request) {
  const user = await getServerUser()
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await request.json()
    const supabase = await createServerSupabase()
    const { data, error } = await supabase.from("achievements").insert(body).select("id")
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
    await logAdminAction(supabase, {
      actor: user.email || "unknown",
      action: "create",
      entity: "achievements",
      entity_id: data?.[0]?.id,
      metadata: body,
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  const user = await getServerUser()
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id, ...fields } = await request.json()
    if (!id) {
      return NextResponse.json({ success: false, message: "id required" }, { status: 400 })
    }
    const supabase = await createServerSupabase()
    const { error } = await supabase.from("achievements").update(fields).eq("id", id)
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
    await logAdminAction(supabase, {
      actor: user.email || "unknown",
      action: "update",
      entity: "achievements",
      entity_id: id,
      metadata: fields,
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  const user = await getServerUser()
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ success: false, message: "id required" }, { status: 400 })
    }
    const supabase = await createServerSupabase()
    const { error } = await supabase.from("achievements").delete().eq("id", id)
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
    await logAdminAction(supabase, {
      actor: user.email || "unknown",
      action: "delete",
      entity: "achievements",
      entity_id: id,
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 })
  }
}
