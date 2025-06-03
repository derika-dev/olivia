<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit()
    {
        return Inertia::render('Profile/Edit', [
            'auth' => [
                'user' => Auth::user()
            ],
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        if (!($user instanceof \App\Models\User)) {
            $user = \App\Models\User::find($user->id);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'photo_profile' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('photo_profile')) {
            // Hapus foto lama jika ada
            if ($user->photo_profile && Storage::exists('public/' . $user->photo_profile)) {
                Storage::delete('public/' . $user->photo_profile);
            }

            // Simpan foto baru
            $file = $request->file('photo_profile');
            $path = $file->store('photo_profile', 'public');
            $validated['photo_profile'] = $path;
        }

        $user->update($validated);

        return redirect()->route('profile.edit')->with('status', 'Profil berhasil diperbarui!');
    }
}
