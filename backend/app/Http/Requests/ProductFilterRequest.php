<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductFilterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // No auth restriction
    }

    public function rules(): array
    {
        return [
            'search'   => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'in:ring,bracelet,earring,necklace'],
            'sort'     => ['nullable', 'regex:/^(name|price)_(asc|desc)$/i'],
            'page'     => ['nullable', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'category.in' => 'Category must be one of: ring, bracelet, earring, necklace.',
            'sort.regex'  => 'Sort format must be like "price_asc" or "name_desc".',
        ];
    }
}
