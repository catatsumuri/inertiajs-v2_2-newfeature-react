<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartialReloadController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('partial_reloads/index', [
            'users' => fn () => User::with('company')
                ->when(
                    $request->filled('company_id'),
                    fn ($query) => $query->where('company_id', $request->input('company_id'))
                )
                ->get(),
            'companies' => fn () => Company::all(),
            'filters' => Inertia::always($request->only('company_id')),
            'currentTime' => now()->format('Y-m-d H:i:s'),
        ]);
    }
}
