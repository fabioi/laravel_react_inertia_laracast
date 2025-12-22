<?php

namespace App\Policies;

use App\Models\Puppy;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PuppyPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {

    }

    public function view(User $user, Puppy $puppy): bool
    {
    }

    public function create(User $user): bool
    {
    }

    public function update(User $user, Puppy $puppy): bool
    {
    }

    public function delete(User $user, Puppy $puppy): bool
    {
        return  $user->id === $puppy->user_id;
    }

    public function restore(User $user, Puppy $puppy): bool
    {
    }

    public function forceDelete(User $user, Puppy $puppy): bool
    {
    }
}
