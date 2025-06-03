import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword} className={`space-y-6 ${className}`}>
            <div>
                <label className="block mb-1 font-medium text-white">Password Lama</label>
                <TextInput
                    id="current_password"
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={(e) =>
                        setData('current_password', e.target.value)
                    }
                    type="password"
                    className="w-full p-3 font-poppins rounded-lg border border-gray-300 text-black font-normal"
                    autoComplete="current-password"
                />
                <InputError
                    message={errors.current_password}
                    className="mt-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-white">Password Baru</label>
                <TextInput
                    id="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    type="password"
                    className="w-full p-3 font-poppins rounded-lg border border-gray-300 text-black font-normal"
                    autoComplete="new-password"
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
                <label className="block mb-1 font-medium text-white">Konfirmasi Password Baru</label>
                <TextInput
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    type="password"
                    className="w-full p-3 font-poppins rounded-lg border border-gray-300 text-black font-normal"
                    autoComplete="new-password"
                />
                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="text-right font-livvic">
                <PrimaryButton
                    disabled={processing}
                    className="bg-[#FFF264] text-[#2B5400] font-livvic font-bold py-2 px-6 rounded-lg shadow hover:bg-yellow-300 transition"
                >
                    Ubah
                </PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-green-600 ml-4 inline-block">
                        Password berhasil diubah.
                    </p>
                </Transition>
            </div>
        </form>
    );
}
