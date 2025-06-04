import React from 'react';

export default function FileInputBox({ file, setFile, setPreviewUrl }) {
    return (
        <label htmlFor="upload" className="flex items-center w-full mb-12 border border-white rounded-md overflow-hidden bg-opacity-80 bg-white cursor-pointer" style={{ fontSize: 16 }}>
            <input
                id="upload"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={e => {
                    const uploadedFile = e.target.files[0];
                    if (uploadedFile) {
                        setFile(uploadedFile);
                        setPreviewUrl(URL.createObjectURL(uploadedFile));
                    }
                }}
                className="hidden"
            />
            <span className="bg-[#325700] text-white px-4 py-2 text-sm font-bold h-full flex items-center">
                Pilih File
            </span>
            <span className="flex-1 px-4 py-2 bg-white text-gray-500 text-sm truncate h-full flex items-center">
                {file ? file.name : 'format png/jpg'}
            </span>
        </label>
    );
}