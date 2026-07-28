import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )
}

let _supabase: ReturnType<typeof createClient> | null = null
export function getSupabase() {
  if (!_supabase) _supabase = createClient()
  return _supabase
}
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    return (getSupabase() as any)[prop]
  },
})

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export interface Member {
  id: string
  name: string
  nim: string
  position: string
  email: string
  phone: string
  photo_url?: string
  join_date: string
  created_at: string
}

export interface Achievement {
  id: string
  title: string
  competition: string
  category: string
  rank: string
  athlete: string
  level: "Lokal" | "Regional" | "Nasional" | "Internasional"
  date: string
  photo_url?: string
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: "Kompetisi" | "Workshop" | "Sosial" | "Latihan"
  status: "Mendatang" | "Berlangsung" | "Selesai"
  photo_url?: string
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string
  description?: string
  category: string
  image_url: string
  upload_date: string
  created_at: string
}

export interface Registration {
  id: string
  nama_lengkap: string
  nrp: string
  jurusan: string
  no_telepon: string
  tipe: "umum" | "atlet"
  jawaban_pengetahuan: { pertanyaan: string; jawaban: string }[]
  jenis_panah: string | null
  file_url_komitmen: string
  file_url_bukti_ig: string
  file_url_portofolio: string | null
  status: "pending" | "accepted" | "rejected"
  created_at: string
}

export interface Settings {
  key: string
  value: Record<string, unknown>
  updated_at: string
}

export interface Cabinet {
  id: string
  year: number
  name: string
  chairman: string
  description: string | null
  logo_url: string | null
  visi: string | null
  misi: string | null
  is_current: boolean
  created_at: string
}

export interface CabinetMember {
  id: string
  cabinet_id: string
  name: string
  position: string
  photo_url: string | null
  created_at: string
}

export interface CabinetWithMembers extends Cabinet {
  cabinet_members: CabinetMember[]
}

export interface HeroSlide {
  id: string
  image_url: string
  title: string | null
  subtitle: string | null
  order_index: number
  is_active: boolean
  created_at: string
}
