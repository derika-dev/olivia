<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\PlantRecomendation\GetPlantRecomendationController;
use App\Http\Controllers\Message\SendMessageController;

Route::get('', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::get('/analisis-potensi-tanaman', function () {
    return Inertia::render('Analisys'); 
})->middleware(['auth', 'verified'])->name('analisis.potensi');

Route::get('/analisis-penyakit-tanaman', function () {
    return Inertia::render('DeteksiPenyakitTanaman'); 
})->middleware(['auth', 'verified'])->name('analisis.penyakit');

Route::post('/hasil-analisis', function (Request $request) {
return Inertia::render('AnalysisDisease', [
    'alamat' => $request->input('alamat'),
    'fileUrl' => $request->file('file') ? $request->file('file')->store('uploads', 'public') : null,
]);
});

Route::get('/prediksi-musim-tanam', function () {
    return Inertia::render('PrediksiPanen'); 
})->middleware(['auth', 'verified'])->name('deteksi.panen');

Route::middleware('auth')->group(function () {
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

// Route untuk halaman ubah password (Keamanan)
Route::get('/profile/security', function () {
    return Inertia::render('Profile/EditPassword');
})->name('profile.password');

// Route untuk proses update password
Route::put('/password', [\App\Http\Controllers\Auth\PasswordController::class, 'update'])->name('password.update');
});


Route::post('/plant_recomendation/analyze', [GetPlantRecomendationController::class, 'store']);

Route::middleware('auth')->group(function () {
Route::get('/history-plant-recomendation', [App\Http\Controllers\PlantRecomendation\HistoryPlantRecomendationController::class, 'index'])->name('history.plant.recomendation.index');
Route::get('/history-plant-recomendation/{id}', [App\Http\Controllers\PlantRecomendation\HistoryPlantRecomendationController::class, 'show'])->name('history.plant.recomendation.show');
Route::delete('/history-plant-recomendation/{id}', [App\Http\Controllers\PlantRecomendation\HistoryPlantRecomendationController::class, 'destroy'])->name('history.plant.recomendation.destroy');
Route::get('/riwayat-analisis', [\App\Http\Controllers\PlantRecomendation\HistoryPlantRecomendationController::class, 'index'])
    ->name('riwayat.analisis');
Route::get('/riwayat-deteksi', [\App\Http\Controllers\Disease\ResultDiseaseController::class, 'index'])
    ->name('riwayat.deteksi');
Route::delete('/riwayat-deteksi/{id}', [\App\Http\Controllers\Disease\ResultDiseaseController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('riwayat.deteksi.destroy');
});

Route::prefix('plant_recomendation')->group(function () {
Route::post('/analyze', [GetPlantRecomendationController::class, 'store'])->name('plant.recomendation.analyze');
});

Route::get('/peta-komoditas-pertanian', function () {
    return Inertia::render('KomoditasPertanian');
})->middleware(['auth', 'verified'])->name('peta-komoditas.pertanian');


require __DIR__.'/auth.php';
