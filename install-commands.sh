# Langkah-langkah instalasi lengkap

# 1. Buat project Next.js baru
npx create-next-app@latest its-archery-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. Masuk ke folder project
cd its-archery-website

# 3. Install shadcn/ui
npx shadcn@latest init

# 4. Install semua components sekaligus
npx shadcn@latest add button card badge input textarea label dialog sheet radio-group checkbox alert switch

# 5. Install icons
npm install lucide-react

# 6. Install utilities tambahan
npm install class-variance-authority clsx tailwind-merge

# 7. Jika mau pakai backend Supabase
npm install @supabase/supabase-js

# 8. Jika mau form validation
npm install zod react-hook-form @hookform/resolvers

# 9. Jalankan development server
npm run dev
