<?php

use App\Http\Controllers\PlantRecomendation\GetPlantRecomendationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Message\SendMessageController;
// use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\CropArea\MarkerController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/plant_recomendation/analyze', [GetPlantRecomendationController::class, 'store']);


    Route::post('/message/send', SendMessageController::class);

Route::prefix('disease')->group(function () {
    Route::post('/analyze', [\App\Http\Controllers\Disease\ResultDiseaseController::class, 'analyze']);
});

Route::prefix('crop_area')->group(function () {
    Route::get('/marker', [MarkerController::class, 'marker']);
    Route::get('/{id}', [\App\Http\Controllers\CropArea\DetailController::class, 'detail']);
    Route::get('/marker/province/{provinceId}', [MarkerController::class, 'markerByProvince']);
    Route::get('/marker/crop/{cropId}', [MarkerController::class, 'markerByCrop']);
    Route::get('/marker/crop/{cropId}/province/{provinceId}', [MarkerController::class, 'markerByCropAndProvince']);
    Route::post('/soil_analysis', [MarkerController::class, 'soilAnalysis']);
});
