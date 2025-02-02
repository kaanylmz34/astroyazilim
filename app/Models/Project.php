<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'technologies',
        'user_id',
        'due_date',
    ];

    protected $casts = [
        'technologies' => 'array',
        'price' => 'decimal:2',
        'due_date' => 'datetime',
    ];

    protected $attributes = [
        'status' => 'pending',
    ];

    public function attachments(): HasMany
    {
        return $this->hasMany(ProjectAttachment::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(ProjectTask::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
} 