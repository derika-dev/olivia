<?php

namespace App\Http\Controllers\PlantRecomendation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HistoryPlantRecomendationController extends Controller
{
    public function index(Request $request)
    {
        // Check if the user is authenticated
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Get the authenticated user's plant recommendations
        $plantRecommendations = $request->user()->plantRecomendations()
            ->with(['soil', 'plants', 'weather'])
            ->orderByDesc('created_at')
            ->get();

        // Kembalikan sebagai halaman Inertia, bukan JSON
        return inertia('RiwayatAnalisis', [
            'histories' => $plantRecommendations
        ]);
    }
    public function show(Request $request, $id)
    {
        // Check if the user is authenticated
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Find the plant recommendation by ID
        $plantRecommendation = $request->user()->plantRecomendations()
            ->with(['soils', 'plants'])
            ->find($id);

        // If not found, return a 404 response
        if (!$plantRecommendation) {
            return response()->json(['message' => 'Plant recommendation not found'], 404);
        }

        return response()->json($plantRecommendation);
    }
    public function destroy(Request $request, $id)
    {
        // Check if the user is authenticated
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Find the plant recommendation by ID
        $plantRecommendation = $request->user()->plantRecomendations()->find($id);

        // If not found, return a 404 response
        if (!$plantRecommendation) {
            return response()->json(['message' => 'Plant recommendation not found'], 404);
        }

        // Delete the plant recommendation
        $plantRecommendation->delete();

        return response()->json(['message' => 'Plant recommendation deleted successfully']);
    }
}
