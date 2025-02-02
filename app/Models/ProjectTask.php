<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectTask extends Model
{
    protected $fillable = [
        'project_id',
        'name',
        'description',
        'status'
    ];

    protected $casts = [
        'status' => 'string'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
} 