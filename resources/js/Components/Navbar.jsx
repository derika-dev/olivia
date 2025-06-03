import React, { useState, useEffect, useRef } from 'react';
import { route } from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';
import { Settings, LogOut } from 'lucide-react';
import ProfileOpen from './ProfileOpen';

export default function Navbar({ auth }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const profileRef = useRef();

  function handleLogout() {
    Inertia.post(route('logout'), {}, {
      onSuccess: () => {
        Inertia.visit(route('beranda'));
      },
    });
  }

  // Scrollspy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'beranda', offset: 0 },
        { id: 'tentang-kami', offset: document.getElementById('tentang-kami')?.offsetTop || 0 },
        { id: 'fitur', offset: document.getElementById('fitur')?.offsetTop || 0 },
        { id: 'kontak', offset: document.getElementById('kontak')?.offsetTop || 0 },
      ];
      const scrollPosition = window.scrollY + 100;

      let current = 'beranda';
      for (let i = 0; i < sections.length; i++) {
        if (scrollPosition >= sections[i].offset) {
          current = sections[i].id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper for active class
  const navLinkClass = (section) =>
    `px-2 py-1 transition ${
      activeSection === section ? 'text-[#FFFA72] font-bold underline underline-offset-8' : ''
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-[#355C00] text-white font-poppins shadow-lg z-50 transition-all duration-300">
      <div className="flex items-center space-x-3">
        <img src="/Images/logo-Agro.png" alt="Logo Agro" className="w-12 h-12 object-contain border-2 bg-white rounded-full" />
        <span className="font-bold font-livvic text-[#FFFA72] text-xl">TaniCerdas</span>
      </div>

      <button
        className="md:hidden block focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Buka menu"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Navigasi Desktop */}
      <ul className="md:flex hidden space-x-8 items-center font-semibold text-sm">
        <li className="relative">
          <a
            href="#"
            className={navLinkClass('beranda')}
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('beranda');
            }}
          >
            Beranda
          </a>
          {activeSection === 'beranda' && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#FFFA72] block"></span>
          )}
        </li>
        <li>
          <button
            className={navLinkClass('tentang-kami')}
            onClick={() => {
              document.getElementById('tentang-kami')?.scrollIntoView({ behavior: 'smooth' });
              setActiveSection('tentang-kami');
            }}
          >
            Tentang Kami
          </button>
        </li>
        <li>
          <button
            className={navLinkClass('kontak')}
            onClick={() => {
              document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' });
              setActiveSection('kontak');
            }}
          >
            Kontak
          </button>
        </li>
        <li className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`text-[#FFFA72] font-bold flex items-center gap-1 ${activeSection === 'fitur' ? 'underline underline-offset-8' : ''}`}
          >
            #TanamAku
            <svg
              className={`w-3 h-3 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.355a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <ul className="absolute font-poppins left-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg z-10">
              <li>
                <a href="/analisis-potensi-tanaman" className="block px-4 py-2 hover:bg-gray-100 border-b" style={{ borderColor: '#FFFA72' }}>
                  Analisis potensi tanaman
                </a>
              </li>
              <li>
                <a href="/analisis-penyakit-tanaman" className="block px-4 py-2 hover:bg-gray-100 border-b" style={{ borderColor: '#FFFA72' }}>
                  Deteksi penyakit tanaman
                </a>
              </li>
              <li>
                <a href="/peta-komoditas-pertanian" className="block px-4 py-2 hover:bg-gray-100">
                  Peta Komoditas Pertanian
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Navigasi Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#355C00] text-white shadow-lg z-40">
          <ul className="flex flex-col space-y-2 py-4 px-6 font-semibold text-base">
            <li>
              <a
                href="#"
                className={navLinkClass('beranda')}
                onClick={e => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                  setActiveSection('beranda');
                }}
              >
                Beranda
              </a>
            </li>
            <li>
              <button
                className={navLinkClass('tentang-kami')}
                onClick={() => {
                  document.getElementById('tentang-kami')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                  setActiveSection('tentang-kami');
                }}
              >
                Tentang Kami
              </button>
            </li>
            <li>
              <button
                className={navLinkClass('kontak')}
                onClick={() => {
                  document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                  setActiveSection('kontak');
                }}
              >
                Kontak
              </button>
            </li>
            <li>
              <details>
                <summary className={`py-2 cursor-pointer text-[#FFFA72] font-bold ${activeSection === 'fitur' ? 'underline underline-offset-8' : ''}`}>#TanamAku</summary>
                <ul className="pl-4">
                  <li>
                    <a href="/analisis-potensi-tanaman" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
                      Analisis potensi tanaman
                    </a>
                  </li>
                  <li>
                    <a href="/analisis-penyakit-tanaman" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
                      Deteksi penyakit tanaman
                    </a>
                  </li>
                  <li>
                    <a href="/peta-komoditas-pertanian" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
                      Peta Komoditas Pertanian
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              {auth?.user ? (
                <button
                  className="block py-2 w-full text-left"
                  onClick={() => { Inertia.visit('/profile'); setMobileMenuOpen(false); }}
                >
                  Profil
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <a
                    href={route('register')}
                    className="border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#FFFA72] transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Daftar
                  </a>
                  <a
                    href={route('login')}
                    className="bg-[#FFFA72] text-black px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Masuk
                  </a>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}  

      {/* Profil / Auth Aksi Desktop */}
      <div className="relative md:block hidden" ref={profileRef}>
        {auth?.user ? (
          <div>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-none"
            >
              <img
                src={auth.user.photo || '/Images/profile.jpg'}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {profileMenuOpen && (
              <ProfileOpen
                auth={auth}
                handleLogout={handleLogout}
                onProfile={() => Inertia.visit('/profile')}
              />
            )}
          </div>
        ) : (
          <div className="flex space-x-3">
            <a
              href={route('register')}
              className="border border-white text-white px-4 py-1.5 rounded-md hover:bg-white hover:text-[#FFFA72] transition"
            >
              Daftar
            </a>
            <a
              href={route('login')}
              className="bg-[#FFFA72] text-black px-4 py-1.5 rounded-md font-semibold hover:opacity-90 transition"
            >
              Masuk
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
