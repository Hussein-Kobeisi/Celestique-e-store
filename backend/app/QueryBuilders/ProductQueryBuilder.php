<?php

namespace App\QueryBuilders;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductQueryBuilder
{
    public static function build(Request $request)
    {
        $query = Product::query();

        // Search by name
        if ($search = $request->input('search')) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        // Filter by category (strict allowed values)
        if ($category = $request->input('category')) {
            $allowedCategories = ['ring', 'bracelet', 'earring', 'necklace'];
            if (in_array(strtolower($category), $allowedCategories)) {
                $query->where('category', strtolower($category));
            }
        }

        // Sorting by name or price
        $sort = $request->input('sort');
        if ($sort) {
            [$field, $direction] = explode('_', $sort) + [null, 'asc'];
            $allowedFields = ['name', 'price'];
            $allowedDirections = ['asc', 'desc'];

            if (in_array($field, $allowedFields) && in_array($direction, $allowedDirections)) {
                $query->orderBy($field, $direction);
            }
        } else {
            // Default sort
            $query->orderBy('created_at', 'desc');
        }

        return $query;
    }
}
