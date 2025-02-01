<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'technologies'
    ];

    protected $casts = [
        'technologies' => 'array',
        'price' => 'decimal:2'
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
} 