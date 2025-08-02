<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email'    => 'nullable|email',
            'name'     => 'nullable|string|max:255',
            'password' => 'nullable|string|min:5',
            'mobile'   => 'nullable|regex:/^\d+$/|max:20',
        ];
    }
}
