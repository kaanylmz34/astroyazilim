<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

# customer / dashboard
Route::get('/customer/dashboard', function () {
    return Inertia::render('Customer/Dashboard');
})->name('customer.dashboard');

# admin / users
Route::get('/admin/users', function () {
    return Inertia::render('Customer/Users');
})->name('admin.users');

# customer / track
Route::get('/customer/track', function () {
    return Inertia::render('Customer/Track');
})->name('track');

# get-offer
Route::get('/get-offer', function () {
    return Inertia::render('GetOffer');
})->name('get-offer');

# projects
Route::get('/projects', function () {
    return Inertia::render('Projects');
})->name('projects');

# about
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
