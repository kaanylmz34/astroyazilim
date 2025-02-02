<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 10, 1000),
            'technologies' => fake()->randomElements(['PHP', 'Laravel', 'React', 'Vue', 'Node.js', 'MySQL', 'Docker', 'AWS'], rand(1, 3)),
        ];
    }
} 