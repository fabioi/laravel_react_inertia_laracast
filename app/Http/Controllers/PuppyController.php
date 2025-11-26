<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Puppy;
use Inertia\Inertia;
use App\Http\Resources\PuppyResource;

class PuppyController extends Controller
{
    public function index(Request $request)
    {
        $searchQuery = $request->input('search');
        
        return Inertia::render('puppies/index', [
            'puppies' => PuppyResource::collection(
                Puppy::query()
                    ->when($searchQuery, function ($query) use ($searchQuery) {
                        $query->where('trait', 'like', "%$searchQuery%")
                            ->orWhere('name', 'like', "%$searchQuery%");
                    })->with(['user', 'likedBy'])
                    ->get()
            ),
        ]);
    }

    public function like(Request $request, Puppy $puppy)
    {
        sleep(1);
        $puppy->likedBy()->toggle($request->user()->id);

        return back();
    }
}
