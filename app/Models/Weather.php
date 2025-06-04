<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Weather extends Model
{
    protected $fillable = [
        // tambahkan kolom yang sesuai, misal:
        'plant_recomendation_id',
        'temperature',
        'humidity',
        // dst
    ];

    public function plantRecomendation()
    {
        return $this->belongsTo(PlantRecomendation::class);
    }
}
