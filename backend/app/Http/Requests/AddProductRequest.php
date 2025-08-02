<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'       => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price'      => 'required|numeric|min:0',
            'stock'      => 'required|integer|min:0',
            'image_url' => 'required|string|max:255',
            'category'   => 'required|string|in:ring,earring,necklace,bracelet',
        ];
    }
}
