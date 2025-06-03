import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/KomoditasPertanian.css';


const agricultureIcon = new L.Icon({
  iconUrl: '/Images/marker-pertanian.png',
  iconSize: [35, 40],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
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
  const [allData, setAllData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    fetch('/api/crop_area/marker')
      .then(res => res.json())
      .then(data => {
        setAllData(data);
        const years = new Set();
        const result = [];

        data.forEach(prov => {
          prov.years.forEach(yearObj => {
            years.add(yearObj.year);
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
        setAvailableYears([...years].sort());
        setLoading(false);
      });
  }, []);

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    const filtered = [];

    allData.forEach(prov => {
      prov.years.forEach(yearObj => {
        if (!year || yearObj.year === year) {
          yearObj.crops.forEach((crop, idx) => {
            filtered.push({
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

    setMarkers(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value && markers.length > 0) {
      const found = markers.find(
        m =>
          m.komoditas.toLowerCase().includes(value.toLowerCase()) ||
          m.daerah?.toLowerCase().includes(value.toLowerCase())
      );
      if (found) setFlyTo(found.posisi);
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
        const response = await fetch(lokasi.soil_image);
        const blob = await response.blob();
        const file = new File([blob], 'soil_image.jpg', { type: blob.type });
        setSoilFile(file);

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
    <div className="min-h-screen bg-[#325700] text-white px-2 md:px-6 py-6 flex flex-col items-center">
      <div
        className="flex items-center mb-8 mt-1 self-start space-x-4 cursor-pointer text-[#FFFA72]"
        onClick={handleBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-9 h-9"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <h1 className="font-livvic font-bold text-4xl md:text-[35px] leading-tight text-[#FFFA72]">
          Peta Komoditas Pertanian
        </h1>
      </div>

      {/* Filter & Search */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white/30 px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm">
          <label htmlFor="year" className="font-semibold text-white">Filter Tahun:</label>
          <div className="relative">
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="appearance-none rounded-lg px-3 py-1 bg-[#FFFA72] text-[#325700] font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFFA72] shadow pr-8"
              style={{ minWidth: 120 }}
            >
              <option value="">Semua Tahun</option>
              {availableYears.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
        <input
          type="text"
          className="search-bar bg-white/80 border-none shadow-lg focus:ring-2 focus:ring-[#FFFA72] placeholder-[#325700] font-semibold"
          placeholder="Cari komoditas atau daerah…"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Map */}
      <div className="w-full max-w-7xl mx-auto mb-8">
        <div className="rounded-3xl overflow-hidden border-4 border-[#FFFA72] shadow-2xl bg-white/10">
          <MapContainer
            center={[-7.230, 110.390]}
            zoom={13}
            scrollWheelZoom
            className="leaflet-map"
            style={{ minHeight: 520, width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {!loading && markers.map(lokasi => (
              <Marker
                key={lokasi.id}
                position={lokasi.posisi}
                icon={agricultureIcon}
                eventHandlers={{ click: () => handleMarkerClick(lokasi) }}
              >
                <Popup>
                  <div className="font-livvic text-[#325700]">
                    <strong>{lokasi.daerah}</strong><br />
                    <span className="text-xs">Tahun: {lokasi.year}</span><br />
                    <span className="font-semibold">Komoditas & Area:</span>
                    <ul className="list-disc ml-4">
                      {markers.filter(m => m.daerah === lokasi.daerah && m.year === lokasi.year).map((m, i) => (
                        <li key={i}>{m.komoditas} : {m.area}</li>
                      ))}
                    </ul>
                    {lokasi.soil_image && (
                      <div className="flex justify-center my-2">
                        <img src={lokasi.soil_image} alt="Soil" className="rounded-xl w-24 border-2 border-[#325700] shadow" />
                      </div>
                    )}
                    <span className="text-[#325700] text-xs block mt-2">Klik marker untuk analisis tanah</span>
                  </div>
                </Popup>
              </Marker>
            ))}
            <FlyToLocation position={flyTo} />
          </MapContainer>
        </div>
      </div>

      {/* Analisis Potensi Tanah */}
      <div className="w-full max-w-xl bg-white/90 text-[#325700] rounded-2xl shadow-2xl p-8 border-2 border-[#FFFA72] mb-10 backdrop-blur">
        <h2 className="font-bold text-xl mb-4 font-livvic text-[#325700]">Analisis Potensi Tanah</h2>
        {soilLoading && <div className="text-[#325700] animate-pulse">Menganalisis tanah...</div>}
        {soilError && <div className="text-red-600 mt-2">{soilError}</div>}
        {soilFile && (
          <div className="mt-2 flex items-center gap-3">
            <span className="text-[#325700] text-xs">Gambar tanah dari marker:</span>
            <img src={URL.createObjectURL(soilFile)} alt="Soil preview" className="rounded-xl shadow border-2 border-[#325700]" style={{ width: 100 }} />
          </div>
        )}
        {soilLat && soilLon && (
          <div className="mt-2 text-xs text-gray-700">
            Lokasi: <span className="font-semibold">{soilLat}, {soilLon}</span>
          </div>
        )}
        {soilResult && (
          <div className="mt-4 text-sm space-y-2">
            <div><strong>Jenis Tanah:</strong> {soilResult.soil?.type}</div>
            <div><strong>Akurasi:</strong> {soilResult.soil?.accuracy}</div>
            <div><strong>pH:</strong> {soilResult.soil?.pH}</div>
            <div className="mt-3 font-semibold text-[#325700]">Komoditas yang Cocok:</div>
            {soilResult.plants?.length ? (
              <ul className="list-disc ml-5">
                {soilResult.plants.map((plant, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-bold">{plant.name}</span>{' '}
                    <span className="text-xs text-gray-600">({plant.recommendation_percentage}%)</span>
                    {plant.planting_tips && (
                      <div className="text-xs text-gray-700 mt-1">Tips: {plant.planting_tips}</div>
                    )}
                  </li>
                ))}
              </ul>
            ) : <div className="text-gray-500">Tidak ada rekomendasi tanaman.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default KomoditasPertanian;
