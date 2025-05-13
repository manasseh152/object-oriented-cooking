# Object Oriented Cooking - Project Design & Architecture Document

## Project Overview

Object Oriented Cooking is a full-stack application designed to manage recipes, meal planning, and cooking-related activities. The system uses a modern tech stack with separate frontend and backend components in a monorepo structure.

## Repository Structure

The project is organized as a monorepo with multiple applications and shared packages:

```sh
object-oriented-cooking/
├── apps/
│   ├── api/             # Backend API service
│   └── web/             # Frontend web application
└── packages/
    └── eslint-config/   # Shared ESLint configurations
```

## Technology Stack

### Backend (API)

- **Runtime**: Bun
- **Framework**: Hono
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validation**: Valibot
- **Error Handling**: Neverthrow

### Frontend (Web)

- **Framework**: React
- **Build Tool**: Vite
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: TanStack Store
- **Data Fetching**: TanStack Query
- **Form Validation**: Valibot
- **Internationalization**: i18n support (English and Dutch)

## Database Design

The database schema is designed around a cooking and recipe management system with the following main entities:

### Core Entities

1. **Recipes**

   - Contains recipe details like title, description, instructions, preparation time, cooking time
   - Has difficulty levels (easy, medium, hard, expert)
   - Linked to categories, ingredients, steps, and tags

2. **Categories**

   - Organizes recipes (e.g., Breakfast, Dinner, Dessert)
   - Has name, description, and color properties

3. **Ingredients**

   - Stores information about cooking ingredients
   - Tracks nutritional info (calories) and common measurement units

4. **Steps**

   - Contains cooking instructions for recipes
   - Organized by order with optional duration and images

5. **Tags**

   - Provides additional classification for recipes
   - Has name and color properties

6. **Meal Plans**
   - Allows planning meals over a date range
   - Contains meal slots for specific dates and meal types

### Schema Details

The database uses PostgreSQL with Drizzle ORM for schema definition:

#### Enumerations

- **Recipe Difficulty**: `easy`, `medium`, `hard`, `expert`
- **Measurement Units**: `g`, `kg`, `ml`, `l`, `tsp`, `tbsp`, `cup`, `oz`, `lb`, `pinch`, `piece`

#### Common Features

- All tables include timestamp tracking (created_at, updated_at, deleted_at)
- UUID identifiers for public-facing references
- Appropriate indexing for common query patterns
- Relational constraints with cascade deletion where appropriate

## API Structure

The API is built with Hono on the Bun runtime, following an RPC-like structure:

```sh
api/
├── src/
│   ├── config/           # Configuration
│   │   └── env.ts        # Environment configuration
│   └── database/         # Database layer
│       ├── config.ts     # Common DB configurations
│       ├── index.ts      # DB connection setup
│       └── schema.ts     # Database schema definition
```

### API Endpoints

The API follows an RPC-like structure with two main endpoint types:

- **Query endpoints**: `localhost:3000/query` (HTTP GET)

  - Used for fetching data
  - Parameters passed as URL query parameters
  - Examples: getRecipes, getRecipeById, searchIngredients

- **Mutation endpoints**: `localhost:3000/mutation` (HTTP POST)
  - Used for creating, updating, or deleting data
  - Parameters passed in the request body as JSON
  - Examples: createRecipe, updateIngredient, deleteMealPlan

This approach simplifies the API structure while maintaining a clear separation between read and write operations. Each query or mutation has a defined signature for parameters and return types.

**Note:** All RPC queries and mutations are implemented directly in the `index.ts` file and are not organized into separate grouped/nested routers as the client doesn't support this structure.

## Frontend Structure

The web application is built with React and Vite, using TanStack Router for routing:

```sh
web/
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # UI components
│   │   ├── form/         # Form components
│   │   ├── form-fields/  # Form field components
│   │   ├── ui/           # UI components
│   │   └── providers/    # React context providers
│   ├── config/           # App configuration
│   ├── features/         # Feature-based components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   └── routes/           # Application routes
```

## Environment Configuration

The application uses environment-based configuration:

### API Environment Variables

- `NODE_ENV`: Runtime environment (`development`, `production`, `test`)
- `PORT`: Server port
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET`: Secret key for authentication/security

### Web Environment Variables

- Basic environment flags (`dev`, `prod`)

## Development Setup

### Prerequisites

- Bun (JavaScript runtime)
- Docker and Docker Compose (for PostgreSQL)

## Database Operations

- Generate migrations: `bun db:generate` (in API directory)
- Apply migrations: `bun db:migrate` (in API directory)

## International Support

The web application includes internationalization (i18n) with support for:

- English (en)
- Dutch (nl)

Translation files are organized by feature in the `/public/locales/` directory.

## UI Components

The application uses a component library based on Tailwind CSS and Shadcn UI:

- Form elements (input fields, checkboxes, etc.)
- Layout components
- Theme system with light/dark mode support
- Language selector component

## Extending the Application

### Adding New Database Models

1. Define the model in schema.ts
2. Generate migrations using `bun db:generate`
3. Apply migrations using `bun db:migrate`

### Adding New API Endpoints

1. Create a new directory in `apps/api/src/api/`
2. Define the endpoint logic following the existing patterns

### Adding New Frontend Routes

1. Create new route files in routes
2. Update TanStack Router configuration if necessary

## Additional Notes

- The project uses Drizzle ORM for database interactions
- Validation is handled with Valibot across both frontend and backend
- The frontend supports theme switching and internationalization
- The API follows a RESTful approach with appropriate error handling
