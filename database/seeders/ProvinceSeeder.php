<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Provinces;
use Illuminate\Support\Arr;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $soilTypes = [
            'images/Black_Soil.jpg',
            'images/Cinder_Soil.jpg',
            'images/Laterite_Soil.jpg',
            'images/Peat_Soil.jpg',
            'images/Yellow_Soil.jpg',
        ];

        $provinces = [
            ['id' => 1, 'name' => 'ACEH', 'latitude' => 4.695135, 'longitude' => 96.749399],
            ['id' => 2, 'name' => 'SUMATERA UTARA', 'latitude' => 2.115354, 'longitude' => 99.545097],
            ['id' => 3, 'name' => 'SUMATERA BARAT', 'latitude' => -0.739939, 'longitude' => 100.800005],
            ['id' => 4, 'name' => 'RIAU', 'latitude' => 0.293347, 'longitude' => 101.706829],
            ['id' => 5, 'name' => 'JAMBI', 'latitude' => -1.485183, 'longitude' => 102.438058],
            ['id' => 6, 'name' => 'SUMATERA SELATAN', 'latitude' => -3.319437, 'longitude' => 103.914399],
            ['id' => 7, 'name' => 'BENGKULU', 'latitude' => -3.792845, 'longitude' => 102.260764],
            ['id' => 8, 'name' => 'LAMPUNG', 'latitude' => -4.558584, 'longitude' => 105.406807],
            ['id' => 9, 'name' => 'KEPULAUAN BANGKA BELITUNG', 'latitude' => -2.741051, 'longitude' => 106.440587],
            ['id' => 10, 'name' => 'KEPULAUAN RIAU', 'latitude' => 3.945651, 'longitude' => 108.142866],
            ['id' => 11, 'name' => 'DKI JAKARTA', 'latitude' => -6.208763, 'longitude' => 106.845599],
            ['id' => 12, 'name' => 'JAWA BARAT', 'latitude' => -6.903449, 'longitude' => 107.573116],
            ['id' => 13, 'name' => 'JAWA TENGAH', 'latitude' => -7.150975, 'longitude' => 110.140259],
            ['id' => 14, 'name' => 'DI YOGYAKARTA', 'latitude' => -7.875384, 'longitude' => 110.426208],
            ['id' => 15, 'name' => 'JAWA TIMUR', 'latitude' => -7.536064, 'longitude' => 112.238401],
            ['id' => 16, 'name' => 'BANTEN', 'latitude' => -6.405817, 'longitude' => 106.064018],
            ['id' => 17, 'name' => 'BALI', 'latitude' => -8.340539, 'longitude' => 115.091949],
            ['id' => 18, 'name' => 'NUSA TENGGARA BARAT', 'latitude' => -8.652933, 'longitude' => 117.361647],
            ['id' => 19, 'name' => 'NUSA TENGGARA TIMUR', 'latitude' => -8.657381, 'longitude' => 121.079371],
            ['id' => 20, 'name' => 'KALIMANTAN BARAT', 'latitude' => 0.132296, 'longitude' => 111.096955],
            ['id' => 21, 'name' => 'KALIMANTAN TENGAH', 'latitude' => -1.681488, 'longitude' => 113.382354],
            ['id' => 22, 'name' => 'KALIMANTAN SELATAN', 'latitude' => -3.092641, 'longitude' => 115.283758],
            ['id' => 23, 'name' => 'KALIMANTAN TIMUR', 'latitude' => 0.538658, 'longitude' => 116.419389],
            ['id' => 24, 'name' => 'KALIMANTAN UTARA', 'latitude' => 3.073092, 'longitude' => 116.041388],
            ['id' => 25, 'name' => 'SULAWESI UTARA', 'latitude' => 1.430025, 'longitude' => 124.738502],
            ['id' => 26, 'name' => 'SULAWESI TENGAH', 'latitude' => -1.430025, 'longitude' => 121.445617],
            ['id' => 27, 'name' => 'SULAWESI SELATAN', 'latitude' => -3.668799, 'longitude' => 119.974053],
            ['id' => 28, 'name' => 'SULAWESI TENGGARA', 'latitude' => -4.143451, 'longitude' => 122.174605],
            ['id' => 29, 'name' => 'GORONTALO', 'latitude' => 0.699937, 'longitude' => 122.446723],
            ['id' => 30, 'name' => 'SULAWESI BARAT', 'latitude' => -2.844137, 'longitude' => 119.232078],
            ['id' => 31, 'name' => 'MALUKU', 'latitude' => -3.238461, 'longitude' => 130.145273],
            ['id' => 32, 'name' => 'MALUKU UTARA', 'latitude' => 1.570999, 'longitude' => 127.808769],
            ['id' => 33, 'name' => 'PAPUA BARAT', 'latitude' => -1.336115, 'longitude' => 133.174716],
            ['id' => 34, 'name' => 'PAPUA', 'latitude' => -4.269928, 'longitude' => 138.080352],
        ];

        foreach ($provinces as $province) {
            Provinces::updateOrCreate(
                ['id' => $province['id']],
                [
                    'name' => $province['name'],
                    'latitude' => $province['latitude'],
                    'longitude' => $province['longitude'],
                    'soil' => Arr::random($soilTypes),
                ]
            );
        }
    }
}
