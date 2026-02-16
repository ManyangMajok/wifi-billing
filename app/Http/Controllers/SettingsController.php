<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        // In a real app, fetch these from a Settings model or config
        return Inertia::render('Settings/Index', [
            'app_name' => config('app.name'),
            'mpesa_shortcode' => env('MPESA_SHORTCODE', '174379'),
            'router_ip' => '192.168.88.1' // Placeholder
        ]);
    }
}