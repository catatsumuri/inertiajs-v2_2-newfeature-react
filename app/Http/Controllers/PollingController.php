<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class PollingController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('polling', [
            'users' => fn () => User::with('company')->inRandomOrder()->limit(10)->get(),
            'currentTime' => now()->toDateTimeString(),
        ]);
    }
}
