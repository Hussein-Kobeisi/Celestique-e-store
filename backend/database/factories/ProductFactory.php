<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 1, 1000),
            'image_url' => $this->faker->optional()->imageUrl(),
            'stock' => $this->faker->numberBetween(0, 1000),
            'category' => $this->faker->randomElement(['ring', 'earring', 'necklace', 'bracelet']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
