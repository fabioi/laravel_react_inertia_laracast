<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PuppyResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'trait' => $this->trait,
            'imageUrl' => $this->image_url,
            'likedBy' => UserResource::collection($this->whenLoaded('likedBy'))->pluck('id'),
            // Make is used when we load one relationship
            'user' => UserResource::make($this->whenLoaded('user')),
        ];
    }
}
