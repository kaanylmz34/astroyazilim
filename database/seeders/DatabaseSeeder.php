<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\ProductImage;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 10 kullanıcı oluştur
        $users = User::factory(10)->create();

        // 20 ürün oluştur
        $products = Product::factory(20)->create()->each(function ($product) {
            // Her ürün için 2-4 resim oluştur
            ProductImage::factory(rand(2, 4))->create([
                'product_id' => $product->id
            ]);
        });

        // Her kullanıcı için işlemleri gerçekleştir
        $users->each(function ($user) {
            // Her kullanıcı için 1-3 ödeme oluştur
            $payments = Payment::factory(rand(1, 3))->create([
                'user_id' => $user->id
            ]);

            // Her ödeme için fatura oluştur
            $payments->each(function ($payment) use ($user) {
                $invoice = Invoice::factory()->create([
                    'user_id' => $user->id,
                    'payment_id' => $payment->id
                ]);
                
                // Her fatura için 2-5 sipariş oluştur
                Order::factory(rand(2, 5))->create([
                    'user_id' => $user->id,
                    'invoice_id' => $invoice->id
                ]);
            });
        });
    }
}
