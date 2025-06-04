import React, { useState, useEffect, useRef } from 'react';
import AnalysisResult from '@/Components/AnalisysResult';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import BackHeader from '@/Components/BackHeader';
import FileInputBox from '@/Components/FileInputBox';
import FileUploadBox from '@/Components/FileUploadBox';
import DraggableMarker from '@/Components/DraggableMarker';

// Perbaikan ikon Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  return null;
}

// Tambahkan fungsi reverse geocoding
async function reverseGeocode(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.display_name || '';
  } catch (error) {
    return '';
  }
}

export default function Analisys({ auth }) {
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState([-6.9824, 110.4091]);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef();

  // Fungsi pencarian lokasi otomatis saat mengetik
  useEffect(() => {
    if (!location) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        // Optional: handle error
      }
    }, 800);
    return () => clearTimeout(debounceRef.current);
  }, [location]);

  // Ambil lokasi pengguna saat pertama kali komponen dimount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords([latitude, longitude]);
          // Dapatkan alamat dari koordinat
          const address = await reverseGeocode(latitude, longitude);
          setLocation(address);
        },
        (error) => {
        }
      );
    }
  }, []);

  const user_id = auth?.user?.id || null;

  const [contactStatus, setContactStatus] = useState(null);

  // Marker yang bisa digeser & update input lokasi
  function DraggableMarker() {
    const [position, setPosition] = useState(coords);
    const markerRef = useRef(null);

    useEffect(() => {
      setPosition(coords);
    }, [coords]);

    const eventHandlers = {
      dragend: async () => {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setCoords([newPos.lat, newPos.lng]);
          // Reverse geocode untuk update input lokasi
          const address = await reverseGeocode(newPos.lat, newPos.lng);
          setLocation(address);
        }
      },
    };

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      />
    );
  }

  const handleBack = () => window.history.back();

  const handleLocationSearch = async () => {
    if (!location) return alert('Masukkan nama lokasi terlebih dahulu.');
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert('Lokasi tidak ditemukan.');
      }
    } catch (error) {
      console.error('Gagal mencari lokasi:', error);
      alert('Terjadi kesalahan saat mencari lokasi.');
    }
  };

  const handleAnalyze = async () => {
    if (!location || !file) {
      alert('Lokasi dan foto tanah harus diisi.');
      return;
    }
    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('location', location);
    formData.append('latitude', coords[0]);
    formData.append('longitude', coords[1]);
    formData.append('image', file);
    if (user_id) formData.append('user_id', user_id); 

    try {
      const response = await fetch('/api/plant_recomendation/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Response not ok');

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
      setError('Gagal melakukan analisis. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen p-6 space-y-8"
      style={{ backgroundColor: '#325700', color: 'white' }}
    >
      <BackHeader onBack={handleBack} title="Analisis Potensi Tanaman" />

      {/* Layout 2 kolom */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Kiri: Lokasi & Peta */}
        <div className="flex-1 p-0 font-poppins bg-transparent">
          <Label className="text-white font-livvic font-bold text-lg">Lokasi</Label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="bandungan"
            className="w-full rounded-lg px-4 py-2 bg-[#2B4F00] text-white border border-white placeholder-white mt-2"
          />
          <h2 className="text-lg font-livvic font-bold mb-4 mt-4" style={{ color: '#FFFFFF' }}>
            Lokasi pada Peta
          </h2>
          <MapContainer center={coords} zoom={13} style={{ height: '350px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker
              coords={coords}
              setCoords={setCoords}
              setLocation={setLocation}
              reverseGeocode={reverseGeocode}
            />
            <ChangeMapView coords={coords} />
          </MapContainer>
        </div>

        {/* Kanan: Upload Gambar */}
        <div className="flex-1 p-0 font-poppins mb-0 bg-transparent flex flex-col justify-between">
          <Label className="text-white font-livvic font-bold text-lg">Foto Lahan</Label>
          <FileInputBox
            file={file}
            setFile={setFile}
            setPreviewUrl={setPreviewUrl}
          />
          <FileUploadBox
            previewUrl={previewUrl}
            setFile={setFile}
            setPreviewUrl={setPreviewUrl}
          />
        </div>
      </div>

      {/* Tombol Analisis di tengah */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleAnalyze}
          className="w-full max-w-md bg-[#FFFA72] text-[#325700] hover:bg-[#e6e666] font-livvic font-bold text-lg py-3 rounded"
          disabled={loading}
        >
          {loading ? 'Analisis...' : 'Analisis Potensi Tanaman'}
        </Button>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 mt-2 text-center">{error}</p>}

      {/* Hasil Analisis */}
      {analysisResult && <div className="mt-2"><AnalysisResult result={analysisResult} /></div>}
    </div>
  );
}
