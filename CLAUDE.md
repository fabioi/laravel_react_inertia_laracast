# Laravel Inertia React Project Documentation

## Overview

This is a modern full-stack web application built with Laravel 12 and React 19, using Inertia.js as the bridge between the backend and frontend. The project follows a monolithic architecture with server-side rendering (SSR) support.

## Technology Stack

### Backend
- **PHP 8.2+** - Server-side language
- **Laravel 12** - PHP framework
- **Inertia Laravel 2.0** - Server-side adapter for Inertia.js
- **Intervention Image Laravel** - Image processing
- **Ziggy** - Named route helpers for JavaScript
- **Laravel Pail** - Log tailing
- **Log Viewer** - opcodesio/log-viewer for web-based log viewing

### Frontend
- **React 19** - UI library
- **TypeScript 5.7** - Type-safe JavaScript
- **Inertia.js React 2.0** - Client-side adapter
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Headless UI** - Additional unstyled components
- **next-themes** - Theme management (dark mode)
- **Sonner** - Toast notifications
- **Lucide React** - Icon library
- **react-error-boundary** - Error boundary wrapper

### Development Tools
- **Pest** - PHP testing framework
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Laravel Pint** - PHP code style fixer
- **Concurrently** - Run multiple commands simultaneously

### Database
- **SQLite** (default) - Can be switched to MySQL, PostgreSQL, etc.

### Container Support
- **Laravel Sail** - Docker development environment
- **Docker Compose** - Container orchestration

## Project Structure

```
.
├── app/
│   ├── Actions/              # Single-purpose action classes
│   ├── Console/              # Artisan commands
│   ├── Http/
│   │   ├── Controllers/      # Request handlers
│   │   │   ├── Auth/         # Authentication controllers
│   │   │   └── Settings/     # Settings controllers
│   │   ├── Middleware/       # HTTP middleware
│   │   └── Resources/        # API resources (transformers)
│   ├── Models/               # Eloquent models
│   └── Providers/            # Service providers
├── bootstrap/                # Framework bootstrap files
├── config/                   # Configuration files
├── database/
│   ├── factories/            # Model factories
│   ├── migrations/           # Database migrations
│   └── seeders/              # Database seeders
├── docker/                   # Docker configuration files
├── public/                   # Publicly accessible files
├── resources/
│   ├── css/                  # Global styles
│   │   └── app.css           # Main CSS entry point
│   ├── js/
│   │   ├── components/       # React components
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Layout components
│   │   │   ├── app/          # App layouts
│   │   │   ├── auth/         # Auth layouts
│   │   │   └── settings/     # Settings layouts
│   │   ├── pages/            # Inertia page components
│   │   │   ├── auth/         # Authentication pages
│   │   │   ├── puppies/      # Puppy pages
│   │   │   └── settings/     # Settings pages
│   │   ├── queries/          # API query utilities
│   │   ├── types/            # TypeScript type definitions
│   │   ├── app.tsx           # Client-side entry point
│   │   └── ssr.tsx           # SSR entry point
│   └── views/                # Blade templates (minimal)
├── routes/
│   ├── auth.php              # Authentication routes
│   ├── settings.php          # Settings routes
│   └── web.php               # Web routes
├── storage/                  # Storage files (logs, cache, uploads)
├── tests/                    # Test files
└── vendor/                   # Composer dependencies
```

## Key Conventions

### Backend Conventions

#### Controllers
- Located in `app/Http/Controllers/`
- Return Inertia responses using `Inertia::render()`
- Use API Resources to transform data before passing to frontend
- Follow RESTful conventions

Example:
```php
use Inertia\Inertia;

public function index(Request $request)
{
    return Inertia::render('puppies/index', [
        'puppies' => PuppyResource::collection(
            Puppy::query()->latest()->paginate(6)
        ),
    ]);
}
```

#### API Resources
- Located in `app/Http/Resources/`
- Transform Eloquent models into arrays for frontend
- Standardize data structure sent to React

#### Actions
- Located in `app/Actions/`
- Single-purpose classes for complex operations
- Follow the Single Responsibility Principle

#### Models
- Located in `app/Models/`
- Use Eloquent ORM
- Define relationships, casts, and fillable attributes

#### Routes
- Split into logical files (`web.php`, `auth.php`, `settings.php`)
- Use named routes for Ziggy integration
- Group related routes with middleware

Example:
```php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
});
```

### Frontend Conventions

#### Pages
- Located in `resources/js/pages/`
- Default exports (named based on file path)
- Receive props from Laravel controllers
- Each page corresponds to an Inertia route

Example structure:
```tsx
export default function PageName({ propFromLaravel }: Props) {
    return <div>Content</div>;
}
```

#### Components
- Located in `resources/js/components/`
- Named exports or default exports
- Use TypeScript interfaces for props
- UI components in `components/ui/` (shadcn-style)

#### Layouts
- Located in `resources/js/layouts/`
- Organized by context (app, auth, settings)
- Can be nested

#### Types
- Located in `resources/js/types/`
- `index.d.ts` - Main type definitions
- `global.d.ts` - Global type augmentations
- `vite-env.d.ts` - Vite environment types

#### Path Aliases
- `@/*` maps to `resources/js/*`
- `ziggy-js` maps to vendor Ziggy package

Example:
```tsx
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
```

#### Styling
- Tailwind CSS for styling
- Supports dark mode via `next-themes`
- Use Tailwind v4 syntax
- CSS files in `resources/css/`

## Development Commands

### Backend Commands

```bash
# Start development server with all services (recommended)
composer dev
# Runs: server, queue listener, pail logs, and vite concurrently

# Start with SSR support
composer dev:ssr

# Run tests
composer test
php artisan test

# Code formatting
./vendor/bin/pint

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Fresh migration with seed
php artisan migrate:fresh --seed

# Generate application key
php artisan key:generate

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Queue worker
php artisan queue:work
php artisan queue:listen --tries=1

# View logs in real-time
php artisan pail

# Start SSR server
php artisan inertia:start-ssr

# Serve application
php artisan serve
```

### Frontend Commands

```bash
# Development (Vite dev server)
npm run dev

# Build for production
npm run build

# Build with SSR
npm run build:ssr

# Type checking
npm run types

# Linting
npm run lint

# Code formatting
npm run format
npm run format:check
```

### Docker Commands

```bash
# Start Sail containers
./vendor/bin/sail up
./vendor/bin/sail up -d  # Detached mode

# Stop containers
./vendor/bin/sail down

# Run artisan commands
./vendor/bin/sail artisan migrate

# Run composer commands
./vendor/bin/sail composer install

# Run npm commands
./vendor/bin/sail npm install
```

## Inertia.js Patterns

### Basic Inertia Flow

1. **Route Definition** (routes/web.php)
```php
Route::get('/puppies', [PuppyController::class, 'index'])->name('puppies.index');
```

2. **Controller Response** (app/Http/Controllers/PuppyController.php)
```php
public function index()
{
    return Inertia::render('puppies/index', [
        'puppies' => Puppy::all(),
    ]);
}
```

3. **React Page** (resources/js/pages/puppies/index.tsx)
```tsx
export default function Index({ puppies }: { puppies: Puppy[] }) {
    return <div>{/* Render puppies */}</div>;
}
```

### Navigation

Use Inertia's Link component for client-side navigation:

```tsx
import { Link } from '@inertiajs/react';

<Link href={route('puppies.index')}>View Puppies</Link>
```

### Forms

Use Inertia's form helper for form submissions:

```tsx
import { useForm } from '@inertiajs/react';

const { data, setData, post, processing, errors } = useForm({
    name: '',
    trait: '',
});

const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('puppies.store'));
};
```

### Shared Data

Access shared data from HandleInertiaRequests middleware:

```tsx
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

const { auth, ziggy } = usePage<SharedData>().props;
```

### Flash Messages

Laravel flash messages are automatically shared via the `flash` prop:

```tsx
const { flash } = usePage<SharedData>().props;

if (flash.success) {
    toast.success(flash.success);
}
```

### Manual Visits

For programmatic navigation:

```tsx
import { router } from '@inertiajs/react';

router.visit(route('puppies.show', puppy.id));
router.post(route('puppies.store'), data);
router.patch(route('puppies.update', puppy.id), data);
router.delete(route('puppies.destroy', puppy.id));
```

### Partial Reloads

Only fetch specific props on reload:

```tsx
router.reload({ only: ['puppies'] });
```

### Preserve Scroll

Maintain scroll position during navigation:

```tsx
<Link href={route('puppies.index')} preserveScroll>View Puppies</Link>
```

### Server-Side Rendering (SSR)

SSR is configured in `resources/js/ssr.tsx`. To use SSR:

1. Build SSR assets: `npm run build:ssr`
2. Start SSR server: `php artisan inertia:start-ssr`
3. Or use: `composer dev:ssr`

## Common Workflows

### Creating a New Page

1. Create a route in `routes/web.php`:
```php
Route::get('/example', [ExampleController::class, 'index'])->name('example.index');
```

2. Create controller method:
```php
public function index()
{
    return Inertia::render('example/index', [
        'data' => Example::all(),
    ]);
}
```

3. Create page component at `resources/js/pages/example/index.tsx`:
```tsx
export default function Index({ data }) {
    return <div>Content</div>;
}
```

### Adding a New Component

1. Create component file in `resources/js/components/`
2. Define TypeScript interface for props
3. Import and use in pages or other components

### Working with Forms

1. Use `useForm` hook from Inertia
2. Handle validation errors from Laravel
3. Display errors near form fields
4. Show success messages via flash

Example:
```tsx
const { data, setData, post, processing, errors } = useForm({
    name: '',
});

<Input
    value={data.name}
    onChange={(e) => setData('name', e.target.value)}
    error={errors.name}
/>
```

### Adding New Routes

1. Define in appropriate route file
2. Use named routes for Ziggy compatibility
3. Group with middleware as needed
4. Update TypeScript types if needed

### Database Changes

1. Create migration: `php artisan make:migration create_examples_table`
2. Define schema in migration file
3. Run migration: `php artisan migrate`
4. Create/update model: `php artisan make:model Example`
5. Add relationships and fillable attributes

### Image Handling

This project uses Intervention Image for image processing:

```php
use App\Actions\OptimizeWebpImageAction;

$optimized = (new OptimizeWebpImageAction)->handle($request->file('image'));
Storage::disk('public')->put($path, $optimized['webpString']);
```

## Environment Configuration

Key environment variables:

```env
APP_NAME=Laravel              # Application name
APP_ENV=local                 # Environment (local, production)
APP_DEBUG=true                # Debug mode
APP_URL=http://localhost      # Base URL

DB_CONNECTION=sqlite          # Database driver
QUEUE_CONNECTION=database     # Queue driver
SESSION_DRIVER=database       # Session storage

VITE_APP_NAME="${APP_NAME}"   # Exposed to frontend
```

## Testing

Tests are written using Pest:

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/ExampleTest.php

# Run with coverage
php artisan test --coverage
```

## Code Style

### PHP
- Use Laravel Pint for formatting: `./vendor/bin/pint`
- Follow PSR-12 standards
- Use strict types: `declare(strict_types=1);`

### TypeScript/React
- Use Prettier for formatting: `npm run format`
- Use ESLint for linting: `npm run lint`
- Prefer functional components with hooks
- Use TypeScript for type safety

## Authentication

Authentication is handled through Laravel Breeze-style implementation:

- Routes in `routes/auth.php`
- Controllers in `app/Http/Controllers/Auth/`
- Pages in `resources/js/pages/auth/`
- Middleware: `auth`, `guest`, `verified`

## Additional Features

### Toast Notifications
Uses Sonner for toast notifications:

```tsx
import { toast } from 'sonner';

toast.success('Success message');
toast.error('Error message');
toast.warning('Warning message');
toast.info('Info message');
```

### Dark Mode
Implemented via `next-themes`:

```tsx
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();
setTheme('dark'); // or 'light', 'system'
```

### Named Routes (Ziggy)
Access Laravel routes in JavaScript:

```tsx
import { route } from 'ziggy-js';

const url = route('puppies.show', { puppy: 1 });
// Outputs: /puppies/1
```

## Tips & Best Practices

1. Always use Inertia's Link component for internal navigation
2. Use `route()` helper (Ziggy) instead of hardcoded URLs
3. Transform data with API Resources before sending to frontend
4. Keep pages simple, extract reusable logic into components
5. Use TypeScript interfaces for all props
6. Leverage Inertia's form helpers for better UX
7. Handle validation on backend, display errors on frontend
8. Use flash messages for user feedback
9. Implement optimistic UI updates when appropriate
10. Use shared data for globally available information

## Troubleshooting

### Vite Issues
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Inertia Version Mismatch
```bash
# Clear Laravel caches
php artisan cache:clear
php artisan config:clear

# Rebuild assets
npm run build
```

### Type Errors
```bash
# Regenerate Ziggy routes
php artisan ziggy:generate

# Check types
npm run types
```

### SSR Issues
```bash
# Rebuild SSR bundle
npm run build:ssr

# Restart SSR server
php artisan inertia:stop-ssr
php artisan inertia:start-ssr
```