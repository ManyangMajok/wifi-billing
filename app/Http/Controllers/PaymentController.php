<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with(['user', 'package'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Payments/Index', [
            'payments' => $payments
        ]);
    }
}