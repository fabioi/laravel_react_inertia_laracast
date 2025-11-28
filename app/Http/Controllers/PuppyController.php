<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Puppy;
use Inertia\Inertia;
use App\Http\Resources\PuppyResource;

class PuppyController extends Controller
{

    /** INDEX */
    public function index(Request $request)
    {
        $search = $request->input('search');

        return Inertia::render('puppies/index', [
            'puppies' => PuppyResource::collection(
                Puppy::query()
                    ->when($search, function ($query) use ($search) {
                        $query->where('trait', 'like', "%$search%")
                            ->orWhere('name', 'like', "%$search%");
                    })->with(['user', 'likedBy'])
                    ->paginate(6)
                    ->withQueryString()
            ),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /** LIKE */
    public function like(Request $request, Puppy $puppy)
    {
        sleep(1);
        $puppy->likedBy()->toggle($request->user()->id);

        return back();
    }


    /** STORE */
    public function store(Request $request)
    {
        dd($request->all());
        // Dopo il dd() non arriverai mai qui, ma se vuoi continuare:
        return redirect()->back();
    }
}
