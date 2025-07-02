# Langkah-langkah untuk memperbaiki error PostCSS

# 1. Hapus file konfigurasi yang bermasalah
rm postcss.config.mjs
rm tailwind.config.ts

# 2. Install ulang dependencies
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate

# 3. Generate konfigurasi baru
npx tailwindcss init -p

# 4. Hapus cache Next.js
rm -rf .next

# 5. Restart development server
npm run dev
