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
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->nullable(); // For PPPoE/Hotspot login
            $table->string('phone')->unique()->nullable();
            $table->string('role')->default('user'); // 'admin' or 'user'
            $table->string('status')->default('active'); // 'active', 'suspended'
            $table->string('mikrotik_ip')->nullable(); // Static IP if assigned
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
