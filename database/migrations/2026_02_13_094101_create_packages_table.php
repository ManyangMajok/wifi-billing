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
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');           // e.g., "Daily Fast"
            $table->string('speed_limit');    // e.g., "5M/5M" (MikroTik format)
            $table->integer('duration_hours');// e.g., 24
            $table->decimal('price', 8, 2);   // e.g., 100.00
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
