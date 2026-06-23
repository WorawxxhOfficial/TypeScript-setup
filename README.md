# NestJS TypeScript Setup

A lightweight, modern TypeScript project configured with the NestJS framework, supporting full CRUD operations for Task management with built-in validation, logging, and error handling.

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) (installed automatically with Node.js)

---

## Getting Started

### 1. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 2. Start the Development Server

Run the development script to boot the NestJS application:

```bash
npm run start:dev
```

* **Default port**: `3000` (or set via `PORT` environment variable, e.g., `PORT=3001 npm run start:dev`).

---

## Global System Components

The project is pre-configured with the following global modules in [main.ts](file:///Users/mac/Documents/Typescript-setup/TypeScript-setup/src/main.ts):

* **ValidationPipe**: Performs payload validation using `class-validator` and `class-transformer`.
  * `whitelist: true` – Strips properties that do not have validation decorators.
  * `forbidNonWhitelisted: true` – Rejects request and throws `400 Bad Request` if any non-whitelisted property is present.
  * `transform: true` – Automatically parses incoming payloads into typed DTO instances.
* **HttpExceptionFilter**: Standardizes error response structure for all HTTP exceptions across the entire app.
* **LoggingInterceptor**: Logs HTTP method, request path, and execution duration (ms) in the console.

---

## API Endpoints

### Core Endpoints
* **`GET /`** - Default greeting ("Hello World!").

### Task Management (`/tasks`)
The tasks are persistent in memory until the application is restarted. Task IDs are generated as UUIDs.

| Method | Endpoint | Description | Request Body / Params | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/tasks` | Create a new task | `{ "title": "string", "description"?: "string", "dueDate"?: "ISO8601 Date" }` | `201 Created` |
| **GET** | `/tasks` | Retrieve all tasks | *None* | `200 OK` |
| **GET** | `/tasks/:id` | Retrieve a single task by ID | `id` (must be a valid UUID) | `200 OK` (or `404` / `400`) |
| **PATCH** | `/tasks/:id` | Update task status or details | `{ "title"?: "string", "status"?: "todo" \| "doing" \| "done", "description"?: "string" }` | `200 OK` (or `404` / `400`) |
| **DELETE** | `/tasks/:id` | Delete task by ID | `id` (must be a valid UUID) | `200 OK` (or `404` / `400`) |

#### Error Response Format
All HTTP errors (like Validation errors or Not Found exceptions) are returned in a standardized format:
```json
{
  "statusCode": 400,
  "path": "/tasks/abc",
  "timestamp": "2026-06-23T06:27:48.017Z",
  "message": "Validation failed (uuid is expected)"
}
```

---

## Testing with Bruno

A Bruno API collection is available in the `bruno/` directory:

1. Open **Bruno API Client**.
2. Click **Open Collection** and select the [bruno/](file:///Users/mac/Documents/Typescript-setup/TypeScript-setup/bruno) folder in this project root.
3. Use the collection to test all endpoints. For endpoints requiring an `:id`, replace `PASTE_YOUR_TASK_ID_HERE` with the UUID returned from your **Create Task** response.

---

## Project Structure

```text
├── bruno/                 # Bruno API requests collection
├── src/
│   ├── main.ts            # Entry point of the NestJS application (registers Pipes/Filters/Interceptors)
│   ├── app.module.ts      # Core App module
│   ├── app.controller.ts  # Hello World controller
│   ├── common/            # Shared guards, interceptors, and filters
│   │   ├── http-exception.filter.ts # Standardizes error JSON outputs
│   │   └── logging.interceptor.ts   # Logs request metrics
│   └── tasks/             # Tasks feature module
│       ├── tasks.module.ts          # Tasks module declaration
│       ├── tasks.controller.ts      # Exposes CRUD endpoints with ParseUUIDPipe
│       ├── tasks.service.ts         # In-memory CRUD database logic
│       ├── task.types.ts            # Task types ('todo' | 'doing' | 'done')
│       ├── pipes/
│       │   └── trim.pipe.ts         # Custom pipe to trim body strings
│       └── dto/
│           ├── create-task.dto.ts   # Rules validation for creating tasks
│           └── update-task.dto.ts   # Rules validation for updating tasks
├── tsconfig.json          # TypeScript compiler options
└── package.json           # Dependencies and run scripts
```