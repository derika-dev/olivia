<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CropAreas;

class CropAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cropAreas = [
            // Kelapa Sawit (crop_id: 1)
            ['id' => 1, 'crop_id' => 1, 'province_id' => 1, 'area' => 360.2, 'year' => 2015],
            ['id' => 2, 'crop_id' => 1, 'province_id' => 1, 'area' => 381.49, 'year' => 2016],
            ['id' => 3, 'crop_id' => 1, 'province_id' => 1, 'area' => 396.64, 'year' => 2017],
            ['id' => 4, 'crop_id' => 1, 'province_id' => 1, 'area' => 420.2, 'year' => 2018],
            ['id' => 5, 'crop_id' => 1, 'province_id' => 1, 'area' => 428.2, 'year' => 2019],
            ['id' => 6, 'crop_id' => 1, 'province_id' => 1, 'area' => 370.1, 'year' => 2020],
            ['id' => 7, 'crop_id' => 1, 'province_id' => 1, 'area' => 440.3, 'year' => 2021],
            ['id' => 8, 'crop_id' => 1, 'province_id' => 1, 'area' => 494.2, 'year' => 2022],
            ['id' => 9, 'crop_id' => 1, 'province_id' => 1, 'area' => 487.5, 'year' => 2023],

            // Kelapa (crop_id: 2)
            ['id' => 14, 'crop_id' => 2, 'province_id' => 1, 'area' => 107.5, 'year' => 2015],
            ['id' => 15, 'crop_id' => 2, 'province_id' => 1, 'area' => 107.39, 'year' => 2016],
            ['id' => 16, 'crop_id' => 2, 'province_id' => 1, 'area' => 103.34, 'year' => 2017],
            ['id' => 17, 'crop_id' => 2, 'province_id' => 1, 'area' => 104.8, 'year' => 2018],
            ['id' => 18, 'crop_id' => 2, 'province_id' => 1, 'area' => 106.5, 'year' => 2019],
            ['id' => 19, 'crop_id' => 2, 'province_id' => 1, 'area' => 106.3, 'year' => 2020],
            ['id' => 20, 'crop_id' => 2, 'province_id' => 1, 'area' => 101.6, 'year' => 2021],
            ['id' => 21, 'crop_id' => 2, 'province_id' => 1, 'area' => 102.2, 'year' => 2022],
            ['id' => 22, 'crop_id' => 2, 'province_id' => 1, 'area' => 102.9, 'year' => 2023],

            // Karet (crop_id: 3)
            ['id' => 27, 'crop_id' => 3, 'province_id' => 1, 'area' => 120.3, 'year' => 2015],
            ['id' => 28, 'crop_id' => 3, 'province_id' => 1, 'area' => 122.59, 'year' => 2016],
            ['id' => 29, 'crop_id' => 3, 'province_id' => 1, 'area' => 113.46, 'year' => 2017],
            ['id' => 30, 'crop_id' => 3, 'province_id' => 1, 'area' => 114, 'year' => 2018],
            ['id' => 31, 'crop_id' => 3, 'province_id' => 1, 'area' => 114.5, 'year' => 2019],
            ['id' => 32, 'crop_id' => 3, 'province_id' => 1, 'area' => 116.6, 'year' => 2020],
            ['id' => 33, 'crop_id' => 3, 'province_id' => 1, 'area' => 115.6, 'year' => 2021],
            ['id' => 34, 'crop_id' => 3, 'province_id' => 1, 'area' => 99.1, 'year' => 2022],
            ['id' => 35, 'crop_id' => 3, 'province_id' => 1, 'area' => 100.4, 'year' => 2023],

            // Kopi (crop_id: 4)
            ['id' => 40, 'crop_id' => 4, 'province_id' => 1, 'area' => 120.7, 'year' => 2015],
            ['id' => 41, 'crop_id' => 4, 'province_id' => 1, 'area' => 121.67, 'year' => 2016],
            ['id' => 42, 'crop_id' => 4, 'province_id' => 1, 'area' => 123.76, 'year' => 2017],
            ['id' => 43, 'crop_id' => 4, 'province_id' => 1, 'area' => 120.7, 'year' => 2018],
            ['id' => 44, 'crop_id' => 4, 'province_id' => 1, 'area' => 121.3, 'year' => 2019],
            ['id' => 45, 'crop_id' => 4, 'province_id' => 1, 'area' => 123.4, 'year' => 2020],
            ['id' => 46, 'crop_id' => 4, 'province_id' => 1, 'area' => 123.7, 'year' => 2021],
            ['id' => 47, 'crop_id' => 4, 'province_id' => 1, 'area' => 124.2, 'year' => 2022],
            ['id' => 48, 'crop_id' => 4, 'province_id' => 1, 'area' => 125.3, 'year' => 2023],

                        // Kakao (crop_id: 5)
            ['id' => 52, 'crop_id' => 5, 'province_id' => 1, 'area' => 43.5, 'year' => 2015],
            ['id' => 53, 'crop_id' => 5, 'province_id' => 1, 'area' => 44.7, 'year' => 2016],
            ['id' => 54, 'crop_id' => 5, 'province_id' => 1, 'area' => 45.2, 'year' => 2017],
            ['id' => 55, 'crop_id' => 5, 'province_id' => 1, 'area' => 46.1, 'year' => 2018],
            ['id' => 56, 'crop_id' => 5, 'province_id' => 1, 'area' => 46.3, 'year' => 2019],
            ['id' => 57, 'crop_id' => 5, 'province_id' => 1, 'area' => 45.8, 'year' => 2020],
            ['id' => 58, 'crop_id' => 5, 'province_id' => 1, 'area' => 44.9, 'year' => 2021],

            // Tebu (crop_id: 6)
            ['id' => 59, 'crop_id' => 6, 'province_id' => 1, 'area' => 1.2, 'year' => 2015],
            ['id' => 60, 'crop_id' => 6, 'province_id' => 1, 'area' => 1.1, 'year' => 2016],
            ['id' => 61, 'crop_id' => 6, 'province_id' => 1, 'area' => 1.0, 'year' => 2017],
            ['id' => 62, 'crop_id' => 6, 'province_id' => 1, 'area' => 1.3, 'year' => 2018],
            ['id' => 63, 'crop_id' => 6, 'province_id' => 1, 'area' => 1.5, 'year' => 2019],
            ['id' => 64, 'crop_id' => 6, 'province_id' => 1, 'area' => 1.6, 'year' => 2020],

            // Teh (crop_id: 7)
            ['id' => 65, 'crop_id' => 7, 'province_id' => 1, 'area' => 0.4, 'year' => 2015],
            ['id' => 66, 'crop_id' => 7, 'province_id' => 1, 'area' => 0.45, 'year' => 2016],
            ['id' => 67, 'crop_id' => 7, 'province_id' => 1, 'area' => 0.5, 'year' => 2017],
            ['id' => 68, 'crop_id' => 7, 'province_id' => 1, 'area' => 0.47, 'year' => 2018],
            ['id' => 69, 'crop_id' => 7, 'province_id' => 1, 'area' => 0.43, 'year' => 2019],

            // Tembakau (crop_id: 8)
            ['id' => 70, 'crop_id' => 8, 'province_id' => 1, 'area' => 0.9, 'year' => 2015],
            ['id' => 71, 'crop_id' => 8, 'province_id' => 1, 'area' => 0.8, 'year' => 2016],
            ['id' => 72, 'crop_id' => 8, 'province_id' => 1, 'area' => 0.75, 'year' => 2017],
            ['id' => 73, 'crop_id' => 8, 'province_id' => 1, 'area' => 0.7, 'year' => 2018],
            ['id' => 74, 'crop_id' => 8, 'province_id' => 1, 'area' => 0.72, 'year' => 2019],

            // Padi (crop_id: 9)
            ['id' => 75, 'crop_id' => 9, 'province_id' => 1, 'area' => 522.5, 'year' => 2015],
            ['id' => 76, 'crop_id' => 9, 'province_id' => 1, 'area' => 510.3, 'year' => 2016],
            ['id' => 77, 'crop_id' => 9, 'province_id' => 1, 'area' => 498.6, 'year' => 2017],
            ['id' => 78, 'crop_id' => 9, 'province_id' => 1, 'area' => 505.1, 'year' => 2018],
            ['id' => 79, 'crop_id' => 9, 'province_id' => 1, 'area' => 512.9, 'year' => 2019],
            ['id' => 80, 'crop_id' => 9, 'province_id' => 1, 'area' => 520.7, 'year' => 2020],
            ['id' => 81, 'crop_id' => 9, 'province_id' => 1, 'area' => 518.4, 'year' => 2021],
            ['id' => 82, 'crop_id' => 9, 'province_id' => 1, 'area' => 525.6, 'year' => 2022],
            ['id' => 83, 'crop_id' => 9, 'province_id' => 1, 'area' => 530.2, 'year' => 2023],
            ['id' => 84, 'crop_id' => 9, 'province_id' => 1, 'area' => 540.8, 'year' => 2024],

                        // Data untuk province_id = 2 (Aceh crop_id 1 - 9)
            ['id' => 85, 'crop_id' => 1, 'province_id' => 2, 'area' => 1164, 'year' => 2015],
            ['id' => 86, 'crop_id' => 1, 'province_id' => 2, 'area' => 1222.91, 'year' => 2016],
            ['id' => 87, 'crop_id' => 1, 'province_id' => 2, 'area' => 1340.35, 'year' => 2017],
            ['id' => 88, 'crop_id' => 1, 'province_id' => 2, 'area' => 1396.3, 'year' => 2018],
            ['id' => 89, 'crop_id' => 1, 'province_id' => 2, 'area' => 1427, 'year' => 2019],
            ['id' => 90, 'crop_id' => 1, 'province_id' => 2, 'area' => 1342.6, 'year' => 2020],
            ['id' => 91, 'crop_id' => 1, 'province_id' => 2, 'area' => 1461.2, 'year' => 2021],
            ['id' => 92, 'crop_id' => 1, 'province_id' => 2, 'area' => 1551.6, 'year' => 2022],
            ['id' => 93, 'crop_id' => 1, 'province_id' => 2, 'area' => 1373.3, 'year' => 2023],
            ['id' => 94, 'crop_id' => 1, 'province_id' => 2, 'area' => 1325.1, 'year' => 2024],
            ['id' => 95, 'crop_id' => 1, 'province_id' => 2, 'area' => 1285.8, 'year' => 2025],
            ['id' => 96, 'crop_id' => 1, 'province_id' => 2, 'area' => 1370.4, 'year' => 2026],
            ['id' => 97, 'crop_id' => 1, 'province_id' => 2, 'area' => 1371.9, 'year' => 2027],

            ['id' => 98, 'crop_id' => 2, 'province_id' => 2, 'area' => 113.2, 'year' => 2015],
            ['id' => 99, 'crop_id' => 2, 'province_id' => 2, 'area' => 113.49, 'year' => 2016],
            ['id' => 100, 'crop_id' => 2, 'province_id' => 2, 'area' => 86.41, 'year' => 2017],
            ['id' => 101, 'crop_id' => 2, 'province_id' => 2, 'area' => 86.6, 'year' => 2018],
            ['id' => 102, 'crop_id' => 2, 'province_id' => 2, 'area' => 85.8, 'year' => 2019],
            ['id' => 103, 'crop_id' => 2, 'province_id' => 2, 'area' => 86.4, 'year' => 2020],
            ['id' => 104, 'crop_id' => 2, 'province_id' => 2, 'area' => 110.4, 'year' => 2021],
            ['id' => 105, 'crop_id' => 2, 'province_id' => 2, 'area' => 110.8, 'year' => 2022],
            ['id' => 106, 'crop_id' => 2, 'province_id' => 2, 'area' => 111.5, 'year' => 2023],
            ['id' => 107, 'crop_id' => 2, 'province_id' => 2, 'area' => 111.6, 'year' => 2024],
            ['id' => 108, 'crop_id' => 2, 'province_id' => 2, 'area' => 110.5, 'year' => 2025],
            ['id' => 109, 'crop_id' => 2, 'province_id' => 2, 'area' => 111.2, 'year' => 2026],
            ['id' => 110, 'crop_id' => 2, 'province_id' => 2, 'area' => 111.4, 'year' => 2027],

            ['id' => 111, 'crop_id' => 3, 'province_id' => 2, 'area' => 465.3, 'year' => 2015],
            ['id' => 112, 'crop_id' => 3, 'province_id' => 2, 'area' => 473.75, 'year' => 2016],
            ['id' => 113, 'crop_id' => 3, 'province_id' => 2, 'area' => 472.14, 'year' => 2017],
            ['id' => 114, 'crop_id' => 3, 'province_id' => 2, 'area' => 423.2, 'year' => 2018],
            ['id' => 115, 'crop_id' => 3, 'province_id' => 2, 'area' => 427.4, 'year' => 2019],
            ['id' => 116, 'crop_id' => 3, 'province_id' => 2, 'area' => 450.5, 'year' => 2020],
            ['id' => 117, 'crop_id' => 3, 'province_id' => 2, 'area' => 449.5, 'year' => 2021],
            ['id' => 118, 'crop_id' => 3, 'province_id' => 2, 'area' => 408.3, 'year' => 2022],
            ['id' => 119, 'crop_id' => 3, 'province_id' => 2, 'area' => 404.7, 'year' => 2023],
            ['id' => 120, 'crop_id' => 3, 'province_id' => 2, 'area' => 396.7, 'year' => 2024],
            ['id' => 121, 'crop_id' => 3, 'province_id' => 2, 'area' => 394.1, 'year' => 2025],
            ['id' => 122, 'crop_id' => 3, 'province_id' => 2, 'area' => 379.7, 'year' => 2026],
            ['id' => 123, 'crop_id' => 3, 'province_id' => 2, 'area' => 373.1, 'year' => 2027],

                        ['id' => 124, 'crop_id' => 4, 'province_id' => 2, 'area' => 80.6, 'year' => 2015],
            ['id' => 125, 'crop_id' => 4, 'province_id' => 2, 'area' => 81.19, 'year' => 2016],
            ['id' => 126, 'crop_id' => 4, 'province_id' => 2, 'area' => 81.46, 'year' => 2017],
            ['id' => 127, 'crop_id' => 4, 'province_id' => 2, 'area' => 81.6, 'year' => 2018],
            ['id' => 128, 'crop_id' => 4, 'province_id' => 2, 'area' => 82.2, 'year' => 2019],
            ['id' => 129, 'crop_id' => 4, 'province_id' => 2, 'area' => 85.4, 'year' => 2020],
            ['id' => 130, 'crop_id' => 4, 'province_id' => 2, 'area' => 89.9, 'year' => 2021],
            ['id' => 131, 'crop_id' => 4, 'province_id' => 2, 'area' => 93.7, 'year' => 2022],
            ['id' => 132, 'crop_id' => 4, 'province_id' => 2, 'area' => 95.4, 'year' => 2023],
            ['id' => 133, 'crop_id' => 4, 'province_id' => 2, 'area' => 95.5, 'year' => 2024],
            ['id' => 134, 'crop_id' => 4, 'province_id' => 2, 'area' => 95.7, 'year' => 2025],
            ['id' => 135, 'crop_id' => 4, 'province_id' => 2, 'area' => 98, 'year' => 2026],
            ['id' => 136, 'crop_id' => 4, 'province_id' => 2, 'area' => 98.6, 'year' => 2027],

            ['id' => 137, 'crop_id' => 5, 'province_id' => 2, 'area' => 93.1, 'year' => 2015],
            ['id' => 138, 'crop_id' => 5, 'province_id' => 2, 'area' => 80.49, 'year' => 2016],
            ['id' => 139, 'crop_id' => 5, 'province_id' => 2, 'area' => 76.49, 'year' => 2017],
            ['id' => 140, 'crop_id' => 5, 'province_id' => 2, 'area' => 65.6, 'year' => 2018],
            ['id' => 141, 'crop_id' => 5, 'province_id' => 2, 'area' => 66, 'year' => 2019],
            ['id' => 142, 'crop_id' => 5, 'province_id' => 2, 'area' => 68.3, 'year' => 2020],
            ['id' => 143, 'crop_id' => 5, 'province_id' => 2, 'area' => 60.5, 'year' => 2021],
            ['id' => 144, 'crop_id' => 5, 'province_id' => 2, 'area' => 57.2, 'year' => 2022],
            ['id' => 145, 'crop_id' => 5, 'province_id' => 2, 'area' => 54.5, 'year' => 2023],
            ['id' => 146, 'crop_id' => 5, 'province_id' => 2, 'area' => 54.6, 'year' => 2024],
            ['id' => 147, 'crop_id' => 5, 'province_id' => 2, 'area' => 54.7, 'year' => 2025],
            ['id' => 148, 'crop_id' => 5, 'province_id' => 2, 'area' => 53.1, 'year' => 2026],
            ['id' => 149, 'crop_id' => 5, 'province_id' => 2, 'area' => 53.4, 'year' => 2027],

            ['id' => 150, 'crop_id' => 6, 'province_id' => 2, 'area' => 10, 'year' => 2015],
            ['id' => 151, 'crop_id' => 6, 'province_id' => 2, 'area' => 11.03, 'year' => 2016],
            ['id' => 152, 'crop_id' => 6, 'province_id' => 2, 'area' => 9.54, 'year' => 2017],
            ['id' => 153, 'crop_id' => 6, 'province_id' => 2, 'area' => 8.5, 'year' => 2018],
            ['id' => 154, 'crop_id' => 6, 'province_id' => 2, 'area' => 7.8, 'year' => 2019],
            ['id' => 155, 'crop_id' => 6, 'province_id' => 2, 'area' => 7.7, 'year' => 2020],
            ['id' => 156, 'crop_id' => 6, 'province_id' => 2, 'area' => 4.5, 'year' => 2021],
            ['id' => 157, 'crop_id' => 6, 'province_id' => 2, 'area' => 6.2, 'year' => 2022],
            ['id' => 158, 'crop_id' => 6, 'province_id' => 2, 'area' => 6.8, 'year' => 2023],
            ['id' => 159, 'crop_id' => 6, 'province_id' => 2, 'area' => 5.6, 'year' => 2024],
            ['id' => 160, 'crop_id' => 6, 'province_id' => 2, 'area' => 6.1, 'year' => 2025],
            ['id' => 161, 'crop_id' => 6, 'province_id' => 2, 'area' => 8, 'year' => 2026],
            ['id' => 162, 'crop_id' => 6, 'province_id' => 2, 'area' => 7.6, 'year' => 2027],

            ['id' => 163, 'crop_id' => 7, 'province_id' => 2, 'area' => 5.1, 'year' => 2015],
            ['id' => 164, 'crop_id' => 7, 'province_id' => 2, 'area' => 4.32, 'year' => 2016],
            ['id' => 165, 'crop_id' => 7, 'province_id' => 2, 'area' => 4.32, 'year' => 2017],
            ['id' => 166, 'crop_id' => 7, 'province_id' => 2, 'area' => 5.8, 'year' => 2018],
            ['id' => 167, 'crop_id' => 7, 'province_id' => 2, 'area' => 4.2, 'year' => 2019],
            ['id' => 168, 'crop_id' => 7, 'province_id' => 2, 'area' => 4.4, 'year' => 2020],
            ['id' => 169, 'crop_id' => 7, 'province_id' => 2, 'area' => 4.3, 'year' => 2021],
            ['id' => 170, 'crop_id' => 7, 'province_id' => 2, 'area' => 4.2, 'year' => 2022],
            ['id' => 171, 'crop_id' => 7, 'province_id' => 2, 'area' => 4.3, 'year' => 2023],
            ['id' => 172, 'crop_id' => 7, 'province_id' => 2, 'area' => 6.1, 'year' => 2024],
            ['id' => 173, 'crop_id' => 7, 'province_id' => 2, 'area' => 4.2, 'year' => 2025],
            ['id' => 174, 'crop_id' => 7, 'province_id' => 2, 'area' => 3.5, 'year' => 2026],
            ['id' => 175, 'crop_id' => 7, 'province_id' => 2, 'area' => 3.5, 'year' => 2027],

            ['id' => 176, 'crop_id' => 8, 'province_id' => 2, 'area' => 2.9, 'year' => 2015],
            ['id' => 177, 'crop_id' => 8, 'province_id' => 2, 'area' => 2.98, 'year' => 2016],
            ['id' => 178, 'crop_id' => 8, 'province_id' => 2, 'area' => 2.96, 'year' => 2017],
            ['id' => 179, 'crop_id' => 8, 'province_id' => 2, 'area' => 2.9, 'year' => 2018],
            ['id' => 180, 'crop_id' => 8, 'province_id' => 2, 'area' => 1, 'year' => 2019],
            ['id' => 181, 'crop_id' => 8, 'province_id' => 2, 'area' => 1, 'year' => 2020],
            ['id' => 182, 'crop_id' => 8, 'province_id' => 2, 'area' => 1.4, 'year' => 2021],
            ['id' => 183, 'crop_id' => 8, 'province_id' => 2, 'area' => 1.6, 'year' => 2022],
            ['id' => 184, 'crop_id' => 8, 'province_id' => 2, 'area' => 1.7, 'year' => 2023],
            ['id' => 185, 'crop_id' => 8, 'province_id' => 2, 'area' => 1.8, 'year' => 2024],
            ['id' => 186, 'crop_id' => 8, 'province_id' => 2, 'area' => 1.9, 'year' => 2025],
            ['id' => 187, 'crop_id' => 8, 'province_id' => 2, 'area' => 2.0, 'year' => 2026],
            ['id' => 188, 'crop_id' => 8, 'province_id' => 2, 'area' => 2.1, 'year' => 2027],

            ['id' => 189, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.0, 'year' => 2015],
            ['id' => 190, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.0, 'year' => 2016],
            ['id' => 191, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.0, 'year' => 2017],
            ['id' => 192, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.1, 'year' => 2018],
            ['id' => 193, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.3, 'year' => 2019],
            ['id' => 194, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.3, 'year' => 2020],
            ['id' => 195, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.3, 'year' => 2021],
            ['id' => 196, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.4, 'year' => 2022],
            ['id' => 197, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.5, 'year' => 2023],
            ['id' => 198, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.7, 'year' => 2024],
            ['id' => 199, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.8, 'year' => 2025],
            ['id' => 200, 'crop_id' => 9, 'province_id' => 2, 'area' => 2.9, 'year' => 2026],
            ['id' => 201, 'crop_id' => 9, 'province_id' => 2, 'area' => 3.0, 'year' => 2027],
        ];

        foreach ($cropAreas as $cropArea) {
            CropAreas::updateOrCreate(
                ['id' => $cropArea['id']],
                [
                    'crop_id' => $cropArea['crop_id'],
                    'province_id' => $cropArea['province_id'],
                    'area' => $cropArea['area'],
                    'year' => $cropArea['year']
                ]
            );
        }
    }
}
