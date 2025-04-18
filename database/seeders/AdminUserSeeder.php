<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'address' => '123 Admin St',
            'city' => 'Admin City',
            'state' => 'Admin State',
            'zip_code' => '12345',
            'telephone' => '123-456-7890',
            'website' => 'admin.example.com',
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        // Create a regular user for testing
        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'address' => '456 User St',
            'city' => 'User City',
            'state' => 'User State',
            'zip_code' => '54321',
            'telephone' => '098-765-4321',
            'website' => 'user.example.com',
            'is_admin' => false,
            'email_verified_at' => now(),
        ]);
    }
}