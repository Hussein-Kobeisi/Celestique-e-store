<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;
// use App\Models\Product;

// class AIController extends Controller
// {
//     public function recommend(Request $request)
//     {
//         $userMessage = $request->input('message');

//         // Step 1: Call OpenAI to extract filters
//         $openaiResponse = Http::withToken(env('OPENAI_API_KEY'))->post(
//             'https://api.openai.com/v1/chat/completions',
//             [
//                 'model' => 'gpt-4o',
//                 'messages' => [
//                     [
//                         'role' => 'system',
//                         'content' => 'You are a helpful assistant for a jewelry store. Extract category, max_price, and occasion from user input.'
//                     ],
//                     [
//                         'role' => 'user',
//                         'content' => $userMessage
//                     ]
//                 ],
//                 'functions' => [
//                     [
//                         'name' => 'get_matching_products',
//                         'description' => 'Extracts product filters from user query',
//                         'parameters' => [
//                             'type' => 'object',
//                             'properties' => [
//                                 'category' => ['type' => 'string'],
//                                 'max_price' => ['type' => 'number'],
//                                 'occasion' => ['type' => 'string']
//                             ],
//                             'required' => ['category', 'max_price']
//                         ]
//                     ]
//                 ],
//                 'function_call' => 'auto'
//             ]
//         );

//         $choice = $openaiResponse['choices'][0]['message'];

//         // Step 2: Parse extracted arguments from OpenAI
//         $args = json_decode($choice['function_call']['arguments'], true);

//         // Step 3: Query products
//         $query = Product::query()
//             ->where('category', 'like', '%' . $args['category'] . '%')
//             ->where('price', '<=', $args['max_price']);

//         if (!empty($args['occasion'])) {
//             $query->where('occasion', 'like', '%' . $args['occasion'] . '%');
//         }

//         $products = $query->get();

//         return response()->json($products);
//     }
// }