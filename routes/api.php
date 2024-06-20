<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MedsController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);        
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/orders', [AdminController::class, 'index']);
    Route::get('/admin/orders/{id}', [AdminController::class, 'show']);
});

Route::get('meds/{page}',[MedsController::class,'index']);

require __DIR__.'/auth.php';