# Belajar Yuk! 🌈

Game edukasi sederhana untuk anak usia dini (sekitar 2 tahun), berupa web statis (HTML/CSS/JS) dengan tombol besar, warna cerah, dan suara (text-to-speech browser).

## Fitur
- **Huruf ABC** — tap huruf A-Z, diucapkan.
- **Alif Ba Ta (Hijaiyah)** — tap huruf hijaiyah, diucapkan.
- **Hewan** — tap gambar hewan, muncul nama & suara.
- **Angka & Planet** — tap angka 1-10 atau planet/benda langit, muncul nama & suara.

## Menjalankan lokal
Cukup buka `index.html` di browser, atau jalankan server statis:

```bash
npx serve .
```

## Deploy ke GitHub Pages
Repo ini sudah ada workflow GitHub Actions (`.github/workflows/deploy.yml`) yang otomatis deploy ke GitHub Pages setiap push ke branch `main`/`master`.

Setelah di-merge ke `main`:
1. Buka **Settings → Pages** di repo GitHub.
2. Pilih source **GitHub Actions**.
3. Push ke `main`, workflow akan build & deploy otomatis.
4. Link live akan muncul di tab **Actions** → job **deploy** → `page_url`.
