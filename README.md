# NestJS TypeScript Setup

A lightweight, modern TypeScript project configured with the NestJS framework.

## Prerequisites

Before starting, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) (installed automatically with Node.js)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

This will install NestJS core components, TypeScript compiler options, and the required runtime libraries.

### 2. Start the Development Server

Run the development script to boot the NestJS application:

```bash
npm run start:dev
```

This command runs `ts-node` to compile and launch the entry point in `src/main.ts`.

### 3. Verify the Application

Once the server has successfully started, open your web browser or run a GET request:

* **URL**: [http://localhost:3000](http://localhost:3000)
* **Expected Response**: `Hello World!`

---

## Project Structure

```text
├── src/
│   ├── main.ts            # Application bootstrap entry point
│   ├── app.module.ts      # Root module of the application
│   └── app.controller.ts  # Default controller containing the "/" route
├── tsconfig.json          # TypeScript compiler configuration (configured with decorators support)
└── package.json           # Project dependencies and script configurations
```