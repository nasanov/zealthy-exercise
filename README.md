# Zealthy Exercise Next.js App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

-   Multi-step registration form (with dynamic step configuration)
-   Admin panel to configure which components appear on each step
-   User data table
-   PostgreSQL database with Prisma ORM

## Prerequisites

-   [Next.js Documentation](https://nextjs.org/docs)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Prisma Documentation](https://www.prisma.io/docs/)

## Setup

1. **Clone the repository:**

    ```bash
    git clone [<repo-url>](https://github.com/nasanov/zealthy-exercise)
    cd zealthy-exercise-next
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn
    ```

3. **Configure the database:**

    - Create a `.env` file.
    - Set your PostgreSQL connection string in `.env`:

        ```
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
        ```

4. **Generate Prisma client and run migrations:**

    ```bash
    npx prisma generate
    npx prisma migrate deploy
    ```

5. **(Optional) Seed the database:**

    ```bash
    make sure `tsx` is installed (`npm install --save-dev tsx`).
    npx prisma db seed
    ```

## Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Panel

-   Visit `/admin` to configure which components appear on each registration step.

## Data Table

-   Visit `/data` to see all registered users.

## Useful Commands

-   **Run migrations:** `npx prisma migrate dev`
-   **Open Prisma Studio:** `npx prisma studio`
-   **Seed database:** `npx prisma db seed`
