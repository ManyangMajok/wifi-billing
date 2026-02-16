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
        Schema::create('radius_sessions', function (Blueprint $table) {
        $table->id();
        $table->string('acct_session_id')->unique(); // Unique ID from Router
        $table->foreignId('user_id')->nullable(); // Linked to our user
        $table->string('username'); // The PPPoE/Hotspot username
        $table->ipAddress('ip_address')->nullable();
        $table->dateTime('start_time');
        $table->dateTime('stop_time')->nullable();
        $table->bigInteger('upload_bytes')->default(0);
        $table->bigInteger('download_bytes')->default(0);
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('radius_sessions');
    }
};
