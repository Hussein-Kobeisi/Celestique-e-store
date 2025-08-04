<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name'              => $this->faker->name(),
            'email'             => $this->faker->unique()->safeEmail(),
            'mobile'            => $this->faker->optional()->regexify('[0-9]{10,15}'),
            'password'          => Hash::make('password'),
            'role'              => $this->faker->numberBetween(0, 1),
            'total_orders'      => $this->faker->numberBetween(0, 100),
            'total_money_spent' => $this->faker->numberBetween(0, 10000),
            'created_at'        => now(),
            'updated_at'        => now(),
        ];
    }
}
