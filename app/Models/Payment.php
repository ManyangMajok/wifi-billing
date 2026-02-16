<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'package_id',
        'phone_number',
        'amount',
        'checkout_request_id',
        'status',
    ];

    /**
     * Relationships
     */

    // A payment belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A payment belongs to a package
    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
