<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia; // We use Inertia to pass data to React

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Calculate Revenue (This Month vs Last Month)
        $revenueThisMonth = Payment::where('status', 'completed')
            ->whereMonth('created_at', Carbon::now()->month)
            ->sum('amount');

        $revenueTotal = Payment::where('status', 'completed')->sum('amount');

        // 2. Count Active Subscribers (The Logic we built earlier)
        // We filter subscriptions that are 'active' AND expire in the future
        $activeSubscribers = Subscription::where('status', 'active')
            ->where('expires_at', '>', Carbon::now())
            ->count();

        // 3. Get Recent Payments (For the "Live Feed" table)
        $recentPayments = Payment::with('user', 'package') // Eager load to avoid N+1 query
            ->where('status', 'completed')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'user' => $payment->user->name,
                    'phone' => $payment->phone_number,
                    'amount' => number_format($payment->amount),
                    'package' => $payment->package->name,
                    'date' => $payment->created_at->diffForHumans(), // e.g. "2 mins ago"
                ];
            });

        // 4. Return the View with Data
        return Inertia::render('Dashboard', [
            'stats' => [
                'revenue_month' => number_format($revenueThisMonth),
                'revenue_total' => number_format($revenueTotal),
                'active_users' => $activeSubscribers,
                'total_users' => User::where('role', 'user')->count(),
            ],
            'recent_payments' => $recentPayments
        ]);
    }
}