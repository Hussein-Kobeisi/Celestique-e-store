<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Rings
            [
                'name' => 'Elegant Gold Ring',
                'description' => 'A sleek 24k gold ring for formal wear.',
                'price' => 1250.00,
                'stock' => 10,
                'category' => 'ring',
                'image_url' => 'products/07-03-2025-15-01-02-rng07741y.jpg',
            ],
            [
                'name' => 'Royal Curve Ring',
                'description' => 'Intricately designed curve ring in pure gold.',
                'price' => 1450.00,
                'stock' => 6,
                'category' => 'ring',
                'image_url' => 'products/09-06-2025-06-19-51-rng07872y.jpg',
            ],
            [
                'name' => 'Minimalist Gold Ring',
                'description' => 'Simple and modern ring in fine gold.',
                'price' => 950.00,
                'stock' => 12,
                'category' => 'ring',
                'image_url' => 'products/12-06-2025-08-40-05-rng07869y.jpg',
            ],
            [
                'name' => 'Engraved Band Ring',
                'description' => 'Engraved gold band ring with high polish.',
                'price' => 1100.00,
                'stock' => 7,
                'category' => 'ring',
                'image_url' => 'products/12-06-2025-08-38-51-rng07868y.jpg',
            ],
            [
                'name' => 'Glossy Finish Ring',
                'description' => 'Smooth and glossy pure gold ring.',
                'price' => 1200.00,
                'stock' => 9,
                'category' => 'ring',
                'image_url' => 'products/24-06-2025-13-20-06-rng07893m.jpg',
            ],

            // Earrings
            [
                'name' => 'Pear Drop Earrings',
                'description' => 'Elegant pear-shaped gold earrings.',
                'price' => 1150.00,
                'stock' => 14,
                'category' => 'earring',
                'image_url' => 'products/24-06-2025-13-18-31-erg07186m.jpg',
            ],
            [
                'name' => 'Luxe Hoop Earrings',
                'description' => 'Polished hoop earrings in 22k gold.',
                'price' => 1300.00,
                'stock' => 11,
                'category' => 'earring',
                'image_url' => 'products/10-06-2025-09-24-45-erg07121y.jpg',
            ],
            [
                'name' => 'Artisan Stud Earrings',
                'description' => 'Handcrafted 18k stud earrings.',
                'price' => 980.00,
                'stock' => 18,
                'category' => 'earring',
                'image_url' => 'products/02-08-2025-10-15-32-erg07093y.jpg',
            ],
            [
                'name' => 'Twist Gold Earrings',
                'description' => 'Twisted motif small earrings.',
                'price' => 1050.00,
                'stock' => 13,
                'category' => 'earring',
                'image_url' => 'products/10-06-2025-09-37-06-erg07126y.jpg',
            ],
            [
                'name' => 'Flower Accent Earrings',
                'description' => 'Gold earrings with flower motifs.',
                'price' => 1250.00,
                'stock' => 6,
                'category' => 'earring',
                'image_url' => 'products/12-06-2025-09-26-15-erg07109y.jpg',
            ],

            // Bracelets
            [
                'name' => 'Classic Chain Bracelet',
                'description' => 'Timeless gold chain bracelet.',
                'price' => 1500.00,
                'stock' => 8,
                'category' => 'bracelet',
                'image_url' => 'products/07-06-2025-07-39-24-brg10824y.jpg',
            ],
            [
                'name' => 'Bold Cuff Bracelet',
                'description' => 'Statement cuff in solid gold.',
                'price' => 1650.00,
                'stock' => 5,
                'category' => 'bracelet',
                'image_url' => 'products/27-06-2025-06-18-57-brg12246y.jpg',
            ],
            [
                'name' => 'Twist Design Bracelet',
                'description' => 'Twisted band-style bracelet.',
                'price' => 1550.00,
                'stock' => 10,
                'category' => 'bracelet',
                'image_url' => 'products/19-06-2025-13-55-38-brg12176y.jpg',
            ],
            [
                'name' => 'Luxury Gold Bangle',
                'description' => 'Solid 24k bangle bracelet.',
                'price' => 1800.00,
                'stock' => 7,
                'category' => 'bracelet',
                'image_url' => 'products/30-07-2025-13-02-39-bag02276y-.jpg',
            ],
            [
                'name' => 'Modern Style Bracelet',
                'description' => 'Minimalist gold bracelet with modern flair.',
                'price' => 1420.00,
                'stock' => 9,
                'category' => 'bracelet',
                'image_url' => 'products/08-07-2025-07-55-27-bag02283m.jpg',
            ],

            // Necklaces
            [
                'name' => 'Layered Gold Necklace',
                'description' => 'Multi-strand gold necklace with delicate finish.',
                'price' => 2200.00,
                'stock' => 5,
                'category' => 'necklace',
                'image_url' => 'products/25-08-2018-07-25-10-org00686t.jpg',
            ],
            [
                'name' => 'Pendant Chain Necklace',
                'description' => 'Light gold chain with round pendant.',
                'price' => 1950.00,
                'stock' => 6,
                'category' => 'necklace',
                'image_url' => 'products/14-02-2019-11-34-28-chg04872y.jpg',
            ],
            [
                'name' => 'Pearl-Inspired Necklace',
                'description' => 'Gold necklace with pearl-style accents.',
                'price' => 2100.00,
                'stock' => 4,
                'category' => 'necklace',
                'image_url' => 'products/03-05-2019-11-18-47-org01612y.jpg',
            ],
            [
                'name' => 'Double Link Chain',
                'description' => 'Heavy chain gold necklace for bold looks.',
                'price' => 2300.00,
                'stock' => 3,
                'category' => 'necklace',
                'image_url' => 'products/21-02-2025-08-44-02-ncg00688y.jpg',
            ],
            [
                'name' => 'Retro Gold Necklace',
                'description' => 'Vintage-styled thick gold chain.',
                'price' => 2400.00,
                'stock' => 5,
                'category' => 'necklace',
                'image_url' => 'products/27405_17061203281769.jpg',
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                ...$product,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
