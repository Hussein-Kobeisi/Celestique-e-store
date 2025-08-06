<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use App\Http\Requests\AddProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\ProductFilterRequest;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function add(AddProductRequest $request)
    {
        $validated = $request->validated();
        $productData = ProductService::productWithImage($validated);
        $product = ProductService::add($productData);
        return $this->responseJson($product, "Product added successfully", 200);
    }

    public function getProductById($id)
    {
        $product = ProductService::get($id);

        if (!$product) {
            return $this->responseJson(null, "Product not found", 404);
        }

        return $this->responseJson($product, "Product fetched successfully", 200);
    }

    public function update(UpdateProductRequest $request)
    {
        $request = $request->validated();
        $product = ProductService::get($request['id']);

        $product = ProductService::fill($product, $request);
        ProductService::save($product);

        return $this->responseJson($product, "Product updated successfully", 200);

        // TODO:
        //notify listing page listener that product was updated
    }

    public function all()
    {
        $payload = ProductService::all();
        return $this->responseJson($payload, "Products retrieved successfully", 200);
    }

    public function getFilteredProducts(ProductFilterRequest $request)
{
    $validated = $request->validated();
    $page = $request->input('page', 1);

    // Unique cache key based on validated input and page
    $cacheKey = 'filtered_products_' . md5(json_encode($validated)) . "_page_{$page}";

    $products = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($request) {
        dd('Querying DB...');
        return ProductService::getFilteredProducts($request);
    });

    return $this->responseJson($products, "Products fetched successfully", 200);
}
}
