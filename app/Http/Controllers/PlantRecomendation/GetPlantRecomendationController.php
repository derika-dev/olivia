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
                    'adzukibeans'    => '1.jpg',
                    'apple'          => '2.jpg',
                    'arugula'        => '3.jpg',
                    'asparagus'      => '4.jpg',
                    'banana'         => '5.jpg',
                    'beet'           => '6.jpg',
                    'blackgram'      => '7.jpg',
                    'broccoli'       => '8.jpg',
                    'cabbage'        => '9.jpg',
                    'cauliflowers'   => '10.jpg',
                    'chard'          => '11.jpg',
                    'chickpea'       => '12.jpg',
                    'chillipeppers'  => '13.jpg',
                    'coconut'        => '14.jpg',
                    'coffee'         => '15.jpg',
                    'cotton'         => '16.jpg',
                    'cress'          => '17.jpg',
                    'cucumbers'      => '18.jpg',
                    'eggplants'      => '19.jpg',
                    'endive'         => '20.jpg',
                    'grapes'         => '21.jpg',
                    'greenpeas'      => '22.jpg',
                    'groundnut'      => '23.jpg',
                    'jute'           => '24.jpg',
                    'kale'           => '25.jpg',
                    'kidneybeans'    => '26.jpg',
                    'lentil'         => '27.jpg',
                    'lettuce'        => '28.jpg',
                    'maize'          => '29.jpg',
                    'mango'          => '30.jpg',
                    'millet'         => '31.jpg',
                    'mothbeans'      => '32.jpg',
                    'mungbean'       => '33.jpg',
                    'muskmelon'      => '34.jpg',
                    'orange'         => '35.jpg',
                    'papaya'         => '36.jpg',
                    'peas'           => '37.jpg',
                    'pigeonpeas'     => '38.jpg',
                    'pomegranate'    => '39.jpg',
                    'potatoes'       => '40.jpg',
                    'radicchio'      => '41.jpg',
                    'rice'           => '42.jpg',
                    'rubber'         => '43.jpg',
                    'spinach'        => '44.jpg',
                    'strawberry'     => '45.jpg',
                    'sugarcane'      => '46.jpg',
                    'tea'            => '47.jpg',
                    'tobacco'        => '48.jpg',
                    'tomatoes'       => '49.jpg',
                    'watermelon'     => '50.jpg',
                    'wheat'          => '51.jpg',
                ];

                foreach ($plants as &$plant) {
                    $plantName = strtolower(str_replace(' ', '', $plant['name'] ?? ''));
                    $imageFile = $plantImageMap[$plantName] ?? null;
                    $plant['image'] = $imageFile ? asset('storage/plant/' . $imageFile) : null;
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
                                $imageUrl = $imageFile ? 'plant/' . $imageFile : null;

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