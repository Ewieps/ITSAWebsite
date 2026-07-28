import { NextResponse } from "next/server"
import { createServerSupabase, getServerUser } from "@/lib/supabase-server"

export async function GET() {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("events")
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
    const { error } = await supabase.from("events").insert(body)
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
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
    const { error } = await supabase.from("events").update(fields).eq("id", id)
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
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
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 })
  }
}
