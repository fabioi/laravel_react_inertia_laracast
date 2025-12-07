<?php

namespace Database\Seeders;

use App\Actions\OptimizeWebpImageAction;
use App\Models\Puppy;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PuppySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $puppies = [
            ['name' => 'Bella', 'trait' => 'Always happy', 'image' => '10.jpg'],
            ['name' => 'Rex', 'trait' => 'Fetches everything', 'image' => '9.jpg'],
            ['name' => 'Luna', 'trait' => 'Howls at the moon', 'image' => '8.jpg'],
            ['name' => 'Yoko', 'trait' => 'Ready for anything', 'image' => '6.jpg'],
            ['name' => 'Russ', 'trait' => 'Ready to save the world', 'image' => '5.jpg'],
            ['name' => 'Pupi', 'trait' => 'Loves cheese', 'image' => '4.jpg'],
            ['name' => 'Leia', 'trait' => 'Enjoys naps', 'image' => '3.jpg'],
            ['name' => 'Chase', 'trait' => 'Very good boi', 'image' => '2.jpg'],
            ['name' => 'Frisket', 'trait' => 'Mother of all pups', 'image' => '1.jpg'],
            ['name' => 'Max', 'trait' => 'Loves to dig holes', 'image' => '11.jpg'],
            ['name' => 'Charlie', 'trait' => 'Chases squirrels', 'image' => '12.jpg'],
            ['name' => 'Cooper', 'trait' => 'Sleeps all day', 'image' => '13.jpg'],
            ['name' => 'Buddy', 'trait' => 'Best friend ever', 'image' => '14.jpg'],
            ['name' => 'Rocky', 'trait' => 'Tough but gentle', 'image' => '15.jpg'],
            ['name' => 'Duke', 'trait' => 'Noble and proud', 'image' => '16.jpg'],
            ['name' => 'Bear', 'trait' => 'Big and cuddly', 'image' => '17.jpg'],
            ['name' => 'Tucker', 'trait' => 'Always hungry', 'image' => '18.jpg'],
            ['name' => 'Oliver', 'trait' => 'Loves belly rubs', 'image' => '19.jpg'],
            ['name' => 'Jack', 'trait' => 'Playful spirit', 'image' => '20.jpg'],
            ['name' => 'Bentley', 'trait' => 'Sophisticated pup', 'image' => '21.jpg'],
            ['name' => 'Milo', 'trait' => 'Curious explorer', 'image' => '22.jpg'],
            ['name' => 'Toby', 'trait' => 'Loves water', 'image' => '1.jpg'],
            ['name' => 'Zeus', 'trait' => 'King of the park', 'image' => '2.jpg'],
            ['name' => 'Finn', 'trait' => 'Adventurous soul', 'image' => '3.jpg'],
            ['name' => 'Jasper', 'trait' => 'Gentle giant', 'image' => '4.jpg'],
            ['name' => 'Oscar', 'trait' => 'Loves treats', 'image' => '5.jpg'],
            ['name' => 'Leo', 'trait' => 'Brave and bold', 'image' => '6.jpg'],
            ['name' => 'Teddy', 'trait' => 'Soft and fluffy', 'image' => '7.jpg'],
            ['name' => 'Murphy', 'trait' => 'Mischievous', 'image' => '8.jpg'],
            ['name' => 'Louie', 'trait' => 'Loves to bark', 'image' => '9.jpg'],
            ['name' => 'Winston', 'trait' => 'Distinguished gentleman', 'image' => '10.jpg'],
            ['name' => 'Gus', 'trait' => 'Snores loudly', 'image' => '11.jpg'],
            ['name' => 'Ollie', 'trait' => 'Energetic bundle', 'image' => '12.jpg'],
            ['name' => 'Sammy', 'trait' => 'Friendly to all', 'image' => '13.jpg'],
            ['name' => 'Hank', 'trait' => 'Loyal companion', 'image' => '14.jpg'],
            ['name' => 'Buster', 'trait' => 'Loves to play fetch', 'image' => '15.jpg'],
            ['name' => 'Moose', 'trait' => 'Big paws', 'image' => '16.jpg'],
            ['name' => 'Baxter', 'trait' => 'Smart cookie', 'image' => '17.jpg'],
            ['name' => 'Diesel', 'trait' => 'Strong and sturdy', 'image' => '18.jpg'],
            ['name' => 'Jax', 'trait' => 'Cool and calm', 'image' => '19.jpg'],
            ['name' => 'Ace', 'trait' => 'Top dog', 'image' => '20.jpg'],
            ['name' => 'Ziggy', 'trait' => 'Quirky personality', 'image' => '21.jpg'],
            ['name' => 'Apollo', 'trait' => 'Majestic presence', 'image' => '22.jpg'],
            ['name' => 'Rusty', 'trait' => 'Loves mud puddles', 'image' => '1.jpg'],
            ['name' => 'Scout', 'trait' => 'Always exploring', 'image' => '2.jpg'],
            ['name' => 'Harley', 'trait' => 'Rides in style', 'image' => '3.jpg'],
            ['name' => 'Marley', 'trait' => 'Carefree spirit', 'image' => '4.jpg'],
            ['name' => 'Boomer', 'trait' => 'Loud and proud', 'image' => '5.jpg'],
            ['name' => 'Koda', 'trait' => 'Wild at heart', 'image' => '6.jpg'],
            ['name' => 'Gunner', 'trait' => 'Protective guardian', 'image' => '7.jpg'],
            ['name' => 'Ranger', 'trait' => 'Loves the outdoors', 'image' => '8.jpg'],
            ['name' => 'Bandit', 'trait' => 'Steals socks', 'image' => '9.jpg'],
            ['name' => 'Hunter', 'trait' => 'Keen senses', 'image' => '10.jpg'],
            ['name' => 'Rocco', 'trait' => 'Tough exterior', 'image' => '11.jpg'],
            ['name' => 'Simba', 'trait' => 'Lion-hearted', 'image' => '12.jpg'],
            ['name' => 'Tank', 'trait' => 'Built like a tank', 'image' => '13.jpg'],
            ['name' => 'Copper', 'trait' => 'Shiny coat', 'image' => '14.jpg'],
            ['name' => 'Bruno', 'trait' => 'Strong and silent', 'image' => '15.jpg'],
            ['name' => 'Benji', 'trait' => 'Sweet and loving', 'image' => '16.jpg'],
            ['name' => 'Cody', 'trait' => 'Playful prankster', 'image' => '17.jpg'],
            ['name' => 'Riley', 'trait' => 'Happy-go-lucky', 'image' => '18.jpg'],
            ['name' => 'Dexter', 'trait' => 'Clever thinker', 'image' => '19.jpg'],
            ['name' => 'Archie', 'trait' => 'Old soul', 'image' => '20.jpg'],
            ['name' => 'Loki', 'trait' => 'Trickster god', 'image' => '21.jpg'],
            ['name' => 'Thor', 'trait' => 'Mighty warrior', 'image' => '22.jpg'],
            ['name' => 'Odin', 'trait' => 'Wise and knowing', 'image' => '1.jpg'],
            ['name' => 'Maverick', 'trait' => 'Independent spirit', 'image' => '2.jpg'],
            ['name' => 'Cash', 'trait' => 'Valuable companion', 'image' => '3.jpg'],
            ['name' => 'Blue', 'trait' => 'Unique coloring', 'image' => '4.jpg'],
            ['name' => 'Shadow', 'trait' => 'Follows everywhere', 'image' => '5.jpg'],
            ['name' => 'Chance', 'trait' => 'Lucky pup', 'image' => '6.jpg'],
            ['name' => 'King', 'trait' => 'Rules the house', 'image' => '7.jpg'],
            ['name' => 'Prince', 'trait' => 'Royal demeanor', 'image' => '8.jpg'],
            ['name' => 'Champ', 'trait' => 'Winner at heart', 'image' => '9.jpg'],
            ['name' => 'Spike', 'trait' => 'Spiky personality', 'image' => '10.jpg'],
            ['name' => 'Brutus', 'trait' => 'Gentle giant', 'image' => '11.jpg'],
            ['name' => 'Maximus', 'trait' => 'Gladiator spirit', 'image' => '12.jpg'],
            ['name' => 'Caesar', 'trait' => 'Born leader', 'image' => '13.jpg'],
            ['name' => 'Titan', 'trait' => 'Enormous heart', 'image' => '14.jpg'],
            ['name' => 'Atlas', 'trait' => 'Carries the world', 'image' => '15.jpg'],
            ['name' => 'Hercules', 'trait' => 'Super strong', 'image' => '16.jpg'],
            ['name' => 'Goliath', 'trait' => 'Giant size', 'image' => '17.jpg'],
            ['name' => 'Samson', 'trait' => 'Powerful presence', 'image' => '18.jpg'],
            ['name' => 'Rambo', 'trait' => 'Fearless fighter', 'image' => '19.jpg'],
            ['name' => 'Axel', 'trait' => 'Loves to spin', 'image' => '20.jpg'],
            ['name' => 'Blaze', 'trait' => 'Fast runner', 'image' => '21.jpg'],
            ['name' => 'Storm', 'trait' => 'Wild energy', 'image' => '22.jpg'],
            ['name' => 'Flash', 'trait' => 'Lightning quick', 'image' => '1.jpg'],
            ['name' => 'Dash', 'trait' => 'Speedy gonzales', 'image' => '2.jpg'],
            ['name' => 'Rocket', 'trait' => 'Zooms around', 'image' => '3.jpg'],
            ['name' => 'Turbo', 'trait' => 'High energy', 'image' => '4.jpg'],
            ['name' => 'Nitro', 'trait' => 'Explosive personality', 'image' => '5.jpg'],
            ['name' => 'Bolt', 'trait' => 'Super fast', 'image' => '6.jpg'],
            ['name' => 'Jet', 'trait' => 'Flies through life', 'image' => '7.jpg'],
            ['name' => 'Sparky', 'trait' => 'Full of energy', 'image' => '8.jpg'],
            ['name' => 'Pepper', 'trait' => 'Spicy attitude', 'image' => '9.jpg'],
            ['name' => 'Peanut', 'trait' => 'Small but mighty', 'image' => '10.jpg'],
            ['name' => 'Biscuit', 'trait' => 'Sweet treat', 'image' => '11.jpg'],
            ['name' => 'Cookie', 'trait' => 'Loves snacks', 'image' => '12.jpg'],
            ['name' => 'Muffin', 'trait' => 'Soft and sweet', 'image' => '13.jpg'],
            ['name' => 'Waffles', 'trait' => 'Breakfast lover', 'image' => '14.jpg'],
            ['name' => 'Pancake', 'trait' => 'Flat and fluffy', 'image' => '15.jpg'],
            ['name' => 'Noodle', 'trait' => 'Long and wiggly', 'image' => '16.jpg'],
            ['name' => 'Pickles', 'trait' => 'Sour sometimes', 'image' => '17.jpg'],
            ['name' => 'Taco', 'trait' => 'Loves Tuesdays', 'image' => '18.jpg'],
            ['name' => 'Nacho', 'trait' => 'Cheesy personality', 'image' => '19.jpg'],
            ['name' => 'Oreo', 'trait' => 'Black and white', 'image' => '20.jpg'],
            ['name' => 'Snickers', 'trait' => 'Makes you laugh', 'image' => '21.jpg'],
            ['name' => 'Skittles', 'trait' => 'Colorful character', 'image' => '22.jpg'],
        ];

        $simon = User::first();

        $optimizer = new OptimizeWebpImageAction;

        foreach ($puppies as $puppy) {

            // Optimize the image
            $input = storage_path('app/public/puppies/'.$puppy['image']);
            $optimized = $optimizer->handle($input);

            // Grab the path of the image
            $path = 'puppies/'.$optimized['fileName'];

            // Store that image
            Storage::disk('public')->put($path, $optimized['webpString']);

            Puppy::create([
                'user_id' => $simon->id,
                'name' => $puppy['name'],
                'trait' => $puppy['trait'],
                'image_url' => Storage::url($path),
            ]);
        }
    }
}
