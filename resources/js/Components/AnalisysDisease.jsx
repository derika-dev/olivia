import React from 'react';

export default function AnalisysDisease({ file, result, onRestart }) {
  if (!result) return null;

  return (
    <div className="bg-[#325700] min-h-screen p-6 flex justify-center text-white font-sans">
      <div className="flex flex-col md:flex-row font-livvic gap-8 max-w-6xl w-full">
        <div className="w-full md:w-3/5 mt-2">
          <h2 className="text-3xl font-bold text-white mb-4 text-center md:text-left">Hasil Deteksi Penyakit</h2>
          <div className="bg-[#325700] border border-white rounded-2xl p-2 w-full flex justify-center items-center">
            <img
              src={URL.createObjectURL(file)}
              alt="Tanaman yang diunggah"
              className="rounded-2xl object-cover w-full aspect-[4/3] max-h-[400px] bg-black"
            />
          </div>
        </div>

        {/* Kolom kanan */}
        <div className="flex flex-col gap-4 w-full md:w-3/5 mt-16">
          <div className="bg-[#325700] rounded-xl border border-white p-4 space-y-3">
            <div className="flex items-center mb-1">
              <span className="text-lg font-semibold text-[#FDF76D] w-32 text-left">Penyakit</span>
              <span className="mx-2 text-[#FDF76D]">:</span>
              <span className="flex-1 text-white py-2 px-3 rounded-md font-medium">
                {result.predicted_label}
              </span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-lg font-semibold text-[#FDF76D] w-32 text-left">Akurasi</span>
              <span className="mx-2 text-[#FDF76D]">:</span>
              <span className="flex-1 text-white py-2 px-3 rounded-md font-medium">
                {result.confidence ? (result.confidence * 100).toFixed(2) + '%' : '-'}
              </span>
            </div>
          </div>

          <div className="bg-[#325700] rounded-xl border border-white p-4">
            <div className="text-lg font-semibold mb-1">Penjelasan</div>
            <div className="text-[#FDF76D] font-medium">
              {result.description}
            </div>
          </div>

          <div className="bg-[#325700] rounded-xl border border-white p-4">
            <div className="text-lg font-semibold text-white mb-2">Penanganan</div>
            <ul className="list-disc list-inside text-[#FDF76D] space-y-1">
              {result.treatment?.split('\n').map((item, index) => (
                <li key={index} className="flex items-start">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tombol Deteksi Ulang */}
          {onRestart && (
            <button
              onClick={onRestart}
              className="mt-4 self-end bg-[#FDF76D] text-[#325700] font-bold px-6 py-2 rounded hover:bg-yellow-400 transition"
            >
              Deteksi Ulang
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
