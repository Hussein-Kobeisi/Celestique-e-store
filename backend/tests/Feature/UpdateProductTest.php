<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Product;

class UpdateProductTest extends TestCase
{
    use RefreshDatabase;

    protected function authenticate($role = 1){
        $user = User::factory()->create(['role' => $role]);
        $token = auth()->login($user);
        return ['user' => $user, 'token' => $token];
    }

    protected function populate(){
        return Product::factory()->create();
    }

    public function test_update_product_success(){
        $auth = $this->authenticate();
        $product = $this->populate();

        $payload = [
            'id' => $product->id,
            'stock' => 100,
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->postJson('/api/update_product', $payload);

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'id' => $product->id,
                     'stock' => 100,
                 ]);
    }

    public function test_update_product_unauthorized_without_token(){
        $product = $this->populate();

        $payload = [
            'id' => $product->id,
            'stock' => 100,
        ];

        $response = $this->postJson('/api/update_product', $payload);

        $response->assertStatus(401);
    }

    public function test_update_product_unauthorized_not_admin(){
        $auth = $this->authenticate($role = 0);
        $product = $this->populate();

        $payload = [
            'id' => $product->id,
            'stock' => 100,
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->postJson('/api/update_product', $payload);

        $response->assertStatus(403);
    }

    public function test_update_product_fails_with_invalid_id(){
        $auth = $this->authenticate();
        $product = $this->populate();

        $payload = [
            'id' => "abcd",
            'stock' => 100,
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->postJson('/api/update_product', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['id']);
    }

    public function test_update_product_fails_with_missing_id(){
        $auth = $this->authenticate();
        $product = $this->populate();

        $payload = [
            'stock' => 100,
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->postJson('/api/update_product', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['id']);
    }

    public function test_update_product_fails_with_invalid_stock(){
        $auth = $this->authenticate();
        $product = $this->populate();

        $payload = [
            'id' => $product->id,
            'stock' => "abcd",
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->postJson('/api/update_product', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['stock']);
    }

    public function test_update_product_success_with_missing_stock(){
        $auth = $this->authenticate();
        $product = $this->populate();

        $payload = [
            'id' => $product->id,
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->postJson('/api/update_product', $payload);

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'id' => $product->id,
                 ]);
    }
}
