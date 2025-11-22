<?php

use App\Http\Controllers\FormController;
use App\Http\Controllers\PartialReloadController;
use App\Http\Controllers\PollingController;
use App\Http\Controllers\DeferredPropsController;
use App\Http\Controllers\InfiniteScrollController;
use App\Http\Controllers\ViewTransitionController;
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

    Route::get('/form', [FormController::class, 'index'])->name('form.index');
    Route::post('/form', [FormController::class, 'store'])->name('form.store');
    Route::get('/view-transition', [ViewTransitionController::class, 'index'])->name('view-transition.index');
    Route::get('/view-transition/{item}', [ViewTransitionController::class, 'show'])->name('view-transition.show');
    Route::get('/partial-reload', [PartialReloadController::class, 'index'])->name('partial-reload.index');
    Route::get('/polling', PollingController::class)->name('polling');
    Route::get('/deferred-props', DeferredPropsController::class)->name('deferred-props');
    Route::get('/infinite-scroll', InfiniteScrollController::class)->name('infinite-scroll');
});

require __DIR__.'/settings.php';
