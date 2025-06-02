import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/KomoditasPertanian.css';
import BackHeader from '@/Components/BackHeader';

const agricultureIcon = new L.Icon({
  iconUrl: '/Images/marker-pertanian.png',
  iconSize: [35, 40],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30]
});

function FlyToLocation({ position }) {
  const map = useMap();
  React.useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

const handleBack = () => window.history.back();

const KomoditasPertanian = () => {
  const [search, setSearch] = useState('');
  const [flyTo, setFlyTo] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [soilFile, setSoilFile] = useState(null);
  const [soilLat, setSoilLat] = useState('');
  const [soilLon, setSoilLon] = useState('');
  const [soilResult, setSoilResult] = useState(null);
  const [soilLoading, setSoilLoading] = useState(false);
  const [soilError, setSoilError] = useState('');
  const [allData, setAllData] = useState([]); // simpan semua data marker
  const [selectedYear, setSelectedYear] = useState(''); // tahun yang dipilih

  React.useEffect(() => {
    setLoading(true);
    fetch('/api/crop_area/marker')
      .then(res => res.json())
      .then(data => {
        setAllData(data); // simpan data asli
        // Ambil semua tahun unik
        const years = [];
        data.forEach(prov => {
          prov.years.forEach(y => {
            if (y.year && !years.includes(y.year)) years.push(y.year);
          });
        });
        years.sort();
        // Set default tahun ke kosong (semua tahun)
        setSelectedYear('');
        // Mapping marker awal (semua tahun)
        const result = [];
        data.forEach((prov) => {
          prov.years.forEach((yearObj) => {
            yearObj.crops.forEach((crop, idx) => {
              result.push({
                id: `${prov.province}-${yearObj.year}-${crop.crop}-${idx}`,
                posisi: [prov.latitude, prov.longitude],
                komoditas: crop.crop,
                daerah: prov.province,
                year: yearObj.year,
                area: crop.area,
                soil_image: prov.soil_image,
              });
            });
          });
        });
        setMarkers(result);
        setAvailableYears(years);
      })
      .finally(() => setLoading(false));
  }, []);

  // Tambahkan state untuk daftar tahun
  const [availableYears, setAvailableYears] = useState([]);

  // Handler saat user memilih tahun
  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    // Filter marker sesuai tahun
    const result = [];
    allData.forEach((prov) => {
      prov.years.forEach((yearObj) => {
        if (!year || yearObj.year === year) {
          yearObj.crops.forEach((crop, idx) => {
            result.push({
              id: `${prov.province}-${yearObj.year}-${crop.crop}-${idx}`,
              posisi: [prov.latitude, prov.longitude],
              komoditas: crop.crop,
              daerah: prov.province,
              year: yearObj.year,
              area: crop.area,
              soil_image: prov.soil_image,
            });
          });
        }
      });
    });
    setMarkers(result);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0 && markers.length > 0) {
      const found = markers.find(
        (item) =>
          item.komoditas.toLowerCase().includes(value.toLowerCase()) ||
          (item.daerah && item.daerah.toLowerCase().includes(value.toLowerCase()))
      );
      if (found) {
        setFlyTo(found.posisi);
      }
    }
  };

  const handleSoilSubmit = async (e) => {
    e.preventDefault();
    setSoilLoading(true);
    setSoilError('');
    setSoilResult(null);

    const formData = new FormData();
    formData.append('image', soilFile);
    formData.append('latitude', soilLat);
    formData.append('longitude', soilLon);
    formData.append('user_id', 1);

    try {
      const res = await fetch('/api/crop_area/soil-analysis', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Gagal menganalisis tanah');
      const data = await res.json();
      setSoilResult(data);
    } catch (err) {
      setSoilError(err.message);
    } finally {
      setSoilLoading(false);
    }
  };

  const handleMarkerClick = async (lokasi) => {
    setSoilLat(lokasi.posisi[0]);
    setSoilLon(lokasi.posisi[1]);
    setSoilResult(null);
    setFlyTo(lokasi.posisi);

    if (lokasi.soil_image) {
      try {
        setSoilLoading(true);
        setSoilError('');
        // Ambil gambar dari URL dan ubah ke File
        const response = await fetch(lokasi.soil_image);
        const blob = await response.blob();
        const file = new File([blob], 'soil_image.jpg', { type: blob.type });
        setSoilFile(file);

        // Kirim ke backend
        const formData = new FormData();
        formData.append('image', file);
        formData.append('latitude', lokasi.posisi[0]);
        formData.append('longitude', lokasi.posisi[1]);
        formData.append('user_id', 1);

        const res = await fetch('/api/crop_area/soil_analysis', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Gagal menganalisis tanah');
        const data = await res.json();
        setSoilResult(data);
      } catch (err) {
        setSoilFile(null);
        setSoilError(err.message);
      } finally {
        setSoilLoading(false);
      }
    } else {
      setSoilFile(null);
      setSoilError('Marker ini tidak memiliki gambar tanah.');
    }
  };

  return (
    <div className="min-h-screen bg-[#325700] flex flex-col items-center px-4">
      <div
        className="flex items-center mb-6 mt-6 self-start space-x-4 cursor-pointer text-[#FFFA72]"
        onClick={handleBack}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-9 h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <h1 className="font-livvic font-bold text-4xl md:text-[35px] leading-tight text-[#FFFA72]">
          Analisis Potensi Tanaman
        </h1>
      </div>

      <div className="w-full max-w-6xl">
        {/* Dropdown filter tahun */}
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="year" className="text-white font-semibold">Filter Tahun:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="rounded px-2 py-1"
          >
            <option value="">Semua Tahun</option>
            {availableYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="map-container relative">
          <MapContainer center={[-7.230, 110.390]} zoom={13} scrollWheelZoom={true} className="leaflet-map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {!loading && markers.map((lokasi) => (
              <Marker
                key={lokasi.id}
                position={lokasi.posisi}
                icon={agricultureIcon}
                eventHandlers={{ click: () => handleMarkerClick(lokasi) }}
              >
                <Popup>
                  <strong>{lokasi.daerah}</strong><br />
                  Tahun: {lokasi.year}<br />
                  <span className="font-semibold">Komoditas & Area:</span>
                  <ul className="list-disc ml-4">
                    {markers
                      .filter(m => m.daerah === lokasi.daerah && m.year === lokasi.year)
                      .map((m, idx) => (
                        <li key={idx}>
                          {m.komoditas} : {m.area}
                        </li>
                      ))}
                  </ul>
                  {lokasi.soil_image && (
                    <>
                      <img src={lokasi.soil_image} alt="Soil" style={{ width: 80, borderRadius: 8 }} /><br />
                    </>
                  )}
                  <span className="text-xs text-green-700">Klik marker untuk analisis tanah di lokasi ini</span>
                </Popup>
              </Marker>
            ))}
            <FlyToLocation position={flyTo} />
          </MapContainer>

          <input
            type="text"
            className="search-bar"
            placeholder="Cari komoditas atau daerah…"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-8 w-full max-w-xl">
        <h2 className="font-bold text-lg mb-4 text-[#325700]">Analisis Potensi Tanah</h2>
        {/* Tidak ada form, hasil analisis langsung tampil */}
        {soilLoading && <div className="text-[#325700]">Menganalisis tanah...</div>}
        {soilError && <div className="text-red-600 mt-2">{soilError}</div>}
        {soilFile && (
          <div className="mt-2">
            <span className="text-green-700 text-xs">Gambar tanah otomatis terisi dari marker.</span>
            <img
              src={URL.createObjectURL(soilFile)}
              alt="Preview"
              className="mt-1 rounded"
              style={{ width: 100 }}
            />
          </div>
        )}
        {soilLat && soilLon && (
          <div className="mt-2 text-xs text-gray-700">
            Lokasi: {soilLat}, {soilLon}
          </div>
        )}
        {soilResult && (
          <div className="mt-4 text-sm">
            <div className="font-semibold text-[#325700]">
              Jenis Tanah: {soilResult.soil?.type}
            </div>
            <div>Akurasi: {soilResult.soil?.accuracy}</div>
            <div>pH: {soilResult.soil?.pH}</div>
            <div className="mt-2 font-semibold text-[#325700]">Komoditas yang Cocok:</div>
            {soilResult.plants && soilResult.plants.length > 0 ? (
              <ul className="list-disc ml-5">
                {soilResult.plants.map((plant, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-bold">{plant.name}</span>
                    {plant.recommendation_percentage && (
                      <span className="ml-2 text-xs text-gray-600">
                        (Akurasi: {plant.recommendation_percentage}%)
                      </span>
                    )}
                    {plant.planting_tips && (
                      <div className="text-xs text-gray-700 mt-1">
                        <span className="font-semibold">Tips Menanam:</span> {plant.planting_tips}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">Tidak ada rekomendasi tanaman.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KomoditasPertanian;
