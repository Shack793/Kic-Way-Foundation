<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_correct_credentials()
    {
        // Create a test user with all required fields
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'address' => '123 Test Street',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip_code' => '12345',
            'telephone' => '123-456-7890',
        ]);

        // Attempt to login
        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        // Assert the response is successful
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'message',
                    'user',
                    'token',
                ]);
                
        // Log the response for debugging
        echo "\nLogin response: " . json_encode($response->json(), JSON_PRETTY_PRINT) . "\n";
    }

    public function test_user_cannot_login_with_incorrect_credentials()
    {
        // Create a test user with all required fields
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'address' => '123 Test Street',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip_code' => '12345',
            'telephone' => '123-456-7890',
        ]);

        // Attempt to login with wrong password
        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'wrongpassword',
        ]);

        // Assert the response is unauthorized
        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email']);
    }
}
