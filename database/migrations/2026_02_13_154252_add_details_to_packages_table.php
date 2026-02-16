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
        Schema::table('packages', function (Blueprint $table) {
        // e.g., '5M/5M' (Upload/Download) for MikroTik Queues
        $table->string('speed_profile')->after('name'); 
        
        // e.g., 'Daily', 'Weekly', 'Monthly'
        $table->string('type')->after('price'); 
        
        // Duration in seconds (easier for RADIUS math)
        // 1 Day = 86400, 30 Days = 2592000
        $table->integer('duration_seconds')->after('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            //
        });
    }
};
