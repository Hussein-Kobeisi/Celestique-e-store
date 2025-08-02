<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Http\Requests\AddProductRequest;

class ProductController extends Controller
{
    public function add(AddProductRequest $request)
    {  
        $request = $request->validated();
        $product = ProductService::add($request);
        
        return response()->json($product, 200);
    }

    public function update(Request $request)
    {
        //Update existing product as admin (used for updating stock + when order is created)
        //notify listing page listener that product was updated
    }

    public function all()
    {
        $payload = ProductService::all();
        return response()->json($payload, 200);
    }
}
