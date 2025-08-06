<?php

namespace App\Services;

use Gemini\Client;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected Client $client;

    public function __construct()
    {
        $apiKey = env('GEMINI_API_KEY');
        $this->client = \Gemini::client($apiKey);
    }

    /**
     * Extracts product attributes (category and price range) from a user prompt using Gemini.
     *
     * @param string $userPrompt The user's input prompt.
     * @return array An associative array containing 'category', 'min_price', and 'max_price'.
     */
    public function extractProductAttributes(string $userPrompt): array
    {
        $prompt = $this->createPrompt($userPrompt);

        try {
            $response = $this->client->generativeModel('gemini-1.5-flash')
                ->generateContent($prompt);

            $responseText = $response->text();

            Log::debug('Raw Gemini Response: ' . $responseText);

            preg_match('/```json\s*(.*?)\s*```/s', $responseText, $matches);

            $jsonString = '';
            if (isset($matches[1])) {
                $jsonString = trim($matches[1]);
            } else {
                $jsonString = trim($responseText, "\"\n ");
            }

            Log::debug('Extracted JSON String for decoding: ' . $jsonString);

            $parsedAttributes = [
                'category' => null,
                'min_price' => null,
                'max_price' => null,
            ];

            $jsonResponse = json_decode($jsonString, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('JSON decoding error in GeminiService: ' . json_last_error_msg(), [
                    'raw_response' => $responseText,
                    'extracted_json_string' => $jsonString
                ]);
                return $parsedAttributes;
            }

            if (isset($jsonResponse['category'])) {
                $parsedAttributes['category'] = $jsonResponse['category'];
            }

            if (isset($jsonResponse['price_range'])) {
                $priceRange = strtolower($jsonResponse['price_range']);

                if (str_contains($priceRange, 'under')) {
                    preg_match('/\d+(\.\d+)?/', $priceRange, $matches);
                    if (isset($matches[0])) {
                        $parsedAttributes['max_price'] = (float)$matches[0];
                    }
                } elseif (str_contains($priceRange, 'over')) {
                    preg_match('/\d+(\.\d+)?/', $priceRange, $matches);
                    if (isset($matches[0])) {
                        $parsedAttributes['min_price'] = (float)$matches[0];
                    }
                } elseif (str_contains($priceRange, '-')) {
                    $prices = explode('-', $priceRange);
                    if (count($prices) === 2) {
                        $parsedAttributes['min_price'] = (float)trim(str_replace(['$', ','], '', $prices[0]));
                        $parsedAttributes['max_price'] = (float)trim(str_replace(['$', ','], '', $prices[1]));
                    }
                } elseif (is_numeric(str_replace(['$', ','], '', $priceRange))) {
                    $exactPrice = (float)str_replace(['$', ','], '', $priceRange);
                    $parsedAttributes['min_price'] = $exactPrice;
                    $parsedAttributes['max_price'] = $exactPrice;
                }
            }

            return $parsedAttributes;

        } catch (\Exception $e) {
            Log::error('Gemini API or Service Error: ' . $e->getMessage(), [
                'exception_trace' => $e->getTraceAsString(),
                'user_prompt' => $userPrompt
            ]);
            return [
                'category' => null,
                'min_price' => null,
                'max_price' => null,
            ];
        }
    }

    /**
     * Creates a structured prompt for Gemini to extract category and price range.
     *
     * @param string $userPrompt The user's input.
     * @return string The formatted prompt for Gemini.
     */
    protected function createPrompt(string $userPrompt): string
    {
        return "You are an AI assistant for an e-commerce store. The user will provide a search query. Your task is to extract the product category and any specified price range from the user's query.

        Respond ONLY with a JSON object.
        The JSON object must have two keys:
        - `category`: (string) The identified product category (e.g., 'rings', 'shirts', 'books'). If no specific category is mentioned, omit this key or set it to null.
        - `price_range`: (string, optional) The specified price range (e.g., 'under $50', '$100-$200', 'over $500', or an exact price like '$75'). If no price is mentioned, omit this key.

        User's query: '{$userPrompt}'

        Example JSON response:
        ```json
        {
          \"category\": \"necklaces\",
          \"price_range\": \"$50 - $150\"
        }
        ```
        Example 2:
        ```json
        {
          \"category\": \"quod\"
        }
        ```
        Example 3:
        ```json
        {
          \"price_range\": \"under $100\"
        }
        ```
        ";
    }
}
