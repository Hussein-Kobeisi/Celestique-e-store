<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'total_amount' => 'required|numeric|min:0',
            'order_items' => 'required|array|min:1',
                'order_items.*.product_id' => 'required|integer|exists:products,id',
                'order_items.*.quantity' => 'required|integer|min:1',
        ];
    }
}
