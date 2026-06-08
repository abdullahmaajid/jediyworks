# JEDIYWORKS

A creative collective platform built with Next.js (App Router), Prisma, and Tailwind CSS.

## Getting Started

Follow these steps to get the project running locally:

### 1. Clone & Install

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and configure your `DATABASE_URL`. You can use a local PostgreSQL database or a hosted one like Supabase.

### 3. Setup Database

Run the setup command to run migrations and seed the database with initial circle members and sample projects:

```bash
npm run db:setup
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built app in production mode.
- `npm run db:setup`: Runs migrations and seeds the database.
- `npm run db:migrate`: Runs Prisma migrations.
- `npm run db:seed`: Runs the Prisma seed script.
- `npm run db:studio`: Opens Prisma Studio to view the database.
# jediyworks
