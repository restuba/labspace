# ── Dockerfile (PRODUCTION) ──────────────────────────────────────────
# Ini "resep" untuk membangun image production.
# Pakai MULTI-STAGE BUILD: tahap 1 build app, tahap 2 sajikan file statis.
# Hasil akhirnya image kecil (cuma Nginx + folder dist), bukan node_modules yang berat.

# ─── Tahap 1: BUILD ───
# Mulai dari image yang sudah punya Node.js. "AS build" = kasih nama tahap ini.
FROM node:22-alpine AS build

# Semua perintah berikutnya dijalankan di dalam folder /app (di dalam container).
WORKDIR /app

# Salin package.json SAJA — SENGAJA tanpa package-lock.json.
# Kenapa? Lockfile kamu di-generate di Mac, jadi cuma mencatat binary native
# untuk Mac. Vite 8 pakai Rolldown yang butuh binary khusus Linux
# (linux-arm64-musl) di container ini. Kalau lockfile Mac ikut di-copy, npm
# patuh padanya dan TIDAK memasang binary Linux → build gagal (npm bug #4828).
# Tanpa lockfile, npm menyusun dependency segar sesuai OS container = Linux.
COPY package.json ./
RUN npm install

# Baru salin sisa kode, lalu build. Hasilnya ada di /app/dist.
COPY . .
RUN npm run build

# ─── Tahap 2: SERVE ───
# Mulai image baru yang bersih: cuma Nginx (web server ringan, ~50MB).
FROM nginx:alpine

# Ambil HANYA folder dist dari tahap "build" tadi, taruh di folder web Nginx.
# node_modules & source code tidak ikut → image final tetap ramping.
COPY --from=build /app/dist /usr/share/nginx/html

# Pakai config Nginx custom (penting untuk SPA, dijelaskan di nginx.conf).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Container ini "membuka" port 80 (default HTTP Nginx).
EXPOSE 80

# Perintah yang jalan saat container start.
CMD ["nginx", "-g", "daemon off;"]
