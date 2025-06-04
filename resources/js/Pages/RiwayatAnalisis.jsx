import React, { useEffect, useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import AnalysisResult from '@/Components/AnalisysResult';
import { format } from 'date-fns';
import { router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function RiwayatAnalisis({ histories = [] }) {
  const [data, setData] = useState(histories);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);

  const handleView = (item) => {
    setSelectedResult(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus riwayat ini?')) return;
    router.delete(route('history.plant.recomendation.destroy', id), {
      onSuccess: () => setData((prev) => prev.filter((item) => item.id !== id)),
    });
    if (selectedResult && selectedResult.id === id) setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F7FFE5]">
      <Sidebar />
      <div className="flex-1 p-2 md:p-8 bg-[#F7FFE5]">
        <h1 className="text-xl md:text-2xl font-livvic font-bold text-[#2B5400] mb-4 md:mb-8">Riwayat Analisis</h1>
        <div className="rounded-xl shadow bg-[#F7FFE5] p-2 md:p-6 overflow-x-auto">
          <div className="min-w-[600px]">
            <table className="w-full table-auto text-sm md:text-base">
              <thead>
                <tr className="bg-[#2B4F00] text-white">
                  <th className="px-2 md:px-4 py-2 text-left">Tanggal</th>
                  <th className="px-2 md:px-4 py-2 text-left">Lokasi</th>
                  <th className="px-2 md:px-4 py-2 text-left">Hasil</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8">Belum ada riwayat analisis.</td>
                  </tr>
                ) : (
                  currentData.map((item) => (
                    <tr key={item.id} className="border-b last:border-b-0">
                      <td className="px-4 py-2">
                        {item.created_at ? format(new Date(item.created_at), 'dd/MM/yyyy HH:mm') : '-'}
                      </td>
                      <td className="px-4 py-2">
                        {item.soil?.location || '-'}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          className="bg-[#2B4F00] text-white px-3 py-1 rounded hover:bg-[#406e00] transition"
                          onClick={() => handleView(item)}
                        >
                          Lihat
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          onClick={() => handleDelete(item.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {showModal && selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-2">
            <div className="bg-[#2B4F00] rounded-[24px] px-4 py-6 md:px-6 md:py-8 w-full max-w-md md:max-w-lg text-white shadow-lg relative">
              <h2 className="text-lg md:text-xl font-livvic text-[#F8E559] font-bold mb-4 text-center">Detail Hasil Analisis</h2>
              <div className="space-y-3 font-livvic text-base">
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Lokasi</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.location || selectedResult.location || '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Jenis Tanah</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">{selectedResult.soil?.type || selectedResult.soil?.soil_type || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Cuaca</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.temperature
                      ? parseFloat(selectedResult.soil.temperature).toFixed(2) + '°C'
                      : '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">pH</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.pH ? parseFloat(selectedResult.soil.pH).toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Potassium</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.K ? parseFloat(selectedResult.soil.K).toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Nitrogen</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.N ? parseFloat(selectedResult.soil.N).toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#F8E559] font-bold">Phosphorus</span>
                  <span className="mx-1">:</span>
                  <span className="flex-1">
                    {selectedResult.soil?.P ? parseFloat(selectedResult.soil.P).toFixed(2) : '-'}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-[#F8E559] font-bold">Tanaman yang Cocok</span>
                  <span className="mx-1">:</span>
                  <div className="flex-1 space-y-1">
                    {selectedResult.plants && selectedResult.plants.length > 0 ? (
                      <ul className="list-disc list-inside ml-4">
                        {selectedResult.plants.map((plant) => (
                          <li key={plant.id}>
                            {plant.name}{' '}
                            {plant.recommendation_percentage !== undefined
                              ? `(${plant.recommendation_percentage}%)`
                              : plant.accuracy !== undefined
                              ? `(${plant.accuracy}%)`
                              : ''}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  className="bg-[#F8E559] font-livvic text-[#325700] font-bold px-4 py-2 md:px-6 md:py-2 rounded-md hover:bg-yellow-300 transition"
                  onClick={() => setShowModal(false)}
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
