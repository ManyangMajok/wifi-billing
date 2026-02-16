<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'package_id', 
        'payment_id', 
        'starts_at', 
        'expires_at', 
        'status'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    // Magic Accessor: Check if active
    // Usage: if($sub->is_active) { ... }
    public function getIsActiveAttribute()
    {
        return $this->status === 'active' && Carbon::now()->lessThan($this->expires_at);
    }
}