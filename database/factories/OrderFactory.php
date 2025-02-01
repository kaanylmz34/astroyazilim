<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'product_id' => fake()->numberBetween(1, 20), // 20 ürün oluşturulduğu için
            'invoice_id' => null, // seeder'da oluşturulacak
            'order_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'cancelled']),
        ];
    }
} 