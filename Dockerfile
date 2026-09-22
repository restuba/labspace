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

# Salin config sebagai TEMPLATE, bukan langsung ke conf.d. Saat container start,
# nginx:alpine menjalankan envsubst pada file di folder templates dan menaruh
# hasilnya di /etc/nginx/conf.d/. Di sinilah ${PORT} diganti nilai sebenarnya.
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Default PORT=80 supaya `docker run` lokal jalan tanpa perlu set env var.
# Render menimpa nilai ini dengan port miliknya (mis. 10000) saat runtime.
ENV PORT=80

# Dokumentasi saja: port yang didengarkan mengikuti $PORT (default 80).
EXPOSE 80

# Tidak perlu CMD custom: entrypoint bawaan nginx:alpine sudah memproses
# template (envsubst) lalu menjalankan nginx dengan "daemon off;".
