# Laravel + Inertia.js + React

A modern full-stack application built with Laravel, Inertia.js, and React with TypeScript.

## 🚀 Composer Scripts (Recommended)

Gli script Composer sono il modo più semplice per gestire lo sviluppo. Avviano automaticamente tutti i servizi necessari in parallelo.

### Development

```bash
composer run dev                 # Avvia server, queue, logs e Vite dev server (HMR)
composer run dev:ssr             # Versione con Server-Side Rendering
```

**Importante**: Usa `composer run dev` per vedere le modifiche React/TypeScript riflesse automaticamente nel browser.

### Testing

```bash
composer run test                # Esegue i test
```

## 🌐 Access

- **Application**: http://localhost
- **Vite Dev Server**: http://localhost:5173

## 📋 Comandi Complet

### Composer Scripts

```bash
composer run dev                 # Avvia tutto: server, queue, logs, vite
composer run dev:ssr            # Versione SSR
composer run test               # Esegue i test
```

### Sail Commands

```bash
sail up -d                      # Avvia i container in background
sail down                       # Ferma i container
sail down -v                    # Ferma e rimuove i volumi
```

### Artisan Commands

```bash
sail artisan <command>          # Esegue qualsiasi comando Artisan
sail artisan migrate            # Esegue le migrazioni del database
sail artisan db:seed            # Popola il database
sail artisan test               # Esegue i test
sail artisan tinker             # Accede al database via Tinker
```

### NPM Commands

```bash
sail npm <command>              # Esegue qualsiasi comando NPM
sail npm install                # Installa le dipendenze
sail npm run build              # Build per produzione
```

## Troubleshooting

### Changes Not Reflecting in Browser

1. Assicurati che `composer run dev` sia in esecuzione
2. Fai un hard refresh del browser (Cmd+Shift+R su Mac, Ctrl+Shift+R su Windows/Linux)

### Port Already in Use

Change `APP_PORT` in `.env` file, then restart Sail:

```bash
sail down
sail up -d
```
