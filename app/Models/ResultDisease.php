<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResultDisease extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'disease_id',
        'image_path', 
        'accuracy',
    ];

    /**
     * Get the disease associated with the result disease.
     */
    public function disease()
    {
        return $this->belongsTo(Diseases::class);
    }
}
