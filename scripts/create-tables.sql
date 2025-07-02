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
