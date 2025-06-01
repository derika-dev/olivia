<?php

namespace App\Http\Controllers\CropArea;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MarkerController extends Controller
{
    public function marker(){
        $cropAreas = \App\Models\CropAreas::with(['crop', 'province'])->get();

        $result = [];
        foreach ($cropAreas as $cropArea) {
            $provinceName = $cropArea->province->name;
            $year = $cropArea->year ?? 'Tanpa Tahun'; // Pastikan ada field year di tabel crop_areas

            if (!isset($result[$provinceName])) {
                $soilPath = $cropArea->province->soil;
                // Gabungkan domain dengan path jika belum ada http/https
                if ($soilPath && !preg_match('/^https?:\/\//', $soilPath)) {
                    $soilPath = request()->getSchemeAndHttpHost() . '/' . ltrim($soilPath, '/');
                }
                $result[$provinceName] = [
                    'province' => $provinceName,
                    'latitude' => $cropArea->province->latitude,
                    'longitude' => $cropArea->province->longitude,
                    'soil_image' => $soilPath,
                    'years' => [],
                ];
            } 

            if (!isset($result[$provinceName]['years'][$year])) {
                $result[$provinceName]['years'][$year] = [
                    'year' => $year,
                    'crops' => [],
                ];
            }

            $result[$provinceName]['years'][$year]['crops'][] = [
                'crop' => $cropArea->crop->name,
                'area' => $cropArea->area,
            ];
        }

        // Ubah struktur years menjadi array numerik
        foreach ($result as &$province) {
            $province['years'] = array_values($province['years']);
        }
        return response()->json(array_values($result));
    }

    public function markerByProvince($provinceId)
    {
        $cropAreas = \App\Models\CropAreas::with(['crop', 'province'])
            ->where('province_id', $provinceId)
            ->get();

        if ($cropAreas->isEmpty()) {
            return response()->json(['message' => 'No crop areas found for this province'], 404);
        }

        $result = [];
        foreach ($cropAreas as $cropArea) {
            $year = $cropArea->year ?? 'Tanpa Tahun'; // Pastikan ada field year di tabel crop_areas

            if (!isset($result[$year])) {
                $result[$year] = [
                    'year' => $year,
                    'crops' => [],
                ];
            }

            $result[$year]['crops'][] = [
                'crop' => $cropArea->crop->name,
                'area' => $cropArea->area,
                'latitude' => $cropArea->latitude, // Assuming latitude is a field in CropAreas
                'longitude' => $cropArea->longitude, // Assuming longitude is a field in CropAreas
            ];
        }

        return response()->json(array_values($result));
    }
    public function markerByYearProvice($year, $provinceId)
    {
        $cropAreas = \App\Models\CropAreas::with(['crop', 'province'])
            ->where('year', $year)
            ->where('province_id', $provinceId)
            ->get();

        if ($cropAreas->isEmpty()) {
            return response()->json(['message' => 'No crop areas found for this year and province'], 404);
        }

        $result = [];
        foreach ($cropAreas as $cropArea) {
            $result[] = [
                'crop' => $cropArea->crop->name,
                'area' => $cropArea->area,
                'latitude' => $cropArea->latitude, // Assuming latitude is a field in CropAreas
                'longitude' => $cropArea->longitude, // Assuming longitude is a field in CropAreas
            ];
        }
        return response()->json($result);
    }
    public function rekomendasiTanamanByProvince($provinceId)
    {
        // Ambil data crop area untuk provinsi ini
        $cropAreas = \App\Models\CropAreas::with('crop')
            ->where('province_id', $provinceId)
            ->get();

        if ($cropAreas->isEmpty()) {
            return response()->json(['message' => 'No crop areas found for this province'], 404);
        }

        // Kelompokkan dan jumlahkan area per crop
        $rekomendasi = [];
        foreach ($cropAreas as $cropArea) {
            $cropName = $cropArea->crop->name;
            if (!isset($rekomendasi[$cropName])) {
                $rekomendasi[$cropName] = 0;
            }
            $rekomendasi[$cropName] += $cropArea->area;
        }

        // Urutkan dari yang terluas
        arsort($rekomendasi);

        // Format hasil
        $result = [];
        foreach ($rekomendasi as $crop => $area) {
            $result[] = [
                'crop' => $crop,
                'total_area' => $area
            ];
        }

        return response()->json($result);
    }
    public function soilAnalysis(Request $request)
    {
        // Validate the request data
            $validatedData = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
                'user_id' => 'required|exists:users,id', // Optional user ID for authenticated users
            ]);

            Log::info('Request received for plant recommendation', [
                'user_id' => $validatedData['user_id'],
                'latitude' => $validatedData['latitude'],
                'longitude' => $validatedData['longitude'],
            ]);
            Log::info('Image received', ['has_image' => $request->hasFile('image')]);

            // hit api from https://maulidaaa-api-crop-soil.hf.space/analyze
            $apiUrl = 'https://maulidaaa-api-crop-soil.hf.space/analyze';
            $response = Http::attach(
                'image', file_get_contents($validatedData['image']), 'image.jpg'
            )->post($apiUrl, [
                'lat' => $validatedData['latitude'],
                'lon' => $validatedData['longitude'],
            ]);

            Log::info('API response status', ['status' => $response->status()]);
            Log::info('API response body', ['body' => $response->body()]);

            // Check if the response is successful
            if ($response->successful()) {
                $data = $response->json();
                Log::info('API response data', ['data' => $data]);

                // Mapping farming_tips dan recommended_crops agar lebih terstruktur
                $plants = [];
                $recommendationMap = [];
                if (isset($data['recommended_crops']) && is_array($data['recommended_crops'])) {
                    foreach ($data['recommended_crops'] as $rec) {
                        $recommendationMap[$rec['crop']] = $rec['recommendation_percentage'];
                    }
                }
                if (isset($data['farming_tips']) && is_array($data['farming_tips'])) {
                    foreach ($data['farming_tips'] as $plantData) {
                        $name = $plantData['Nama Tanaman'] ?? null;
                        $plants[] = [
                            'name' => $name,
                            'benefits' => $plantData['Manfaat'] ?? null,
                            'planting_tips' => $plantData['Tips Menanam'] ?? null,
                            'recommendation_percentage' => $recommendationMap[$name] ?? null,
                            'id' => $plantData['id'] ?? null,
                        ];
                    }
                }

                $responseData = [
                    'soil' => [
                        'type' => $data['Class_Name'] ?? null,
                        'accuracy' => $data['soil_prediction_accuracy'] ?? null,
                        'K' => $data['nearest_soil_data']['K'] ?? null,
                        'N' => $data['nearest_soil_data']['N'] ?? null,
                        'P' => $data['nearest_soil_data']['P'] ?? null,
                        'pH' => $data['nearest_soil_data']['pH'] ?? null,
                        'latitude' => $data['nearest_soil_data']['latitude'] ?? null,
                        'longitude' => $data['nearest_soil_data']['longitude'] ?? null,
                        'location' => $data['nearest_soil_data']['location_name'] ?? null,
                        'distance_km' => $data['nearest_soil_data']['distance_km'] ?? null,
                    ],
                    'weather' => [
                        'humidity' => $data['weather']['humidity'] ?? null,
                        'temperature' => $data['weather']['temperature'] ?? null,
                    ],
                    'plants' => $plants,
                ];

                return response()->json($responseData);
            }

            // If the API call failed
            return response()->json(['message' => 'Failed to analyze soil'], 500);
    }
}
