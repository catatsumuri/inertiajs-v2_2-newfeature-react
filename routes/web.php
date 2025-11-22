<?php

use App\Http\Controllers\PartialReloadController;
use App\Http\Controllers\PollingController;
use App\Http\Controllers\DeferredPropsController;
use App\Http\Controllers\InfiniteScrollController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/partial-reload', [PartialReloadController::class, 'index'])->name('partial-reload.index');
    Route::get('/polling', PollingController::class)->name('polling');
    Route::get('/deferred-props', DeferredPropsController::class)->name('deferred-props');
    Route::get('/infinite-scroll', InfiniteScrollController::class)->name('infinite-scroll');
});

require __DIR__.'/settings.php';
