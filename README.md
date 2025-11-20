# Laravel + Inertia.js + React Tutorial

A modern full-stack application built with Laravel, Inertia.js, and React with TypeScript.

## Prerequisites

- Docker Desktop installed and running
- Git

## Getting Started with Laravel Sail

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-inertia-tutorial
```

### 2. Install Dependencies

First time setup requires installing Composer dependencies. Run this from your host machine:

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs
```

### 3. Configure Environment

Copy the environment file:

```bash
cp .env.example .env
```

### 4. Start Laravel Sail

```bash
./vendor/bin/sail up -d
```

Or create an alias for convenience:

```bash
alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'
```

Then you can use:

```bash
sail up -d
```

### 5. Generate Application Key

```bash
sail artisan key:generate
```

### 6. Run Database Migrations

```bash
sail artisan migrate
```

### 7. (Optional) Seed the Database

```bash
sail artisan db:seed
```

### 8. Install Node Dependencies

```bash
sail npm install
```

### 9. Start the Development Server

To enable hot module replacement (HMR) for automatic browser updates when you change React/JS code:

```bash
sail npm run dev
```

### 10. Access the Application

Open your browser and visit:

- **Application**: http://localhost
- **Vite Dev Server**: http://localhost:5173

## Development Workflow

### Running Artisan Commands

```bash
sail artisan <command>
```

### Running Composer Commands

```bash
sail composer <command>
```

### Running NPM Commands

```bash
sail npm <command>
```

### Running Tests

```bash
sail artisan test
```

### Accessing the Database

The application uses SQLite by default. The database file is located at `database/database.sqlite`.

To access it, you can use:

```bash
sail tinker
```

### Stopping Sail

```bash
sail down
```

To stop and remove volumes:

```bash
sail down -v
```

## Hot Module Replacement (HMR)

The project is configured with Vite for fast hot module replacement. When you run `sail npm run dev`, your React components will automatically reload in the browser when you save changes.

**Important**: Make sure the Vite dev server (`sail npm run dev`) is running to see your JavaScript/React changes automatically reflected.

## Project Structure

- `app/` - Laravel application code
- `resources/js/` - React components, pages, and TypeScript code
- `resources/css/` - Stylesheets
- `routes/` - Application routes
- `database/` - Migrations and seeders
- `tests/` - Application tests

## Tech Stack

- **Backend**: Laravel 11, PHP 8.4
- **Frontend**: React 19, TypeScript, Inertia.js
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 7
- **Dev Environment**: Laravel Sail (Docker)

## Troubleshooting

### Port Already in Use

If port 80 is already in use, you can change it in the `.env` file:

```env
APP_PORT=8080
```

Then restart Sail:

```bash
sail down
sail up -d
```

### Changes Not Reflecting in Browser

1. Make sure `sail npm run dev` is running
2. Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows/Linux)
3. Clear your browser cache

### Permission Issues

If you encounter permission issues, ensure the storage and bootstrap/cache directories are writable:

```bash
sail artisan storage:link
```

## Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com/)
- [Laravel Sail Documentation](https://laravel.com/docs/sail)
- [React Documentation](https://react.dev/)

