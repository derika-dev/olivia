import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import FileInputBox from '../Components/FileInputBox';
import FileUploadBox from '../Components/FileUploadBox';
import AnalisysDisease from '../Components/AnalisysDisease';

function AnalysisDisease({ file, user_id, onRestart }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);
    if (user_id) formData.append('user_id', user_id);

    fetch('/api/disease/analyze', {
      method: 'POST',
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Gagal analisis');
        const data = await res.json();
        setResult(data);
      })
      .catch(() => setError('Gagal melakukan analisis.'))
      .finally(() => setLoading(false));
  }, [file, user_id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="relative flex items-center justify-center mb-4">
        <span className="absolute inline-flex h-16 w-16 rounded-full bg-[#FDF76D] opacity-30 animate-ping"></span>
        <span className="relative rounded-full h-16 w-16 bg-[#FDF76D] flex items-center justify-center">
          <svg className="w-8 h-8 text-[#325700] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-30" cx="12" cy="12" r="10" stroke="#325700" strokeWidth="4" />
            <path className="opacity-80" fill="#325700" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </span>
      </div>
      <div className="text-[#FDF76D] text-lg font-semibold font-livvic animate-pulse">
        Analisis gambar sedang diproses...
      </div>
    </div>
  );
  if (error) return <div className="text-red-500">{error}</div>;
  if (!result) return null;

  return (
    <AnalisysDisease
      file={file}
      result={result}
      onRestart={onRestart}
    />
  );
}

export default function DeteksiPenyakitTanaman({ auth }) {
  const [file, setFile] = useState(null);  
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleBack = () => window.history.back();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen bg-[#325700] flex flex-col items-center px-4">
      <div
        className="flex items-center mb-6 mt-6 self-start space-x-4 cursor-pointer text-[#FFFA72]"
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
          Deteksi Penyakit Tanaman
        </h1>
      </div>

      {!showAnalysis && (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6 font-poppins">
          <label className="block text-white font-livvic font-bold text-lg ">
            Foto Tanaman
          </label>
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#F6EB73] text-[#325700] font-thin font-livvic px-6 py-2 rounded hover:bg-yellow-400"
            >
              Cek Tanaman
            </button>
          </div>
        </form>
      )}

      {/* Tampilkan hasil analisis */}
      {showAnalysis && (
        <AnalysisDisease
          file={file}
          user_id={auth?.user ? auth.user.id : null}
          onRestart={() => {
            setFile(null);
            setPreviewUrl('');
            setShowAnalysis(false);
          }}
        />
      )}
    </div>
  );
}
