<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'amount' => fake()->randomFloat(2, 10, 1000),
            'payment_method' => fake()->randomElement(['credit_card', 'bank_transfer', 'cash']),
            'payment_status' => fake()->randomElement(['pending', 'completed', 'failed']),
            'payment_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'user_note' => fake()->sentence(),
        ];
    }
} 