<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->text('payment_method'); // Şifrelenmiş veri için text kullanıyoruz
            $table->string('payment_status'); // pending, completed, failed, refunded gibi
            $table->timestamp('payment_date');
            $table->text('user_note')->nullable(); // Şifrelenmiş veri için text kullanıyoruz
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
}; 