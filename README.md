# Global Chat App

A real-time messaging application built with the T3 Stack, featuring Twitch-style chat UI and instant message updates.

![Global Chat Demo](https://dummyimage.com/800x400/18181B/EFEFF1?text=Global+Chat+App)

## Features

- **Real-time messaging** with 2-second polling updates
- **Username system** with localStorage persistence and click-to-edit functionality
- **Twitch-style UI** with alternating message backgrounds for better readability
- **Responsive design** that works on mobile (320px+) and desktop (up to 800px)
- **Character counter** and input validation (max 500 characters)
- **Random username generation** with fun adjective + noun + number combinations
- **Color-coded usernames** from a predefined palette
- **Auto-scroll** to bottom when new messages arrive
- **Loading states** and error handling

## Tech Stack

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://reactjs.org)** - UI library
- **[TypeScript](https://typescriptlang.org)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com)** - Styling
- **[tRPC](https://trpc.io)** - End-to-end typesafe APIs
- **[Prisma](https://prisma.io)** - Database ORM
- **[PostgreSQL](https://postgresql.org)** - Database
- **[Tanstack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Vitest](https://vitest.dev)** - Unit testing
- **[Playwright](https://playwright.dev)** - E2E testing

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd chat-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up PostgreSQL:

   ```bash
   # Install PostgreSQL (macOS)
   brew install postgresql@14
   brew services start postgresql@14

   # Create development database
   createdb chat_app_dev
   ```

4. Configure environment:

   ```bash
   # Copy environment file
   cp .env.example .env

   # Update DATABASE_URL in .env with your username:
   # DATABASE_URL="postgresql://your_username@localhost:5432/chat_app_dev"
   ```

5. Set up the database schema (creates Message table, generates Prisma client code):

   ```bash
   npm run db:push
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Against Production Database

To run your local app against the production database (useful for testing with real data):

1. Pull production environment variables:

   ```bash
   vercel env pull .env.local --environment=production
   ```

2. Update your `.env` file to use the production database:

   ```bash
   # Replace your local DATABASE_URL with the production one from .env.local
   DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=..."
   ```

3. Generate Prisma client for Accelerate:

   ```bash
   npx prisma generate --accelerate
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

**⚠️ Warning:** This connects to your live production database. Be careful with data modifications.

To switch back to local development, restore your local DATABASE_URL and run `npx prisma generate`.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks
- `npm run test` - Run unit tests with Vitest
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
src/
├── app/
│   ├── _components/     # React components
│   ├── api/trpc/        # tRPC API routes
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── server/
│   └── api/             # tRPC server setup and routers
├── utils/               # Utility functions
├── test/                # Test setup files
└── styles/              # Global styles
```

## Key Components

### Message System

- **Post**: Individual message display with timestamp, username, and content
- **MessageList**: Scrollable container with auto-scroll and real-time updates
- **ChatInput**: Message input with character counter and validation

### User Management

- **UsernameEditor**: Click-to-edit username functionality
- **Header**: App title and username display

### Utilities

- **Username generation**: Random adjective + noun + number combinations
- **Color management**: Predefined palette for username colors
- **Input validation**: Username and message content validation

## Database Schema

```prisma
model Message {
  id        Int      @id @default(autoincrement())
  content   String
  username  String
  color     String
  createdAt DateTime @default(now())
}
```

## API Endpoints

### tRPC Routes

- `message.getAll` - Fetch all messages in chronological order
- `message.create` - Create a new message with validation

## Testing

The app includes comprehensive testing:

- **Unit Tests**: Username utilities and React components
- **Component Tests**: Post component with various scenarios
- **E2E Tests**: Full user flows including message sending and username editing

Run tests:

```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```

## Deployment

Push to GitHub. Vercel deploys automatically.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run test`
5. Commit changes: `git commit -m "Description"`
6. Push to branch: `git push origin feature-name`
7. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Create T3 App](https://create.t3.gg/)
- Inspired by Twitch chat interface
- Uses T3 Stack best practices and conventions
