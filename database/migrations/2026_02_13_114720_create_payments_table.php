<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('package_id')->constrained();
            $table->string('phone_number');
            $table->string('merchant_request_id')->nullable(); // From M-Pesa
            $table->string('checkout_request_id')->unique();   // From M-Pesa
            $table->decimal('amount', 8, 2);
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->string('mpesa_receipt')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
