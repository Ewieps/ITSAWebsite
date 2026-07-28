-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  nim VARCHAR(20) UNIQUE NOT NULL,
  position VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  photo_url TEXT,
  join_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  competition VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  rank VARCHAR(50),
  athlete VARCHAR(255),
  level VARCHAR(20) CHECK (level IN ('Lokal', 'Regional', 'Nasional', 'Internasional')),
  date DATE,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  time VARCHAR(20),
  location VARCHAR(255),
  category VARCHAR(20) CHECK (category IN ('Kompetisi', 'Workshop', 'Sosial', 'Latihan')),
  status VARCHAR(20) CHECK (status IN ('Mendatang', 'Berlangsung', 'Selesai')),
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image_url TEXT NOT NULL,
  upload_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author VARCHAR(255),
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  publish_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_lengkap VARCHAR(255) NOT NULL,
  nrp VARCHAR(20) UNIQUE NOT NULL,
  jurusan VARCHAR(255) NOT NULL,
  no_telepon VARCHAR(20) NOT NULL,
  tipe VARCHAR(10) NOT NULL CHECK (tipe IN ('umum', 'atlet')),
  jawaban_pengetahuan JSONB NOT NULL,
  jenis_panah VARCHAR(100),
  file_url_komitmen TEXT NOT NULL,
  file_url_bukti_ig TEXT NOT NULL,
  file_url_portofolio TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table (for registration config, contact info, etc.)
CREATE TABLE IF NOT EXISTS settings (
  key VARCHAR(100) UNIQUE PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cabinets table
CREATE TABLE IF NOT EXISTS cabinets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  chairman VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url TEXT,
  visi TEXT,
  misi TEXT,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cabinet_members table
CREATE TABLE IF NOT EXISTS cabinet_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cabinet_id UUID REFERENCES cabinets(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS on all tables (auth is handled at the API layer)
ALTER TABLE members DISABLE ROW LEVEL SECURITY;
ALTER TABLE achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE cabinets DISABLE ROW LEVEL SECURITY;
ALTER TABLE cabinet_members DISABLE ROW LEVEL SECURITY;

-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title VARCHAR(255),
  subtitle TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE hero_slides DISABLE ROW LEVEL SECURITY;

-- Insert default registration settings
INSERT INTO settings (key, value) VALUES
('registration', '{"isOpen": true, "openDate": "1 Agustus 2024", "closeDate": "31 Agustus 2024", "maxParticipants": 50}')
ON CONFLICT (key) DO NOTHING;

-- Insert sample data
INSERT INTO members (name, nim, position, email, phone, join_date) VALUES
('Ahmad Rizki Pratama', '5025211001', 'Ketua', 'ahmad.rizki@student.its.ac.id', '+62812-3456-7890', '2022-09-01'),
('Sari Indah Permata', '5025211002', 'Wakil Ketua', 'sari.indah@student.its.ac.id', '+62813-4567-8901', '2022-09-01'),
('Budi Santoso', '5025211003', 'Sekretaris', 'budi.santoso@student.its.ac.id', '+62814-5678-9012', '2022-09-15'),
('Maya Putri Sari', '5025211004', 'Bendahara', 'maya.putri@student.its.ac.id', '+62815-6789-0123', '2022-09-15'),
('Doni Pratama', '5025211005', 'Anggota', 'doni.pratama@student.its.ac.id', '+62816-7890-1234', '2022-10-01');

INSERT INTO achievements (title, competition, category, rank, athlete, level, date) VALUES
('Kejuaraan Nasional Panahan Indonesia', 'Kejuaraan Nasional 2024', 'Recurve Putra', 'Juara 1', 'Ahmad Rizki Pratama', 'Nasional', '2024-06-15'),
('POMNAS XVI', 'POMNAS XVI 2024', 'Compound Putri', 'Juara 2', 'Sari Indah Permata', 'Nasional', '2024-04-20'),
('Kejuaraan Panahan Jawa Timur', 'Kejuaraan Regional 2023', 'Recurve Beregu Putra', 'Juara 1', 'Tim ITS Archery', 'Regional', '2023-11-10'),
('Piala Rektor ITS', 'Piala Rektor 2023', 'Traditional Bow', 'Juara 1', 'Budi Santoso', 'Lokal', '2023-10-05'),
('Kejuaraan Antar Universitas Se-Jawa', 'Kejuaraan Regional 2023', 'Compound Putra', 'Juara 3', 'Doni Pratama', 'Regional', '2023-09-22');

INSERT INTO events (title, description, date, time, location, category, status) VALUES
('Kejuaraan Internal ITS Archery', 'Kompetisi internal untuk seleksi atlet terbaik', '2024-08-15', '08:00 - 17:00 WIB', 'Lapangan Panahan ITS', 'Kompetisi', 'Mendatang'),
('Workshop Teknik Panahan', 'Pelatihan teknik lanjutan dengan pelatih nasional', '2024-08-22', '13:00 - 16:00 WIB', 'Aula Graha ITS', 'Workshop', 'Mendatang'),
('Bakti Sosial & Pengenalan Panahan', 'Kegiatan sosial dan pengenalan panahan untuk anak-anak', '2024-09-05', '09:00 - 15:00 WIB', 'SDN Keputih 1', 'Sosial', 'Mendatang'),
('Open House ITS Archery', 'Pengenalan UKM kepada mahasiswa baru', '2024-06-15', '09:00 - 15:00 WIB', 'Campus Center ITS', 'Workshop', 'Selesai'),
('Pelatihan Intensif Pra-Kompetisi', 'Persiapan intensif untuk kejuaraan nasional', '2024-07-01', 'Full Day', 'Training Camp Batu', 'Latihan', 'Selesai');

-- Insert cabinet seed data
INSERT INTO cabinets (year, name, chairman, description, is_current) VALUES
(2016, 'Pendirian', 'Hadi Mulki Siregar', 'ITS Archery didirikan pada 8 November 2016. Slogan "Membidik dengan Hati" dicetuskan. Setelah 6 bulan vakum, komunitas bangkit kembali.', false),
(2019, 'Pendirian UKM', 'Adi Kurnia Halim', 'Pada 27 Mei 2019 ITS Archery resmi menjadi UKM di ITS.', false),
(2020, 'Stabilizer', 'Zaki Ambadar', 'Kabinet yang menjabat saat pandemi. Tidak banyak kegiatan yang bisa dilakukan.', false),
(2021, 'Riser', 'Vira Yudha Tama', 'ITS masih menerapkan pembelajaran online, belum banyak kegiatan yang dilakukan.', false),
(2022, 'Narayanastra', 'M. Aqmal Baihaqi', 'Setelah pandemi, ITS Archery kembali melakukan proker dan mulai mencetak prestasi.', false),
(2022, 'Savyadiwa', 'Surya Wicaksana', 'ITS Archery menjadi salah satu UKM dengan pendaftar terbanyak.', false),
(2023, 'Eskalasi Adastra', 'Muhammad Rama', 'Kembali mencetak prestasi di kategori tradisional dan mengembangkan berbagai proker.', false),
(2024, 'Hasta Wisesa', 'Syamil Rizqy', 'Memindahkan tempat latihan dari hutan ITS ke Taman Alumni.', false),
(2025, 'GrIhastra Nayasa', 'Kabinet Saat Ini', 'Kabinet yang sedang menjabat saat ini.', true);
