<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Diseases; // Assuming the model is in App\Models namespace

class DiseaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $diseases = [
            [
                'name' => 'Bacterial Leaf Blight',
                'description' => 'Daun menguning dari ujung, menyebar ke pangkal, lalu mengering. Disebabkan oleh bakteri Xanthomonas oryzae.',
                'treatment' => 'Gunakan varietas tahan, hindari pemupukan nitrogen berlebihan, dan gunakan bakterisida seperti streptomycin jika perlu.'
            ],
            [
                'name' => 'Brown Spot',
                'description' => 'Bercak coklat bulat pada daun, menyebabkan gabah hampa. Disebabkan oleh jamur Bipolaris oryzae.',
                'treatment' => 'Gunakan benih sehat, perbaiki drainase, semprot fungisida seperti mancozeb atau propineb.'
            ],
            [
                'name' => 'Healthy Rice Leaf',
                'description' => 'Daun sehat tanpa bercak atau kerusakan.',
                'treatment' => 'Pertahankan pemupukan berimbang dan pengendalian hama rutin.'
            ],
            [
                'name' => 'Leaf Blast',
                'description' => 'Bercak belah ketupat pada daun. Bisa menyerang leher malai. Disebabkan oleh jamur Magnaporthe oryzae.',
                'treatment' => 'Gunakan varietas tahan blas, semprot fungisida tricyclazole, hindari nitrogen berlebih.'
            ],
            [
                'name' => 'Leaf scald',
                'description' => 'Bercak coklat seperti terbakar di tepi daun. Disebabkan oleh jamur Microdochium oryzae.',
                'treatment' => 'Jaga sanitasi lahan, buang daun terinfeksi, semprot fungisida seperti mancozeb bila perlu.'
            ],
            [
                'name' => 'Narrow Brown Leaf Spot',
                'description' => 'Bercak sempit dan memanjang berwarna coklat pada daun. Dapat menurunkan hasil panen jika parah.',
                'treatment' => 'Gunakan varietas tahan, jaga kondisi drainase, dan semprot fungisida jika diperlukan.'
            ],
            [
                'name' => 'Neck_Blast',
                'description' => 'Infeksi pada leher malai yang menyebabkan bulir tidak terbentuk. Bentuk lanjut dari Leaf Blast.',
                'treatment' => 'Gunakan varietas tahan blas, hindari pemupukan nitrogen berlebihan, semprot fungisida sistemik seperti tricyclazole.'
            ],
            [
                'name' => 'Rice Hispa',
                'description' => 'Serangan hama kumbang kecil yang menyebabkan daun tampak seperti kerangka karena jaringannya dimakan.',
                'treatment' => 'Kendalikan dengan insektisida seperti carbaryl, jaga rotasi tanaman dan pengamatan rutin.'
            ],
            [
                'name' => 'Sheath Blight',
                'description' => 'Lesi memanjang pada pelepah dan batang bawah. Disebabkan oleh jamur Rhizoctonia solani.',
                'treatment' => 'Gunakan varietas toleran, jaga jarak tanam, semprot fungisida validamycin atau hexaconazole.'
            ],
        ];

        foreach ($diseases as $disease) {
            Diseases::create($disease);
        }
    }

}
