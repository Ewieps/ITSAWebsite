# 🏹 ITS Archery Website - Setup Guide

## 📋 Prerequisites
- Node.js 18+ 
- npm atau yarn
- Akun Supabase (gratis)

## 🚀 Step-by-Step Setup

### 1. Clone & Install Dependencies
\`\`\`bash
git clone <repository-url>
cd its-archery-website
npm install
\`\`\`

### 2. Setup Supabase Backend

#### A. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Sign up / Login
3. Klik "New Project"
4. Isi nama project: "ITS Archery Website"
5. Pilih region terdekat (Singapore)
6. Buat password database yang kuat
7. Tunggu project selesai dibuat (~2 menit)

#### B. Dapatkan API Keys
1. Di dashboard Supabase, klik "Settings" → "API"
2. Copy:
   - `Project URL`
   - `anon public key`
   - `service_role key` (untuk admin)

#### C. Setup Database Tables
1. Di dashboard Supabase, klik "SQL Editor"
2. Copy-paste isi file `scripts/create-tables.sql`
3. Klik "Run" untuk membuat tables dan sample data

#### D. Setup Kode Undangan Admin (via DB, tanpa redeploy)
1. Jalankan `supabase/migrations/0005_admin_invite_code.sql` di SQL Editor untuk membuat tabel `admin_config` (RLS aktif, tidak ada policy — hanya bisa diakses via service role / dashboard).
2. Set kode pertama:
   \`\`\`sql
   insert into public.admin_config (key, value, updated_at)
   values ('admin_invite_code', '{"code": "KODE-RAHASIA-ANDA"}', now());
   \`\`\`
3. Untuk mengubah kode di kemudian hari, jalankan UPDATE langsung di SQL Editor (berlaku seketika, tanpa redeploy). Kosongkan (`'{"code": ""}'`) atau hapus baris untuk menonaktifkan pendaftaran admin.
4. Jika tabel `admin_config` belum diisi, kode fallback `ADMIN_INVITE_CODE` dari env masih dipakai.

### 3. Environment Variables
\`\`\`bash
# Copy file example
cp .env.local.example .env.local

# Edit .env.local dengan data Supabase Anda:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
# Kode undangan untuk pendaftaran admin via /admin/signup (fallback; nonaktif jika kosong).
# Direkomendasikan untuk mengelola kode via DB (tanpa redeploy) — lihat bagian "Mengubah Kode Undangan".
ADMIN_INVITE_CODE=ganti-dengan-kode-rahasia
\`\`\`

### 4. Setup Storage untuk Gambar

#### A. Buat Storage Bucket di Supabase
1. Di dashboard Supabase, klik "Storage"
2. Klik "New bucket"
3. Nama: `images`
4. Public bucket: ✅ (centang)
5. Klik "Save"

#### B. Setup Storage Policies
\`\`\`sql
-- Di SQL Editor Supabase, jalankan:

-- Policy untuk public read
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Policy untuk authenticated upload
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
\`\`\`

### 5. Jalankan Development Server
\`\`\`bash
npm run dev
\`\`\`

Website akan berjalan di `http://localhost:3000`

## 📁 Struktur Upload Gambar

### Cara Upload Gambar:

#### Method 1: Via Admin Dashboard
1. Buka `http://localhost:3000/admin`
2. Tab "Gambar"
3. Drag & drop atau pilih file
4. Pilih kategori (Gallery, Prestasi, Kegiatan, dll)
5. Klik "Upload"

#### Method 2: Manual ke Supabase Storage
1. Login ke dashboard Supabase
2. Storage → images bucket
3. Upload file ke folder:
   - `gallery/` - untuk galeri umum
   - `achievements/` - untuk foto prestasi
   - `events/` - untuk foto kegiatan
   - `members/` - untuk foto anggota

### Folder Structure:
\`\`\`
public/uploads/
├── gallery/          # Foto galeri umum
├── achievements/     # Foto prestasi & kompetisi
├── events/          # Foto kegiatan & workshop
├── members/         # Foto anggota & pengurus
└── blog/           # Gambar untuk artikel blog
\`\`\`

## 🔧 Konfigurasi Tambahan

### Upload Limits (opsional)
Edit `next.config.mjs`:
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' // Increase upload limit
    }
  }
}
\`\`\`

### Image Optimization
Untuk production, tambahkan di `next.config.mjs`:
\`\`\`javascript
const nextConfig = {
  images: {
    domains: ['your-project.supabase.co'], // Supabase domain
    formats: ['image/webp', 'image/avif'],
  }
}
\`\`\`

## 🎯 Fitur yang Sudah Tersedia

### ✅ Frontend Pages
- Homepage dengan hero section
- Tentang Kami
- Prestasi dengan filter
- Kegiatan & agenda
- Galeri dengan modal view
- Blog dengan artikel
- Kontak dengan form
- Pendaftaran anggota

### ✅ Backend Features
- Database dengan Supabase
- File upload system
- Admin dashboard
- API endpoints untuk CRUD
- Image storage & optimization

### ✅ Admin Features
- Upload gambar dengan kategori
- Kelola galeri
- Dashboard analytics
- Content management

## 🚀 Deployment

### Deploy ke Vercel:
1. Push code ke GitHub
2. Connect repository di Vercel
3. Add environment variables
4. Deploy!

### Environment Variables untuk Production:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
\`\`\`

## 🔒 Security Notes

1. **Never commit `.env.local`** - sudah ada di `.gitignore`
2. **Service Role Key** hanya untuk server-side operations
3. **Row Level Security** aktif di Supabase untuk data protection
4. **File upload validation** untuk prevent malicious files

## 🆘 Troubleshooting

### Error: "Supabase client not initialized"
- Pastikan environment variables sudah benar
- Restart development server

### Error: "Storage bucket not found"
- Pastikan bucket 'images' sudah dibuat di Supabase Storage
- Pastikan bucket bersifat public

### Error: "Permission denied"
- Check storage policies di Supabase
- Pastikan user sudah authenticated untuk upload

## 📞 Support
Jika ada masalah, bisa contact:
- Email: admin@itsarchery.com
- GitHub Issues: [repository-url]/issues
