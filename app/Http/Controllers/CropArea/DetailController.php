<?php

namespace App\Http\Controllers\CropArea;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DetailController extends Controller
{
    public function detail($id)
    {
        $cropArea = \App\Models\CropAreas::with(['crop', 'province'])->find($id);
        
        if (!$cropArea) {
            return response()->json(['message' => 'Crop area not found'], 404);
        }

        return response()->json([
            'id' => $cropArea->id,
            'crop' => $cropArea->crop->name,
            'province' => $cropArea->province->name,
            'area' => $cropArea->area,
            'latitude' => $cropArea->latitude, // Assuming latitude is a field in CropAreas
            'longitude' => $cropArea->longitude, // Assuming longitude is a field in CropAreas
        ]);
    }
}
