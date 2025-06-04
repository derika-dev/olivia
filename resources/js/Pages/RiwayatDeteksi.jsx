import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { format } from 'date-fns';
import { router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function RiwayatDeteksi({ histories = [] }) {
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

  const handleDelete = (id) => {
    if (!window.confirm('Yakin ingin menghapus riwayat ini?')) return;
    router.delete(route('riwayat.deteksi.destroy', id), {
      onSuccess: () => setData((prev) => prev.filter((item) => item.id !== id)),
    });
    if (selectedResult && selectedResult.id === id) setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F7FFE5]">
      <Sidebar active="riwayat.deteksi" />
      <div className="flex-1 p-2 md:p-8 bg-[#F7FFE5]">
        <h1 className="text-xl md:text-2xl font-livvic font-bold text-[#2B5400] mb-4 md:mb-8">
          Riwayat Deteksi Penyakit Tanaman
        </h1>

        {/* TABEL UTAMA RESPONSIF */}
        <div className="overflow-x-auto rounded-xl shadow p-2 md:p-6 bg-[#F7FFE5]">
          <table className="min-w-full table-auto text-sm md:text-base">
            <thead>
              <tr className="bg-[#2B4F00] text-white">
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Nama Penyakit</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Gambar</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    Belum ada riwayat deteksi penyakit.
                  </td>
                </tr>
              ) : (
                currentData.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3">
                      {item.created_at
                        ? format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')
                        : '-'}
                    </td>
                    <td className="px-4 py-3">{item.disease?.name || '-'}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {item.image_path ? (
                        <img
                          src={`/storage/${item.image_path}`}
                          alt="Tanaman"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="bg-[#2B4F00] text-white px-4 py-1.5 rounded hover:bg-[#406e00] transition text-sm"
                          onClick={() => handleView(item)}
                        >
                          Lihat
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition text-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* MODAL DETAIL */}
        {showModal && selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-2">
            <div className="bg-[#325700] rounded-[32px] p-4 md:p-6 w-full max-w-md md:max-w-lg text-white relative">
              <h2 className="text-lg md:text-xl font-livvic text-[#F8E559] font-bold mb-4 text-center">
                Detail Hasil Analisis
              </h2>
              <div className="flex justify-center mb-4">
                {selectedResult.image_path ? (
                  <img
                    src={`/storage/${selectedResult.image_path}`}
                    alt="Tanaman"
                    className="w-40 h-40 rounded-[20px] object-cover"
                  />
                ) : (
                  <div className="text-gray-300">Tidak ada gambar</div>
                )}
              </div>

              <div className="space-y-2 text-sm font-livvic">
                <div className="flex items-start">
                  <span className="inline-block w-32 text-[#F8E559] font-semibold text-left">
                    Penyakit
                  </span>
                  <span className="mx-2">:</span>
                  <span className="flex-1">{selectedResult.disease?.name || '-'}</span>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-32 text-[#F8E559] font-semibold text-left">
                    Akurasi
                  </span>
                  <span className="mx-2">:</span>
                  <span className="flex-1">
                    {selectedResult.accuracy
                      ? (selectedResult.accuracy * 100).toFixed(0) + '%'
                      : '-'}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-32 text-[#F8E559] font-semibold text-left">
                    Penjelasan
                  </span>
                  <span className="mx-2">:</span>
                  <span className="flex-1">{selectedResult.disease?.description || '-'}</span>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-32 text-[#F8E559] font-semibold text-left">
                    Penanganan
                  </span>
                  <span className="mx-2">:</span>
                  <span className="flex-1">{selectedResult.disease?.treatment || '-'}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-[#F8E559] font-livvic text-[#325700] px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
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
