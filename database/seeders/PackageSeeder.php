<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;

class PackageSeeder extends Seeder
{
    public function run()
    {
        // 1. Daily Package
        Package::create([
            'name' => '24 Hour Pass',
            'speed_limit' => '5 Mbps',      // Human readable
            'speed_profile' => '5M/5M',     // Technical (MikroTik)
            'price' => 50,
            'duration_value' => 1,
            'duration_unit' => 'day'
        ]);

        // 2. Standard Monthly
        Package::create([
            'name' => 'Unlimited Monthly (5Mbps)',
            'speed_limit' => '5 Mbps',
            'speed_profile' => '5M/5M',
            'price' => 1500,
            'duration_value' => 1,          // 1 Month
            'duration_unit' => 'month'
        ]);

        // 3. Premium Monthly
        Package::create([
            'name' => 'Business Monthly (10Mbps)',
            'speed_limit' => '10 Mbps',
            'speed_profile' => '10M/10M',
            'price' => 2500,
            'duration_value' => 1,
            'duration_unit' => 'month'
        ]);
    }
}