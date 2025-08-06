<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Http\Request;
use App\Models\Product; // Make sure you have a Product model

class ProductSearchController extends Controller
{
    protected GeminiService $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    public function search(Request $request)
    {
        // Validate that a 'prompt' is provided in the request
        $request->validate(['prompt' => 'required|string']);

        $userPrompt = $request->input('prompt');

        // Use the GeminiService to extract category and price attributes from the user prompt
        $attributes = $this->geminiService->extractProductAttributes($userPrompt);

        $category = $attributes['category'];
        $minPrice = $attributes['min_price'];
        $maxPrice = $attributes['max_price'];

        // Start building the Eloquent query for the Product model
        $query = Product::query();

        // Apply category filter if a specific category is identified and it's not the generic 'jewelry'
        if ($category && $category !== 'jewelry') {
            // Use 'like' for partial matching in category names (e.g., "rings" matches "diamond rings")
            $query->where('category', 'like', '%' . $category . '%');
        }

        // Apply minimum price filter if a minimum price is provided
        if ($minPrice !== null) {
            $query->where('price', '>=', $minPrice);
        }

        // Apply maximum price filter if a maximum price is provided
        if ($maxPrice !== null) {
            $query->where('price', '<=', $maxPrice);
        }

        // Execute the query and get the results
        $products = $query->get();

        // Return the filtered products as a JSON response
        return response()->json($products);
    }
}
