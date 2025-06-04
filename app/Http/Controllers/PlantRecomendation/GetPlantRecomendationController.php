<?php

namespace App\Http\Controllers\PlantRecomendation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GetPlantRecomendationController extends Controller
{
    public function store(Request $request)
    {
        try {
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

            // hit api from https://maulidaaa-api-crop-soil.hf.space/analyze
            $apiUrl = 'https://maulidaaa-api-crop-soil.hf.space/analyze';
            $response = Http::attach(
                'image', file_get_contents($validatedData['image']), 'image.jpg'
            )->post($apiUrl, [
                'lat' => $validatedData['latitude'],
                'lon' => $validatedData['longitude'],
            ]);

            Log::info('API response status', ['status' => $response->status()]);

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

                // Daftar tanaman dan file gambar sesuai urutan abjad/angka
                $plantImageMap = [
                    'adzukibeans'    => '1.png',
                    'apple'          => '2.png',
                    'arugula'        => '3.png',
                    'asparagus'      => '4.png',
                    'banana'         => '5.png',
                    'beet'           => '6.png',
                    'blackgram'      => '7.png',
                    'broccoli'       => '8.png',
                    'cabbage'        => '9.png',
                    'cauliflowers'   => '10.png',
                    'chard'          => '11.png',
                    'chickpea'       => '12.png',
                    'chillipeppers'  => '13.png',
                    'coconut'        => '14.png',
                    'coffee'         => '15.png',
                    'cotton'         => '16.png',
                    'cress'          => '17.png',
                    'cucumbers'      => '18.png',
                    'eggplants'      => '19.png',
                    'endive'         => '20.png',
                    'grapes'         => '21.png',
                    'greenpeas'      => '22.png',
                    'groundnut'      => '23.png',
                    'jute'           => '24.png',
                    'kale'           => '25.png',
                    'kidneybeans'    => '26.png',
                    'lentil'         => '27.png',
                    'lettuce'        => '28.png',
                    'maize'          => '29.png',
                    'mango'          => '30.png',
                    'millet'         => '31.png',
                    'mothbeans'      => '32.png',
                    'mungbean'       => '33.png',
                    'muskmelon'      => '34.png',
                    'orange'         => '35.png',
                    'papaya'         => '36.png',
                    'peas'           => '37.png',
                    'pigeonpeas'     => '38.png',
                    'pomegranate'    => '39.png',
                    'potatoes'       => '40.png',
                    'radicchio'      => '41.png',
                    'rice'           => '42.png',
                    'rubber'         => '43.png',
                    'spinach'        => '44.png',
                    'strawberry'     => '45.png',
                    'sugarcane'      => '46.png',
                    'tea'            => '47.png',
                    'tobacco'        => '48.png',
                    'tomatoes'       => '49.png',
                    'watermelon'     => '50.png',
                    'wheat'          => '51.png',
                ];

                foreach ($plants as &$plant) {
                    $plantName = strtolower(str_replace(' ', '', $plant['name'] ?? ''));
                    $imageFile = $plantImageMap[$plantName] ?? null;
                    $plant['image'] = $imageFile ? asset('plant/' . $imageFile) : null;
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

                if ($request->user_id) {
                    Log::info('User authenticated, saving data', ['user_id' => $request->user_id]);
                    $plantRecomendation = new \App\Models\PlantRecomendation();
                    $plantRecomendation->user_id = $request->user_id;
                    $plantRecomendation->save();

                    $soilData = $data['nearest_soil_data'] ?? [];
                    $weather = $data['weather'] ?? [];
                    $soil = new \App\Models\Soil();
                    $soil->soil_type = $data['Class_Name'] ?? null;
                    $soil->accuracy = $data['soil_prediction_accuracy'] ?? 0.00;
                    $soil->plant_recomendation_id = $plantRecomendation->id;
                    $soil->K = $soilData['K'] ?? null;
                    $soil->P = $soilData['P'] ?? null;
                    $soil->N = $soilData['N'] ?? null;
                    $soil->pH = $soilData['pH'] ?? null;
                    $soil->latitude = $soilData['latitude'] ?? $validatedData['latitude'];
                    $soil->longitude = $soilData['longitude'] ?? $validatedData['longitude'];
                    $soil->location = $soilData['location_name'] ?? 'Unknown';
                    $soil->humidity = $weather['humidity'] ?? null;
                    $soil->temperature = $weather['temperature'] ?? null;
                    $soil->save();

                    Log::info('Soil data saved', ['soil_id' => $soil->id]);

                    if (isset($data['farming_tips']) && is_array($data['farming_tips'])) {
                        foreach ($data['farming_tips'] as $plantData) {
                            if (isset($plantData['Nama Tanaman'], $plantData['Manfaat'], $plantData['Tips Menanam'])) {
                                $name = $plantData['Nama Tanaman'];
                                $accuracy = $recommendationMap[$name] ?? 0.00;
                                $plantNameKey = strtolower(str_replace(' ', '', $name));
                                $imageFile = $plantImageMap[$plantNameKey] ?? null;
                                $imageUrl = $imageFile ? asset('plant/' . $imageFile) : null;

                                $plant = \App\Models\Plant::create([
                                    'name' => $name,
                                    'accuracy' => $accuracy,
                                    'plant_recomendation_id' => $plantRecomendation->id,
                                    'benefits' => $plantData['Manfaat'],
                                    'planting_tips' => $plantData['Tips Menanam'],
                                    'image' => $imageUrl, // simpan path relatif di DB
                                ]);
                                Log::info('Plant data saved', ['plant_id' => $plant->id]);
                            }
                        }
                    }
                } else {
                    Log::info('User not authenticated, data not saved');
                }

                return response()->json($responseData, 200);
            } else {
                Log::error('API request failed', ['status' => $response->status(), 'body' => $response->body()]);
                return response()->json(['message' => 'Failed to analyze image'], 500);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error', ['errors' => $e->errors()]);
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Unexpected error', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Unexpected error occurred', 'error' => $e->getMessage()], 500);
        }
    }
}