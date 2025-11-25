<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Puppy;
use Inertia\Inertia;
use App\Http\Resources\PuppyResource;

class PuppyController extends Controller
{
    public function index()
    {
        return Inertia::render('puppies/index', [
            'puppies' => PuppyResource::collection(Puppy::all()->load(['user', 'likedBy'])),
        ]);
    }

    public function like(Request $request, Puppy $puppy)
    {
        sleep(3);
        $puppy->likedBy()->toggle($request->user()->id);

        return back();
    }
}
