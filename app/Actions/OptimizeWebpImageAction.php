<?php

declare(strict_types=1);

namespace App\Actions;

use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class OptimizeWebpImageAction
{
      public function handle(string $input): array
      {
            // image optimization
            $image = Image::read($input);

            // scale down only
            if ($image->width() > 1000) {
                  $image->scale(1000);
            }

            $webpEncoded = $image->toWebp(95)->toString();
            $filename = Str::random() . '.webp';

            return [
                  'filename' => $filename,
                  'webpString' => $webpEncoded,
            ];
      }
}
