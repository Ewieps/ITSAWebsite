import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
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
