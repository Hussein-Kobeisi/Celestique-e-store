<?php

namespace App\Services;

use App\Models\Product;
use App\Http\Requests\ProductFilterRequest;
use App\QueryBuilders\ProductQueryBuilder;

class ProductService
{

    static function get($id)
    {
        return Product::find($id);
    }

    static function add($data)
    {
        $product = (new Product)->fill($data);
        $product->save();
        return $product;
    }

    static function fill($product, $data)
    {
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

    static function getFilteredProducts(ProductFilterRequest $request)
    {
        return ProductQueryBuilder::build($request)->paginate(15);
    }

    static function tryDecreaseStock($productId, $quantity)
    {
        $product = Product::find($productId);
        if ($product && $product->stock >= $quantity) {
            $product->stock -= $quantity;
            return $product->save();
        }
        return false;
    }

    static function productWithImage($validated)
    {
        $imagePath = ImageService::saveBase64File($validated['image_base64'], 'products');

        // Merge into product data
        $productData = array_merge($validated, [
            'image_url' => $imagePath,
        ]);
        unset($productData['image_base64']); // remove base64 from the data before saving
        return  $productData;
    }
}
