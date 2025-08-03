<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Http\Requests\AddProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    public function add(AddProductRequest $request)
    {  
        $request = $request->validated();
        ProductService::add($request);
        
        return response()->json($product, 200);
    }

    public function update(UpdateProductRequest $request)
    {
        $request = $request->validated();
        $product = ProductService::get($request['id']);

        $product = ProductService::fill($product, $request);
        ProductService::save($product);
        
        return response()->json($product, 200);
        
        // TODO:
        //notify listing page listener that product was updated
    }

    public function all()
    {
        $payload = ProductService::all();
        return response()->json($payload, 200);
    }
}
