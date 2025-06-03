import Sidebar from '@/Components/Sidebar';
import ProfileCard from '@/Components/ProfileCard';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Edit({ auth }) {
    const { flash = {} } = usePage().props;
    useEffect(() => {
        if (flash.status) {
            setSuccessMessage(flash.status);
            setTimeout(() => setSuccessMessage(''), 4000);
        }
    }, [flash]);

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        photo_profile: null,
    });

    const [preview, setPreview] = useState(
        auth.user.photo_profile ? `/storage/${auth.user.photo_profile}` : '/images/profile.jpg'
    );
    const [successMessage, setSuccessMessage] = useState('');
    const fileInputRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                if (data.photo_profile) {
                    setPreview(URL.createObjectURL(data.photo_profile));
                    setData('photo_profile', null);
                    reset('photo_profile');
                }
            },
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo_profile', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Ubah Profil" />
            <div className="flex min-h-screen bg-[#F7FFE5]">
                <Sidebar active="profile" />

                <main className="flex-1 p-10">
                    <div className="max-w-4xl mx-auto space-y-10">
                        <h1 className="text-3xl font-livvic font-bold text-[#2B5400]">Edit Profil</h1>

                        {successMessage && (
                            <div className="p-4 text-green-800 bg-green-100 border border-green-300 rounded-md">
                                {successMessage}
                            </div>
                        )}

                        <ProfileCard
                            title="Data Profil"
                            image={preview}
                        >
                            <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                                {/* Edit Foto Profil */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="relative group">
                                        <img
                                            src={preview}
                                            alt="Foto Profil"
                                            className="w-28 h-28 rounded-full object-cover border-4 border-[#FFF264] shadow"
                                        />
                                        <button
                                            type="button"
                                            className="absolute bottom-2 right-2 bg-[#FFF264] text-[#2B5400] rounded-full p-2 shadow group-hover:scale-110 transition"
                                            onClick={() => fileInputRef.current.click()}
                                            title="Ubah Foto"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handlePhotoChange}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-500">Format: JPG, PNG. Maksimal 2MB.</span>
                                    {errors.photo_profile && <p className="text-red-500 text-sm">{errors.photo_profile}</p>}
                                </div>

                                {/* Input Nama */}
                                <div>
                                    <label className="block mb-1 font-medium">Nama</label>
                                    <input
                                        type="text"
                                        name="name" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full p-3 font-poppins rounded-lg border border-gray-300 text-black"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Input Email */}
                                <div>
                                    <label className="block mb-1 font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email" 
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full p-3 font-poppins rounded-lg border border-gray-300 text-black"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                {/* Tombol Submit */}
                                <div className="text-right">
                                    <button
                                        type="submit"
                                        className="bg-[#FFF264] text-[#2B5400] font-bold py-2 px-6 rounded-lg shadow hover:bg-yellow-300 transition"
                                        disabled={processing}
                                    >
                                        Ubah
                                    </button>
                                </div>
                            </form>
                        </ProfileCard>
                    </div>
                </main>
            </div>
        </>
    );
}
