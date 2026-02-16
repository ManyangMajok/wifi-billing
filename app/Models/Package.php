<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'speed_limit',     // Human readable: "5 Mbps"
        'speed_profile',   // Technical (MikroTik): "5M/5M" <--- ADDED THIS
        'price',
        'duration_value',  // e.g. 1
        'duration_unit',   // 'day', 'week', 'month'
    ];

    /**
     * Relationships
     */
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * Helper: Calculate expiry date based on duration
     */
    public function calculateExpiry($startDate)
    {
        $start = $startDate->copy();

        return match ($this->duration_unit) {
            'day'   => $start->addDays($this->duration_value),
            'week'  => $start->addWeeks($this->duration_value),
            'month' => $start->addMonths($this->duration_value),
            default => $start,
        };
    }
}