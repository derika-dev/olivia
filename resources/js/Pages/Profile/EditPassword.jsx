import Sidebar from '@/Components/Sidebar';
import ProfileCard from '@/Components/ProfileCard';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

export default function EditPassword({ auth }) {
    return (
        <>
            <Head title="Ubah Password" />
            <div className="flex min-h-screen bg-[#F7FFE5]">
                {/* Sidebar */}
                <Sidebar active="security" />

                <main className="flex-1 p-10">
                    <div className="max-w-4xl mx-auto space-y-10">
                        <h1 className="text-3xl font-livvic font-bold text-[#2B5400]">Ubah Password</h1>

                        <ProfileCard
                            image={false}
                        >
                            <div className="w-full">
                                <UpdatePasswordForm />
                            </div>
                        </ProfileCard>
                    </div>
                </main>
            </div>
        </>
    );
}