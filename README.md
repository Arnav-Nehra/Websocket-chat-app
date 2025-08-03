# WebSocket Chat App

A real-time chat application built with WebSockets, featuring a monorepo structure using Turborepo.

## 🏗️ Architecture

This monorepo contains:

- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui
- **WebSocket Backend**: Real-time messaging server
- **HTTP Backend**: Authentication and API endpoints
- **Shared Types**: Common TypeScript types used across all apps

## 📁 Project Structure

```
websocket-chat-app/
├── apps/
│   ├── frontend/          # React + Vite frontend
│   ├── http-backend/      # Express.js HTTP server
│   └── websocket-backend/ # WebSocket server
├── packages/
│   └── types/            # Shared TypeScript types
├── package.json          # Root package.json with Turborepo
└── turbo.json           # Turborepo configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Install dependencies for all workspaces
npm install

# Build all packages
npm run build

# Start development servers
npm run dev
```

## 📦 Available Scripts

- `npm run build` - Build all packages and apps
- `npm run dev` - Start development servers for all apps
- `npm run lint` - Run linting across all workspaces
- `npm run clean` - Clean build outputs
- `npm run format` - Format code with Prettier

## 🔧 Development

### Running Individual Apps

```bash
# Frontend only
npm run dev --filter=@websocket-chat-app/frontend

# HTTP Backend only
npm run dev --filter=@websocket-chat-app/http-backend

# WebSocket Backend only
npm run dev --filter=@websocket-chat-app/websocket-backend
```

### Adding Dependencies

```bash
# Add to specific app
npm install <package> --workspace=@websocket-chat-app/frontend

# Add to shared package
npm install <package> --workspace=@websocket-chat-app/types
```

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, WebSocket (ws)
- **Authentication**: JWT
- **Validation**: Zod
- **Build Tool**: Turborepo
- **Language**: TypeScript

## 📝 Environment Variables

Create `.env` files in each app directory as needed:

- `apps/frontend/.env`
- `apps/http-backend/.env`
- `apps/websocket-backend/.env`

## 🤝 Contributing

1. Make changes in the appropriate workspace
2. Run `npm run build` to ensure everything compiles
3. Run `npm run lint` to check code quality
4. Test your changes locally with `npm run dev` 