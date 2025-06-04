import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  LogOut,
  User,
  Lock,
  FileText,
  ClipboardList,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react';

export default function Sidebar({ active }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Tombol Hamburger (hanya mobile) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-[#2B5400] text-white p-2 rounded-md shadow"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Utama */}
      <div
        className={`
          fixed md:static top-0 left-0 z-50 w-72 bg-[#2B5400] text-white font-livvic px-6 py-8
          h-screen min-h-screen overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 flex flex-col justify-between
        `}
      >
        <div>
          {/* Logo & Judul */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
                <img src="/Images/logo-Agro.png" alt="Logo" className="w-10 h-10" />
              </span>
              <h1 className="text-3xl font-bold text-[#FFF264]">Profil</h1>
            </div>
            <button onClick={closeSidebar} className="md:hidden text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Kembali ke Beranda */}
          <div className="mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition"
              onClick={closeSidebar}
            >
              <ChevronLeft className="w-5 h-5" />
              Beranda
            </Link>
          </div>

          {/* Menu Navigasi */}
          <nav className="space-y-4">
            <Link
              href="/profile"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold ${
                active === 'profile'
                  ? 'bg-[#FFFA72]/20 text-[#FFFA72] [&_svg]:text-[#FFFA72]'
                  : 'hover:bg-[#FFFA72]/10'
              }`}
              onClick={closeSidebar}
            >
              <User className="w-5 h-5" />
              Profil Saya
            </Link>
            <Link
              href={route('profile.password')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold ${
                active === 'security'
                  ? 'bg-[#A6B87E] text-[#FFFA72] [&_svg]:text-[#FFFA72]'
                  : 'hover:bg-[#A6B87E]/40'
              }`}
              onClick={closeSidebar}
            >
              <Lock className="w-5 h-5" />
              Keamanan
            </Link>
            <Link
              href={route('riwayat.analisis')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold ${
                active === 'riwayat.analisis'
                  ? 'bg-[#A6B87E] text-[#FFFA72] [&_svg]:text-[#FFFA72]'
                  : 'hover:bg-[#A6B87E]/40'
              }`}
              onClick={closeSidebar}
            >
              <FileText className="w-5 h-5" />
              Riwayat Analisis
            </Link>
            <Link
              href="/riwayat-deteksi"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold ${
                active === 'riwayat.deteksi'
                  ? 'bg-[#A6B87E] text-[#FFFA72] [&_svg]:text-[#FFFA72]'
                  : 'hover:bg-[#A6B87E]/40'
              }`}
              onClick={closeSidebar}
            >
              <ClipboardList className="w-5 h-5" />
              Riwayat Deteksi
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <Link
          href="/logout"
          method="post"
          as="button"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/50"
          onClick={closeSidebar}
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </Link>
      </div>
    </>
  );
}
