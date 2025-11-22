<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ViewTransitionController extends Controller
{
    public function index()
    {
        $items = collect(range(1, 12))->map(fn($i) => [
            'id' => $i,
            'title' => "Item {$i}",
            'description' => "Description for item {$i}",
        ]);

        return Inertia::render('view-transition', [
            'items' => $items,
        ]);
    }

    public function show($item)
    {
        return Inertia::render('view-transition-show', [
            'item' => [
                'id' => $item,
                'title' => "Item {$item}",
                'description' => "Description for item {$item}",
            ],
        ]);
    }
}
