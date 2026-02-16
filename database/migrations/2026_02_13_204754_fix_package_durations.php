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
            // Drop the old "hours" and "seconds" columns if they exist
            $table->dropColumn(['duration_hours', 'duration_seconds', 'type']);
            
            // Add the flexible columns
            // duration_value: 1, 30, 1
            // duration_unit: 'day', 'month'
            $table->integer('duration_value')->default(1)->after('price'); 
            $table->string('duration_unit')->default('month')->after('duration_value');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn(['duration_value', 'duration_unit']);
        });
    }
};
