<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use App\Http\Requests\AddProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\ProductFilterRequest;

class ProductController extends Controller
{
    public function add(AddProductRequest $request)
    {
        $validated = $request->validated();
        $productData = ProductService::productWithImage($validated);
        $product = ProductService::add($productData);
        return $this->responseJson($product, "Product added successfully", 200);
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
        $products = ProductService::getFilteredProducts($request);
        return $this->responseJson($products, "Products fetched successfully", 200);
    }
}
