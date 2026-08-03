import type { SupabaseClient } from "@supabase/supabase-js"

export interface AuditLogInput {
  actor: string
  action: "create" | "update" | "delete" | "login" | "logout" | "sync"
  entity: string
  entity_id?: string | number | null
  metadata?: Record<string, unknown> | null
}

export async function logAdminAction(
  supabase: SupabaseClient,
  log: AuditLogInput
): Promise<void> {
  try {
    await supabase.from("admin_logs").insert({
      actor: log.actor,
      action: log.action,
      entity: log.entity,
      entity_id: log.entity_id != null ? String(log.entity_id) : null,
      metadata: log.metadata || null,
    })
  } catch (err) {
    console.error("Audit log insert failed:", err)
  }
}
