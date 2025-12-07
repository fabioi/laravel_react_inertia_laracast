<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\PuppyResource;
use App\Models\Puppy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;

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
    public function store(Request $request)
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

            // image optimization
            $image = Image::read($request->file('image'));


            // scale down only
            if ($image->width() > 1000 || $image->height() > 1000) {
                $image->scale(1000);
            }


            $webpEncoded = $image->toWebp(95)->toString();

            $filename = Str::random(10) . '.webp';

            $path = 'puppies/' . $filename;

            Storage::disk('public')->put($path, $webpEncoded);

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
