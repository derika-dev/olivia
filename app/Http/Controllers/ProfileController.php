<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'auth' => [
                'user' => $request->user(),
            ],
            'errors' => session('errors') ? session('errors')->getBag('default')->toArray() : [],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => [
                    'required',
                    'string',
                    'lowercase',
                    'email',
                    'max:255',
                    Rule::unique('users')->ignore($request->user()->id),
                ],
                'photo_profile' => [
                    'nullable',
                    'image',
                    'max:2048',
                ],
            ]);

            $user = $request->user();
            $user->name = $validated['name'];
            $user->email = $validated['email'];

            // Handle upload foto profil
            if ($request->hasFile('photo_profile')) {
                // Hapus foto lama jika ada
                if ($user->photo_profile) {
                    Storage::disk('public')->delete($user->photo_profile);
                }
                // Simpan foto baru ke storage publik
                $user->photo_profile = $request->file('photo_profile')->store('profile_photos', 'public');
            }

            $user->save();

            return Redirect::back()->with('status', 'Profile updated successfully.');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
