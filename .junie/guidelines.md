Project-specific development guidelines

Overview
- Stack: Laravel 12 (PHP 8.2+), Inertia.js (server adapter: inertia-laravel ^2), React 19 + TypeScript via Vite 7, Tailwind CSS 4.
- Monorepo-style Laravel app with a Vite-driven SPA mounted through Inertia. SSR is supported but optional.

Build and configuration
1) Requirements
- PHP 8.2+, Composer
- Node.js 18+ (recommended 20+), npm
- SQLite is sufficient for local/testing (tests run against :memory: DB)

2) One-shot setup (recommended)
- The Composer script `composer setup` automates first-time install:
  - composer install
  - copies .env if missing and runs `php artisan key:generate`
  - runs `php artisan migrate --force`
  - npm install
  - npm run build

3) Running in development
- PHP + Vite (no SSR):
  - composer dev
    - Runs concurrently: `php artisan serve`, `php artisan queue:listen`, `php artisan pail` (Laravel logs), and `npm run dev` (Vite with HMR).
  - Frontend entry points are configured in `vite.config.ts`: `resources/css/app.css`, `resources/js/app.tsx`.
- With SSR enabled:
  - npm run build:ssr
  - composer dev:ssr
    - Starts the PHP server, queue worker, pail logs, Vite build watcher, and Inertia SSR server (`php artisan inertia:start-ssr`).

4) Environment/ports and external services
- The frontend contains a demo data layer that calls an external local API:
  - See `resources/js/queries/index.ts` which fetches from `http://localhost:3001/api/puppies` (GET/POST/PATCH routes).
  - This API is not provided by the Laravel app; run your own mock/server on port 3001 to avoid client errors when visiting pages that use these queries (CORS: ensure the API returns appropriate CORS headers if you access it via the browser).
- Database
  - For normal dev, configure DB in `.env` and run migrations: `php artisan migrate`.
  - For tests, an in-memory SQLite database is used by default (see phpunit.xml), so no local DB service is required for testing.

Testing
1) Test runner
- PHPUnit 11.x is installed. Primary command: `php artisan test`.
- Provided Composer script: `composer test` which runs `php artisan config:clear` then `php artisan test`.
- phpunit.xml config:
  - DB: `DB_CONNECTION=sqlite`, `DB_DATABASE=:memory:`
  - Other env tuned for tests (cache=array, queue=sync, etc.).

2) Running tests
- Full suite: `composer test` or `php artisan test`.
- Single file: `php artisan test tests/Feature/DashboardTest.php`.
- Filtered by test name (regex): `php artisan test --filter=TwoFactorAuthenticationTest`.
- You can also invoke the underlying runner directly if you prefer: `./vendor/bin/phpunit` with the same filters.

3) Adding a new test (PHPUnit)
- Location: place unit tests under `tests/Unit`, feature tests under `tests/Feature`.
- Database usage: If your test uses Eloquent, prefer `RefreshDatabase` to auto-migrate against the in-memory SQLite database.
- Minimal demo (Unit test):
  - Create `tests/Unit/GuidelinesDemoTest.php` with the following contents:
    ```php
    <?php
    declare(strict_types=1);

    use PHPUnit\Framework\TestCase;

    final class GuidelinesDemoTest extends TestCase
    {
        public function test_truthy_math_works(): void
        {
            $this->assertSame(4, 2 + 2);
        }
    }
    ```
  - Run just that file: `php artisan test tests/Unit/GuidelinesDemoTest.php`
  - Or run the entire suite: `composer test`
  - When finished, delete the file: `rm tests/Unit/GuidelinesDemoTest.php`

4) Notes about Composer scripts and filtering
- `composer test -- --filter=...` does not work with the current script because it runs multiple sub-commands. Use `php artisan test --filter=...` or `vendor/bin/phpunit --filter=...` instead.

Frontend development specifics
- Vite configuration: see `vite.config.ts`.
  - Plugins: `laravel-vite-plugin` (with SSR entry `resources/js/ssr.tsx`), `@vitejs/plugin-react` with `babel-plugin-react-compiler`, `@tailwindcss/vite`, and `@laravel/vite-plugin-wayfinder`.
  - JSX transform is set to `automatic` in esbuild.
- Inertia/React structure:
  - Main SPA entry: `resources/js/app.tsx` (mounted in `resources/views/app.blade.php`).
  - Pages typically live in `resources/js/pages/`.
  - Shared UI components are under `resources/js/components/`.
  - Type definitions under `resources/js/types/`.
  - Routes are defined server-side in `routes/web.php` and mapped to Inertia pages.
- Tailwind CSS v4 is enabled via the official Vite plugin; utility classes are available in `resources/css/app.css`.

Code style and quality
- PHP
  - Use Laravel Pint for PHP formatting (installed as dev dependency). Run: `./vendor/bin/pint` to format, or configure your editor to run Pint on save.
- TypeScript/React
  - ESLint and Prettier are configured for the `resources/` tree.
  - Commands:
    - Lint (auto-fix): `npm run lint`
    - Format write: `npm run format`
    - Format check: `npm run format:check`
    - Type-check only: `npm run types`
- Import organization is handled by `prettier-plugin-organize-imports`; Tailwind class sorting by `prettier-plugin-tailwindcss`.

Operational/dev tooling
- `composer dev` uses `concurrently` to orchestrate multiple dev processes. Colors and names are configured for clarity in the terminal.
- `php artisan pail` streams Laravel logs with rich formatting; helpful during interactive dev.
- `queue:listen` runs with `--tries=1` in dev to surface job errors immediately.

Troubleshooting tips specific to this project
- If React HMR does not trigger, ensure `npm run dev` is running and the app is loaded from the Vite-served assets (check page source for `@vite` injected scripts). Restart `composer dev` if needed.
- SSR issues: rebuild both client and server bundles with `npm run build:ssr` and restart `composer dev:ssr`.
- Feature tests failing with DB errors often indicate a missing migration or a test not using the appropriate database trait. Ensure migrations exist and include `use RefreshDatabase;` when needed.
- Frontend errors referencing `http://localhost:3001/api/puppies` mean the external demo API is not up. Start a compatible mock server or adjust the endpoints in `resources/js/queries/index.ts` for your environment.

Housekeeping
- Example/demo artifacts used in this document should be removed after verification. Ensure only `.junie/guidelines.md` remains after following the demo.
