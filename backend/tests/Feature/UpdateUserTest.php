<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UpdateUserTest extends TestCase
{
    use RefreshDatabase;

    protected function authenticate(){
        $user = User::factory()->create();
        $token = auth()->login($user);
        return ['user' => $user, 'token' => $token];
    }

    public function test_update_user_success(){
        $auth = $this->authenticate();

        $payload = [
            'email' => 'newemail@example.com',
            'name' => 'New Name',
            'password' => 'secret123',
            'mobile' => '1234567890',
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->postJson('/api/update_user', $payload);

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'name' => 'New Name',
                     'email' => 'newemail@example.com',
                 ]);
    }

    public function test_update_user_unauthorized_without_token(){
        $response = $this->json('POST', '/api/update_user', [
            'name' => 'New Name',
        ]);

        $response->assertStatus(401);
    }

    public function test_update_user_fails_with_invalid_email(){
        $auth = $this->authenticate();

        $payload = [
            'email' => 'not-an-email',
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->json('POST', '/api/update_user', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    public function test_update_user_fails_with_invalid_mobile(){
        $auth = $this->authenticate();

        $payload = [
            'mobile' => 'invalid_mobile_123',
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->json('POST', '/api/update_user', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['mobile']);
    }

    public function test_update_user_fails_with_short_password(){
        $auth = $this->authenticate();

        $payload = [
            'password' => '123', // less than min 5 chars
        ];

        $response = $this->withHeader('Authorization', "Bearer {$auth['token']}")
                         ->json('POST', '/api/update_user', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['password']);
    }
}