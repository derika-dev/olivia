<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CropAreas extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'crop_areas';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['crop_id', 'province_id', 'area', 'year'];

    /**
     * Get the crop associated with the crop area.
     */
    public function crop()
    {
        return $this->belongsTo(Crops::class);
    }

    /**
     * Get the province associated with the crop area.
     */
    public function province()
    {
        return $this->belongsTo(Provinces::class);
    }
}
