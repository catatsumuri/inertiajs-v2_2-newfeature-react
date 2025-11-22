<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    public function index()
    {
        return Inertia::render('forms/index', [
            'submittedData' => session('submitted_data'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'tags' => 'required|array',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file',
        ]);

        $dataToStore = [
            'title' => $validated['title'],
            'body' => $validated['body'],
            'tags' => $validated['tags'],
        ];

        if (isset($validated['attachments'])) {
            $dataToStore['attachments'] = collect($validated['attachments'])->map(fn ($file) => $file->getClientOriginalName())->toArray();
        }

        return redirect()->route('form.index')->with('submitted_data', $dataToStore);
    }
}
