<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DeferredPropsController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('deferred-props', [
            'stats' => Inertia::defer(fn () => [
                'totalUsers' => tap(User::count(), fn () => sleep(2)),
                'totalCompanies' => Company::count(),
            ], 'stats'),
            'users' => Inertia::defer(fn () => tap(User::with('company')->inRandomOrder()->limit(10)->get(), fn () => sleep(1)), 'users'),
        ]);
    }
}
