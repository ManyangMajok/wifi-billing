<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display list of users (Customers)
     */
    public function index()
    {
        $users = User::where('role', 'user')
            ->with(['subscription' => function ($query) {
                $query->latest();
            }])
            ->latest()
            ->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * ✅ NEW: Detailed Customer Profile Page (360 View)
     */
    public function show(User $user)
    {
        // Load full history relationships
        $user->load([
            'subscriptions.package',
            'payments.package'
        ]);

        return Inertia::render('Users/Show', [
            'customer' => $user, // avoid conflict with auth()->user()
            'stats' => [
                'total_spent' => $user->payments()
                    ->where('status', 'completed')
                    ->sum('amount'),

                'join_date' => $user->created_at->format('d M Y'),

                'active_sub' => $user->subscription // latestOfMany()
            ]
        ]);
    }

    /**
     * ✅ NEW: Suspend / Activate User
     */
    public function toggleStatus(User $user)
    {
        $user->status = $user->status === 'active'
            ? 'suspended'
            : 'active';

        $user->save();

        return back()->with('message', 'User status updated!');
    }
}
