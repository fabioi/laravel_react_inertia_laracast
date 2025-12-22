<?php

namespace App\Providers;

use App\Models\Puppy;
use App\Policies\PuppyPolicy;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        // Register policy explicitly
        Gate::policy(Puppy::class, PuppyPolicy::class);
    }
}
