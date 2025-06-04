<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    protected $fillable = [
        'name',
        'accuracy',
        'plant_recomendation_id',
        'benefits',
        'planting_tips',
        'image',
    ];

    public function plantRecomendation()
    {
        return $this->belongsTo(PlantRecomendation::class);
    }
}
