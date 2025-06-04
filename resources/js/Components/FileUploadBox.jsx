import React from 'react';

export default function FileUploadBox({ previewUrl, setFile, setPreviewUrl }) {
    // Handler untuk drag & drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setPreviewUrl(URL.createObjectURL(e.dataTransfer.files[0]));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div
            className="bg-[#D9D9D9] mt-0 rounded-2xl border-2 border-dashed border-[#2B4F00] px-4 py-10 flex flex-col items-center justify-center text-center space-y-4 relative min-h-[350px] w-full"
            style={{
                ...(previewUrl
                    ? {
                        backgroundImage: `url(${previewUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: '#fff',
                        border: '2px solid #2B4F00',
                    }
                    : {}),
                maxWidth: '100%',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
        >
            {!previewUrl && (
                <>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-[#C7E7C7] flex items-center justify-center shadow-md">
                        <div className="text-[#2B4F00] text-3xl font-bold">+</div>
                    </div>
                    <p className="text-black font-livvic text-base font-semibold">Seret atau letakan file</p>
                </>
            )}
            {previewUrl && (
                <button
                    type="button"
                    onClick={() => {
                        setFile(null);
                        setPreviewUrl(null);
                    }}
                    className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 text-[#2B4F00] hover:bg-opacity-100"
                    title="Hapus gambar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}