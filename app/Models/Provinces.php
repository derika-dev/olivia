<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provinces extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'provinces';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'latitude', 'longitude', 'soil'];

    /**
     * Get the crop areas associated with the province.
     */
    public function cropAreas()
    {
        return $this->hasMany(CropAreas::class);
    }

    /**
     * Get the plant potensions associated with the province.
     */
    public function plantPotensions()
    {
        return $this->hasMany(PlantPotensionProvice::class);
    }
}
