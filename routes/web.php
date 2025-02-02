<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\OrderController;

# models
use App\Models\Order;

    require __DIR__ . '/auth.php';

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

    # customer routes
    Route::middleware(['auth'])->group(function () {
        Route::get('/customer/dashboard', function () {
            return Inertia::render('Customer/Dashboard');
        })->name('customer.dashboard');

        Route::get('/customer/orders', function () {
            $orders = Order::where('user_id', auth()->user()->id)->get();
            return Inertia::render('Customer/Orders', compact('orders'));
        })->name('customer.orders');

        Route::get('/customer/track', function () {
            return Inertia::render('Customer/Track');
        })->name('customer.track');

        Route::get('/customer/payments', function () {
            return Inertia::render('Customer/Payments');
        })->name('customer.payments');

        Route::get('/customer/invoices', function () {
            return Inertia::render('Customer/Invoices');
        })->name('customer.invoices');
    });

    # admin routes
    Route::middleware(['auth'])->group(function () {
        Route::get('/admin/users', function () {
            return Inertia::render('Customer/Users');
        })->name('admin.users');
    });

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

    Route::resource('products', ProductController::class);
    Route::resource('invoices', InvoiceController::class);
    Route::resource('payments', PaymentController::class);
    Route::resource('orders', OrderController::class);

    Route::middleware(['auth'])->group(function () {
        Route::prefix('api')->group(function () {
            Route::get('/orders', [OrderController::class, 'index'])->name('api.orders');
            Route::get('/payments', [PaymentController::class, 'index'])->name('api.payments');
            Route::get('/invoices', [InvoiceController::class, 'index'])->name('api.invoices');
        });
    });

    Route::get('/invoices/{invoice}/download', [InvoiceController::class, 'download'])->middleware('auth')->name('invoices.download');
