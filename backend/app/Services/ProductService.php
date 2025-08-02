<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
    static function add($data)
    {
        $product = new Product();
        $product->fill($data);
        return $product->save();
    }

    static function all()
    {
        return Product::all();
    }
}