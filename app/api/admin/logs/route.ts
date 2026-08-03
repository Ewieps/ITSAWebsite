import { NextResponse } from "next/server"
import { createServerSupabase, getServerUser } from "@/lib/supabase-server"
import { logAdminAction } from "@/lib/audit-log"

export async function POST(request: Request) {
  const user = await getServerUser()
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const action = body.action as string

    if (action !== "login" && action !== "logout") {
      return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
    }

    const supabase = await createServerSupabase()
    await logAdminAction(supabase, {
      actor: user.email || "unknown",
      action,
      entity: "session",
      entity_id: user.id,
      metadata: { ip: request.headers.get("x-forwarded-for") || null },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 })
  }
}
