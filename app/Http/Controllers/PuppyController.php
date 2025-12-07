<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\OptimizeWebpImageAction;
use App\Http\Resources\PuppyResource;
use App\Models\Puppy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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
                    ->latest()
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
    public function store(Request $request, OptimizeWebpImageAction $optimizeWebpImageAction)
    {
        sleep(2);

        $request->validate([
            'name' => 'required|string|max:255',
            'trait' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif, svg|max:5120',
        ]);

        $image_url = null;

        // store the upload image
        if ($request->hasFile('image')) {

            $optimizedImage = $optimizeWebpImageAction->handle($request->file('image'));

            $path = 'puppies/'.$optimizedImage['filename'];

            Storage::disk('public')->put($path, $optimizedImage['webpString']);

            $image_url = Storage::url($path);
        }

        Puppy::create([
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'trait' => $request->trait,
            'image_url' => $image_url,
        ]);

        return redirect()->back()->with('success', 'Puppy created successfully');
    }
}
