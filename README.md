<p align="center">
  <img src="https://github.com/agro-recomendation/olivia/blob/main/public/images/logo.png" width="400" alt="TaniCerdas Logo">
</p>

<h1 align="center">🌱 TaniCerdas – Web App untuk Analisis Potensi & Deteksi Tanaman</h1>

TaniCerdas adalah aplikasi web berbasis geospasial dan kecerdasan buatan (AI) yang dirancang untuk membantu petani, pelajar, dan pemerhati pertanian dalam:

- Menganalisis potensi tanaman berdasarkan lokasi dan citra tanah
- Mendeteksi penyakit tanaman melalui gambar daun
- Menampilkan peta interaktif persebaran jenis tanaman mayoritas di suatu wilayah

Aplikasi ini dikembangkan dalam rangka lomba **OLIVIA X 2025 – Web Technology**.

---

## 🚀 Fitur Unggulan

### 📍 Analisis Potensi Tanaman
- Input lokasi melalui kolom pencarian → peta otomatis menampilkan titik koordinat
- Upload gambar tekstur tanah
- Sistem memberikan rekomendasi tanaman berdasarkan citra tanah dan lokasi geografis

### 🦠 Deteksi Penyakit Tanaman
- Upload gambar daun tanaman
- Sistem menampilkan prediksi penyakit serta saran penanganannya

### 🗺️ Pemetaan Perkebunan
- Peta interaktif wilayah Indonesia
- Klik pada marker daerah → tampil info tanaman mayoritas yang dibudidayakan

---

## 🧰 Teknologi yang Digunakan

- **Frontend**: HTML, CSS (Tailwind), JavaScript (React)
- **Backend**: Laravel
- **AI/ML**: ViT (Vision Transformers, EfficientNetV2B0
- **Peta**: Leaflet.js + OpenStreetMap
- **Database**: MySQL
- **Tools**: GitHub, Visual Studio Code, Laragon/XAMPP

---

## 🌐 Akses Aplikasi

Aplikasi dapat diakses secara online melalui:
👉 http://tanicerdas.web.id
_(atau alamat deploy-mu yang sebenarnya)_

---

## 📺 Link Tambahan

- 🎥 **Demo Video**: [https://youtu.be/contoh-video-demo](https://youtu.be/contoh-video-demo)  
- 📄 **Dokumentasi Teknis**: [https://bit.ly/dokumentasi-tanicerdas](https://bit.ly/dokumentasi-tanicerdas)

---

## ⚙️ Cara Instalasi & Konfigurasi Awal

Ikuti langkah-langkah berikut untuk menjalankan project ini di lokal:

```bash
# Clone repositori
git clone https://github.com/namakamu/tanicerdas.git
cd tanicerdas

# Install dependensi
npm install
composer install

# Salin file .env dan generate key
cp .env.example .env
php artisan key:generate

# Jalankan aplikasi
npm start
php artisan serve

