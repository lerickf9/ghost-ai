Prisma is already installed. Add the project data models, Prisma client singleton, and first migration. 

## Models

Create `prisma/models/project.prisma`.

Add `Project`:

- Owner ID mapped to Clerk user
- name
- Optional description
- status enum: `DRAFT`, `ARCHIVED`
- `canvasJsonPath` for future canvas blob storage
- timesstamps
- indexes on owner ID and cration date

Add `ProjectCollaborator`:

- project relation with cascade delete
- collaborator email
- creation timestap
- unique contraint on project/email

Do not add extra fields unless required by Prisma.

## Prisma Client

Create `lib/prisma.ts` as a cached singleton.

Branch by `DATABASE_URL`:

- if it starts with `prisma+postgres://`, use Accelerate
- otherwise use direct `@prisma/adapter-pg`

Cache the client on `global` in development for hot reloads.

## Migration

Run the migration and generate the client.

## Dependencies

Already installed:

- `prisma`
- `@prisma/client`
- `@prisma/adapter-pg`
- `pg`

## Check When Done

- schema has both models with correct relations and indexes
- `lib/primsa.ts` exports one cached Prisma instance
- migration runs succesfully
- `npm run build` passes

