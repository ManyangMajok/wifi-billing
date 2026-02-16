<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Stateless JSON routes for Expo Mobile App
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (No Login Required)
|--------------------------------------------------------------------------
*/

// Register
Route::post('/register', [AuthController::class, 'register']);

// Login
Route::post('/login', [AuthController::class, 'login']);

// View WiFi Packages (public)
Route::get('/wifi-packages', [PackageController::class, 'apiIndex']);

// M-Pesa Callback (Safaricom must reach this without auth)
Route::post('/mpesa/callback', [PaymentController::class, 'callback']);


/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (Requires Sanctum Token)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // 1️⃣ Get Logged-in User Profile
    Route::get('/user', [AuthController::class, 'user']);

    // 2️⃣ Initiate STK Push (Only logged-in users can buy)
    Route::post('/mpesa/stkpush', [PaymentController::class, 'initiateStkPush']);

    // 3️⃣ Logout
    Route::post('/logout', [AuthController::class, 'logout']);

});
