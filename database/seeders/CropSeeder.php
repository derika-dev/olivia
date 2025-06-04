<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Crops;

class CropSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $crops = [
            ['id' => 1, 'name' => 'Kelapa Sawit', 'type' => 'Perkebunan'],
            ['id' => 2, 'name' => 'Kelapa', 'type' => 'Perkebunan'],
            ['id' => 3, 'name' => 'Karet', 'type' => 'Perkebunan'],
            ['id' => 4, 'name' => 'Kopi', 'type' => 'Perkebunan'],
            ['id' => 5, 'name' => 'Kakao', 'type' => 'Perkebunan'],
            ['id' => 6, 'name' => 'Tebu', 'type' => 'Perkebunan'],
            ['id' => 7, 'name' => 'Teh', 'type' => 'Perkebunan'],
            ['id' => 8, 'name' => 'Tembakau', 'type' => 'Perkebunan'],
            ['id' => 9, 'name' => 'Padi', 'type' => 'Pangan'],
        ];

        foreach ($crops as $crop) {
            Crops::updateOrCreate(
                ['id' => $crop['id']],
                ['name' => $crop['name'], 'type' => $crop['type']]
            );
        }
    }
}
