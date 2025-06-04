<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Crops extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'crops';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Get the crop areas associated with the crop.
     */
    public function cropAreas()
    {
        return $this->hasMany(CropAreas::class);
    }
}
