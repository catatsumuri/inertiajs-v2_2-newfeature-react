<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class InfiniteScrollController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('infinite-scroll', [
            'users' => Inertia::scroll(fn () => User::with('company')->paginate(10)),
        ]);
    }
}
