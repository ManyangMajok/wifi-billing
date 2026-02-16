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
        Schema::create('subscriptions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('package_id')->constrained();
        
        // When did it start?
        $table->dateTime('starts_at');
        
        // When does it die? (This is what we check for access)
        $table->dateTime('expires_at');
        
        // 'active', 'expired', 'cancelled'
        $table->string('status')->default('active');
        
        // Link to the payment that bought this
        $table->foreignId('payment_id')->nullable(); 
        
        $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
