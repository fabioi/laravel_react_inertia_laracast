<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Puppy;

class PuppyController extends Controller
{
    public function like(Request $request, Puppy $puppy)
    {
        sleep(3);
        $puppy->likedBy()->toggle($request->user()->id);

        return back();
    }
}
