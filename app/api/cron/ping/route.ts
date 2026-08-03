import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase-server"

export const maxDuration = 60

export async function GET(request: Request) {
  if (request.headers.get("x-vercel-cron") === null) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  try {
    const supabase = await createServerSupabase()
    const { error } = await supabase.from("settings").select("key").limit(1)
    if (error) throw error

    return NextResponse.json({ success: true, at: new Date().toISOString() })
  } catch (err) {
    console.error("Cron ping error:", err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
