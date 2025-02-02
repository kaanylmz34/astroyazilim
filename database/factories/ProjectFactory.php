<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition()
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 10, 1000),
            'technologies' => fake()->randomElements(['PHP', 'Laravel', 'React', 'Vue', 'Node.js', 'MySQL', 'Docker', 'AWS'], rand(1, 3)),
            'user_id' => null,
        ];
    }
} 