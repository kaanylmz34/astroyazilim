<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'payment_id' => Payment::factory(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(), 
            'identification_number' => fake()->numerify('###########'),
            'company_name' => fake()->optional()->company(),
            'address' => fake()->address(),
            'invoice_date' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
} 