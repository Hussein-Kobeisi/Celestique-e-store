<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{

    static function get($id){
        return Product::find($id);
    }

    static function add($data)
    {
        $product = (new Product)->fill($data);
        return $product->save();
    }

    static function fill($product, $data){
        $data = array_filter($data, fn($value) => $value !== null && $value !== '');
        $product->fill($data);
        return $product;
    }

    static function save($product)
    {
        return $product->save();
    }

    static function all()
    {
        return Product::all();
    }
}