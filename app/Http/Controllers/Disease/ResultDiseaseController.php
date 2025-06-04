<?php

namespace App\Http\Controllers\Disease;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\Diseases;

class ResultDiseaseController extends Controller
{
    public function analyze(Request $request)
    {
        // Validate the request data
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'user_id' => 'nullable|integer|exists:users,id',
        ]);

        $apiUrl = 'https://maulidaaa-plant-disease.hf.space/predict';
        $response = Http::attach(
            'image', file_get_contents($request->file('image')->getRealPath()), 'image.jpg'
        )->post($apiUrl);

        if ($response->successful()) {
            $data = $response->json();

            // Check if the response contains 'predicted_label' key
            if (isset($data['predicted_label'])) {
                // Find disease explanation from the diseases table
                $disease = Diseases::where('name', $data['predicted_label'])->first();

                // Simpan ke result_diseases jika ada user_id dan disease ditemukan
                if ($request->user_id && $disease) {
                    $image = $request->file('image')->store('disease_images', 'public');
                    \App\Models\ResultDisease::create([
                        'user_id' => $request->user_id,
                        'disease_id' => $disease->id,
                        'accuracy' => $data['confidence'] ?? null,
                        'image_path' => $image,
                    ]);
                }

                return response()->json([
                    'confidence' => $data['confidence'] ?? null,
                    'predicted_label' => $data['predicted_label'],
                    'description' => $disease->description ?? 'Deskripsi tidak tersedia',
                    'treatment' => $disease->treatment ?? 'Manfaat/treatment tidak tersedia',
                ]);
            } else {
                return response()->json(['error' => 'Invalid response format'], 500);
            }
        } else {
            return response()->json(['error' => 'Failed to analyze image'], 500);
        }
    }

    public function index()
    {
        $userId = auth()->id(); 
        $histories = \App\Models\ResultDisease::with('disease')
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->get();

        return inertia('RiwayatDeteksi', [
            'histories' => $histories
        ]);
    }

    public function destroy($id)
    {
        $result = \App\Models\ResultDisease::where('user_id', auth()->id())->findOrFail($id);
        if ($result->image_path && Storage::disk('public')->exists($result->image_path)) {
            Storage::disk('public')->delete($result->image_path);
        }
        $result->delete();

        return redirect()->back()->with('success', 'Riwayat deteksi berhasil dihapus.');
    }
}
