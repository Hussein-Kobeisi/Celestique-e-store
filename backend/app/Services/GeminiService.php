<?php

namespace App\Services;

use Gemini\Client;
use Illuminate\Support\Facades\Log; // Used for logging potential errors, good for production

class GeminiService
{
    protected Client $client;

    public function __construct()
    {
        $apiKey = env('GEMINI_API_KEY');
        // Initialize the Gemini client with the API key from your .env file
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
            // Call the Gemini API using the 'gemini-1.5-flash' model for content generation
            $response = $this->client->generativeModel('gemini-1.5-flash')
                ->generateContent($prompt);

            $responseText = $response->text();

            // Log the raw response from Gemini for debugging purposes (can be removed in production)
            Log::debug('Raw Gemini Response: ' . $responseText);

            // Use a regular expression to extract the pure JSON string from Gemini's markdown code block
            // This handles cases where Gemini wraps the JSON in ```json...```
            preg_match('/```json\s*(.*?)\s*```/s', $responseText, $matches);

            $jsonString = '';
            if (isset($matches[1])) {
                $jsonString = trim($matches[1]);
            } else {
                // Fallback: If no markdown code block is found, try to trim and decode the whole response.
                // This accounts for cases where Gemini might return just the JSON without markdown.
                $jsonString = trim($responseText, "\"\n "); // Remove leading/trailing quotes and newlines
            }

            // Log the extracted JSON string before decoding (can be removed in production)
            Log::debug('Extracted JSON String for decoding: ' . $jsonString);

            // Initialize default parsed attributes
            $parsedAttributes = [
                'category' => null,
                'min_price' => null,
                'max_price' => null,
            ];

            // Decode the extracted JSON string into a PHP associative array
            $jsonResponse = json_decode($jsonString, true);

            // Check for JSON decoding errors
            if (json_last_error() !== JSON_ERROR_NONE) {
                // Log the specific JSON error message for debugging
                Log::error('JSON decoding error in GeminiService: ' . json_last_error_msg(), [
                    'raw_response' => $responseText,
                    'extracted_json_string' => $jsonString
                ]);
                // Return default attributes if decoding fails to prevent application crash
                return $parsedAttributes;
            }

            // Populate parsed attributes if keys exist in the decoded JSON response
            if (isset($jsonResponse['category'])) {
                $parsedAttributes['category'] = $jsonResponse['category'];
            }

            if (isset($jsonResponse['price_range'])) {
                $priceRange = strtolower($jsonResponse['price_range']);

                // Parse the price range string into min_price and max_price floats
                if (str_contains($priceRange, 'under')) {
                    // Extract number after 'under'
                    preg_match('/\d+(\.\d+)?/', $priceRange, $matches);
                    if (isset($matches[0])) {
                        $parsedAttributes['max_price'] = (float)$matches[0];
                    }
                } elseif (str_contains($priceRange, 'over')) {
                    // Extract number after 'over'
                    preg_match('/\d+(\.\d+)?/', $priceRange, $matches);
                    if (isset($matches[0])) {
                        $parsedAttributes['min_price'] = (float)$matches[0];
                    }
                } elseif (str_contains($priceRange, '-')) {
                    // Handle ranges like '$50-$150'
                    $prices = explode('-', $priceRange);
                    if (count($prices) === 2) {
                        $parsedAttributes['min_price'] = (float)trim(str_replace(['$', ','], '', $prices[0]));
                        $parsedAttributes['max_price'] = (float)trim(str_replace(['$', ','], '', $prices[1]));
                    }
                } elseif (is_numeric(str_replace(['$', ','], '', $priceRange))) {
                    // Handle exact prices like '$75'
                    $exactPrice = (float)str_replace(['$', ','], '', $priceRange);
                    $parsedAttributes['min_price'] = $exactPrice;
                    $parsedAttributes['max_price'] = $exactPrice;
                }
            }

            return $parsedAttributes;

        } catch (\Exception $e) {
            // Catch any exceptions during the API call or processing and log them
            Log::error('Gemini API or Service Error: ' . $e->getMessage(), [
                'exception_trace' => $e->getTraceAsString(),
                'user_prompt' => $userPrompt
            ]);
            // Return default attributes on error to ensure a graceful fallback
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
        return "You are an AI assistant for an e-commerce jewelry store. The user will provide a search query. Your task is to extract the jewelry category and any specified price range from the user's query.

        Respond ONLY with a JSON object.
        The JSON object must have two keys:
        - `category`: (string) The identified jewelry category (e.g., 'necklaces', 'rings', 'bracelets', 'earrings'). If no specific category is mentioned, default to 'jewelry'.
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
          \"category\": \"rings\",
          \"price_range\": \"under $100\"
        }
        ```
        Example 3:
        ```json
        {
          \"category\": \"bracelets\"
        }
        ```
        ";
    }
}
