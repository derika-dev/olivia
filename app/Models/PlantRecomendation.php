<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weather;

class PlantRecomendation extends Model
{
    protected $fillable = [
        'user_id',
    ];

    public function soil()
    {
        return $this->hasOne(Soil::class);
    }

    public function plants()
    {
        return $this->hasMany(Plant::class);
    }

    public function weather()
    {
        return $this->hasOne(Weather::class);
    }
}