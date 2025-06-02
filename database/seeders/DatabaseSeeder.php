<?php

namespace Database\Seeders;

use App\Models\Provinces;
use App\Models\User;
use Database\Seeders\CropArea\CropId1AreaSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\CropArea\CropId2AreaSeeder;
use Database\Seeders\CropArea\CropId3AreaSeeder;
use Illuminate\Database\Seeder;
use Database\Seeders\DiseaseSeeder;
use Database\Seeders\UseSeeder;
use Database\Seeders\ProvinceSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            DiseaseSeeder::class,
            UseSeeder::class,
            CropSeeder::class,      // <-- Tambahkan ini
            ProvinceSeeder::class,
            CropId1AreaSeeder::class,
            CropId2AreaSeeder::class,
            CropId3AreaSeeder::class,
        ]);
    }

    
}
