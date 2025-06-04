import React, { useState } from 'react';
import Container from '../Components/Container';
import Navbar from '../Components/Navbar';
import GrowSupport from '../Components/GrowSupport';
import { route } from 'ziggy-js';

import PropTypes from 'prop-types';

export default function Home({ auth }) {
  // Tambahkan state untuk form kontak
  const [contact, setContact] = useState({
    telephone: '',
    message: '',
    user_id: auth.user ? auth.user.id : null,
  });
  const [contactStatus, setContactStatus] = useState(null);

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus(null);
    try {
      const res = await fetch('/api/message/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          telephone: contact.telephone,
          message: contact.message,
          user_id: contact.user_id,
        }),
      });
      if (!res.ok) throw new Error('Gagal mengirim pesan');
      setContactStatus('Pesan berhasil dikirim!');
      setContact({ telephone: '', message: '' });
    } catch {
      setContactStatus('Gagal mengirim pesan. Pastikan Anda sudah login.');
    }
  };

  return (
    <div className="font-poppins pt-[80px]">
      {/* Navbar menerima prop auth */}
      <Navbar auth={auth} />

      {/* Hero Section */}
      <section
        className="relative h-auto md:h-[550px] bg-cover bg-center text-white flex items-center"
        style={{ backgroundImage: "url('/images/bg1.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        <Container>
          <div className="py-8 md:max-w-2xl max-w-full space-y-6 text-center md:text-left px-4 relative z-10">
            <h1 className="font-livvic font-bold text-4xl md:text-[64px] leading-tight text-[#FFFA72]">
              Pertanian Cerdas
            </h1>
            <h1 className="font-livvic font-bold text-4xl md:text-[64px] leading-tight text-white">
              Hasil Maksimal
            </h1>
            <p className="text-base md:text-[20px] leading-relaxed text-white">
              Manfaatkan teknologi untuk mengetahui potensi tanaman terbaik di wilayahmu, deteksi dini penyakit tanaman, serta prediksi musim tanam & panen secara otomatis.
            </p>
            <button 
              onClick={() => document.getElementById('fitur')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#2E4D1C] px-6 py-3 rounded-2xl font-semibold shadow-md hover:bg-[#f3f3f3] transition">
              JELAJAHI FITUR
            </button>
          </div>
        </Container>
      </section>

      {/* Tentang Kami */}
      <section id='tentang-kami' className="bg-[#2E4D1C] text-white py-16">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img src="/images/petani.png" alt="Petani" className="rounded-lg w-full" />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-sm uppercase mb-2 font-semibold">TENTANG KAMI</h3>
              <h2 className="font-livvic font-bold text-3xl md:text-[40px] mb-4">
                Teknologi Pertanian Cerdas
              </h2>
              <p className="font-bold text-lg text-[#FFFA72] mb-4">
                Solusi Digital untuk Petani Modern
              </p>
              <p className="text-sm mb-4 leading-relaxed text-justify">
                Kami menghadirkan inovasi pertanian berbasis teknologi yang membantu petani, penyuluh, dan pelaku agribisnis dalam mengambil keputusan penting:
              </p>
              <ul className="text-sm space-y-3">
                <li className="flex items-start gap-2">
                  <img src="/images/vector-ceklis.png" alt="Ceklis" className="w-5 h-5 mt-1" />
                  Deteksi potensi hasil tanaman berdasarkan lokasi
                </li>
                <li className="flex items-start gap-2">
                  <img src="/images/vector-ceklis.png" alt="Ceklis" className="w-5 h-5 mt-1" />
                  Analisis penyakit tanaman dari gejala yang tampak
                </li>
                <li className="flex items-start gap-2">
                  <img src="/images/vector-ceklis.png" alt="Ceklis" className="w-5 h-5 mt-1" />
                  Prediksi musim tanam dan panen berbasis iklim
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Fitur */}
      <section id='fitur' className="bg-white py-16">
  <Container>
    <h2 className="font-livvic text-3xl md:text-[40px] font-bold text-[#2E4D1C] text-center">
      Jelajahi Fitur <span className="text-[#FFA800]">#TanamAku</span>
    </h2>
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
      {[
        {
          title: 'Analisis Potensi Tanaman',
          image: '/images/fitur1.png',
          link: '/analisis-potensi-tanaman',
        },
        {
          title: 'Deteksi Dini Penyakit Tanaman',
          image: '/images/fitur2.png',
          link: '/analisis-penyakit-tanaman',
        },
        {
          title: 'Peta Komoditas Pertanian',
          image: '/images/fitur3.png',
          link: '/peta-komoditas-pertanian',
        },
      ].map((f, i) => (
        <div
          key={i}
          className="relative w-full max-w-xs h-[360px] rounded-[20px] overflow-hidden shadow-lg group transition duration-300 hover:shadow-2xl"
        >
          <img
            src={f.image}
            alt={f.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20 px-6 py-6 flex flex-col justify-end text-white">
            <h3 className="text-left text-lg font-semibold">{f.title}</h3>
            <a
              href={f.link}
              className="mt-4 w-full bg-[#FFA800] hover:bg-[#e69c00] text-black text-sm font-semibold px-4 py-2 rounded text-center transition block"
            >
              Mulai Sekarang
            </a>
          </div>
        </div>
      ))}
    </div>
  </Container>
</section>



      {/* Dukungan Tanam */}
      <GrowSupport />

      {/* Kontak */}
      <section id='kontak' className="bg-[#2E4D1C] text-white py-16">
        <Container>
          <h3 className="text-[#FFA800] text-sm uppercase mb-4 font-semibold">KONTAK</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-livvic text-2xl md:text-[40px] font-bold mb-2">Yuk, Ngobrol dengan Kami!</h3>
              <p className="text-sm mb-4">
                Punya ide, saran, atau bingung soal fitur aplikasi? Hubungi kami:
              </p>
              <div className="mb-4">
                <h4 className="text-[#FFA800] text-sm uppercase mb-1">Telepon</h4>
                <ul className="text-sm space-y-1">
                  <li>+6281617870213</li>
                  <li>+628192211069</li>
                  <li>+6283838782742</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="text-[#FFA800] text-sm uppercase mb-1">Email</h4>
                <p className="text-sm">needhelp@company.com</p>
              </div>
              <div>
                <h4 className="text-[#FFA800] text-sm uppercase mb-1">Alamat</h4>
                <p className="text-sm mt-2">Jl. Prof. Soedarto, Tembalang, Kota Semarang</p>
              </div>
            </div>
            <div className="px-4">
              <form className="w-full max-w-md mx-auto space-y-5" onSubmit={handleContactSubmit}>
                {/* <input type="text" placeholder="Nama" ... /> */}
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Telepon"
                  required
                  className="w-full p-4 rounded-lg bg-[#FFF36B] text-[#2E4D1C] placeholder-[#2E4D1C]"
                  value={contact.telephone}
                  onChange={handleContactChange}
                />
                {/* <input type="email" placeholder="Email" ... /> */}
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Pesan"
                  required
                  className="w-full p-4 rounded-lg bg-[#FFF36B] text-[#2E4D1C] placeholder-[#2E4D1C]"
                  value={contact.message}
                  onChange={handleContactChange}
                />
                <button type="submit" className="bg-white text-[#2E4D1C] px-8 py-3 rounded-2xl font-medium">KIRIM</button>
                {contactStatus && <p className="mt-2 text-center">{contactStatus}</p>}
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3610] text-white text-center py-4">
        <p className="text-sm">&copy; 2025 TaniCerdas. All rights reserved.</p>
      </footer>
    </div>
  );
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};
