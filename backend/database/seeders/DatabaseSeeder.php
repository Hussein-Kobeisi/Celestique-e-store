<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AuditLogSeeder::class,
            DailyRevenueSeeder::class,
            HourlyOrderSeeder::class,
            NotificationSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
