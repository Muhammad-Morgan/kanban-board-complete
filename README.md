# Kanban Board

A full-stack kanban workspace built with Next.js App Router, NextAuth credentials, MongoDB/Mongoose, and React Query. The app focuses on a clear, fast task flow with per-user boards, simple CRUD, and a polished UI.

**Core Features**

- Credentials-based auth with hashed passwords.
- Per-user task boards with `backlog`, `in-progress`, `review`, and `done` columns.
- Task CRUD via server actions (`create`, `edit`, `delete`, `list`, `get single`).
- Search across task title + description using the `q` query param.
- Column order drag-and-drop using `@dnd-kit`.
- Light/dark theme toggle with `next-themes`.
- Route-level and global error boundaries.

**User Flow**

1. Visit the landing page at `/`.
2. Create an account at `/register` (POSTs to `/api/register`), then auto-signs in.
3. Log in at `/login` if you already have an account.
4. Land on `/tasks` where the board is hydrated with your tasks.
5. Use the search box to filter tasks (`/tasks?q=...`).
6. Add a task from `/tasks/create-task` (column can be preselected via `?column=...`).
7. Edit a task from `/tasks/edit-task/[id]`.
8. Delete tasks directly from the board.
9. Log out from the navbar.

**Architecture Notes**

- NextAuth v5 (`auth.ts`) provides `auth`, `signIn`, `signOut`, and route handlers.
- Server actions in `lib/*-service` enforce auth and validate with Zod before hitting MongoDB.
- React Query prefetch + hydration keeps the `/tasks` UI fast and responsive.
- `apiWrapper` standardizes API error handling for `/api/register`.

**Data Model**

- `User`: `name`, `email`, `password` (hashed).
- `Task`: `title`, `description`, `column`, `createdBy`, `timestamps`.

**Project Structure**

- `app/` Next.js routes, layouts, and pages.
- `app/api/` Next.js route handlers (`/api/register`, NextAuth handlers).
- `components/` UI, forms, and page sections.
- `lib/` server actions, db connection, zod schemas, API utilities.
- `models/` Mongoose models for `User` and `Task`.
- `utils/` client-side helpers (nav links, etc.).

**Scripts**

- `npm run dev` Start the dev server.
- `npm run build` Production build.
- `npm run start` Start the production server.
- `npm run lint` Run ESLint.
