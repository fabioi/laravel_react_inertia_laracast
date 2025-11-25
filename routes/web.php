<?php

use App\Http\Resources\PuppyResource;
use App\Models\Puppy;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PuppyController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'puppies' => PuppyResource::collection(Puppy::all()->load(['user', 'likedBy'])),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::patch('puppies/{puppy}/like', [PuppyController::class, 'like'])->name('puppies.like');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
