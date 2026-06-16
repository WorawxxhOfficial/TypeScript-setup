# NestJS TypeScript Setup

A lightweight, modern TypeScript project configured with the NestJS framework, supporting full CRUD operations for Task management.

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

## API Endpoints

### Core Endpoints
* **`GET /`** - Default greeting ("Hello World!").

### Task Management (`/tasks`)
The tasks are persistent in memory until the application is restarted.

| Method | Endpoint | Description | Request Body / Params | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/tasks` | Create a new task | `{ "title": "string" }` | `201 Created` |
| **GET** | `/tasks` | Retrieve all tasks | *None* | `200 OK` |
| **GET** | `/tasks/:id` | Retrieve a single task by ID | `id` in Path | `200 OK` (or `404` if not found) |
| **PATCH** | `/tasks/:id` | Update task status or title | `{ "title"?: "string", "status"?: "OPEN" \| "IN_PROGRESS" \| "DONE" }` | `200 OK` (or `404` if not found) |
| **DELETE** | `/tasks/:id` | Delete task by ID | `id` in Path | `200 OK` (or `404` if not found) |

---

## Testing with Bruno

A Bruno API collection is available in the `bruno/` directory:

1. Open **Bruno API Client**.
2. Click **Open Collection** and select the [bruno/](file:///Users/mac/Documents/Typescript-setup/TypeScript-setup/bruno) folder in this project root.
3. Use the collection to test all endpoints. For endpoints requiring an `:id`, replace `PASTE_YOUR_TASK_ID_HERE` with the ID returned from your **Create Task** response.

---

## Project Structure

```text
├── bruno/                 # Bruno API requests collection
├── src/
│   ├── main.ts            # Entry point of the NestJS application
│   ├── app.module.ts      # Core App module
│   ├── app.controller.ts  # Hello World controller
│   └── tasks/             # Tasks feature module
│       ├── tasks.module.ts     # Tasks feature module declaration
│       ├── tasks.controller.ts # Tasks controller exposing REST endpoints
│       ├── tasks.service.ts    # Tasks service (in-memory database & CRUD logic)
│       └── task.types.ts       # Type definitions (Task interface and TaskStatus)
├── tsconfig.json          # TypeScript compiler options
└── package.json           # Dependencies and run scripts
```