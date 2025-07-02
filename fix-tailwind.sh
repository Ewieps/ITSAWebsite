# Langkah-langkah untuk memperbaiki Tailwind CSS

# 1. Pastikan dependencies terinstall
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate

# 2. Reinstall Tailwind jika perlu
npx tailwindcss init -p

# 3. Restart development server
npm run dev

# 4. Jika masih tidak work, coba clear cache
rm -rf .next
npm run dev

# 5. Atau coba build ulang
npm run build
npm run dev
