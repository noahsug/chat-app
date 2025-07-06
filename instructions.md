# Prompt

Create a brand new global messaging app using the T3 stack (Next.js, TypeScript, Tailwind CSS, tRPC, Prisma).

## Technical Requirements

### T3 Stack Setup

- Use `create-t3-app@latest` to scaffold the project.
- Include TypeScript, Tailwind CSS, tRPC, and Prisma.
- Skip NextAuth.js (no authentication needed for this simple app).
- Use SQLite database for local development (configured in Prisma schema).
- Use the App Router.

### Database Schema

- Create a `Message` table with fields:
  - `id` (auto-increment primary key)
  - `content` (text, max 500 characters)
  - `username` (string, max 50 characters)
  - `createdAt` (timestamp)
  - `color` (string, hex color code for the username)

### Real-time Updates

- Implement polling every 2 seconds to fetch new messages
- Display messages in real-time as they're posted
- Use `useEffect` with `setInterval` to poll for new messages

### Username System

- Generate random usernames using format: `adjective + noun + 3-digit number` (e.g., "HappyPanda123")
- Store username in localStorage to persist across browser sessions
- Allow users to click their username to edit it (validate: 3-50 characters, alphanumeric only, no spaces)

### Message Features

- Messages limited to 500 characters
- Each user gets a random bright color from predefined palette: `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#96CEB4`, `#FFEAA7`, `#DDA0DD`, `#98D8C8`, `#F7DC6F` (assigned when username is generated)
- Show timestamp in "HH:MM" format (24-hour)
- Display messages in chronological order (newest at bottom)

## User Journey

1. User visits webpage and sees existing messages from previous visitors
2. User is assigned a random username (displayed at top of chat)
3. User can click username to edit it
4. User types message (character counter shows remaining characters)
5. User clicks "Send" button to post message
6. Message appears immediately in chat with user's assigned color
7. New messages from other users appear automatically

## UI Design

### Layout

- Full-screen chat interface
- Header with app title and editable username
- Message area (scrollable, auto-scroll to bottom)
- Input area at bottom with text input and send button

### Message Display

- Twitch-style chat messages
- All messages left-aligned in a single column
- Each message format: `[HH:MM] username: message content`
- Username displayed in the assigned color, message content in white/light text
- No message bubbles - simple text-based layout
- Alternating subtle background colors for better readability

### Color Scheme

- Background: Dark theme similar to Twitch (`#18181B` or `#1F1F23`)
- Input area: Dark background (`#2F2F35`) with subtle border
- Send button: Purple (`#9146FF`) with hover effect
- Username colors: Use predefined bright palette for usernames only
- Message text: Light gray (`#EFEFF1`) for readability
- Timestamps: Muted gray (`#ADADB8`)

### Responsive Design

- Mobile-first approach
- Minimum width: 320px
- Maximum width: 800px (centered on desktop)
- Compact message spacing for chat-like feel
- Fixed-width font for timestamps to maintain alignment

## Error Handling

- Show loading states during message sending
- Display error messages for failed requests
- Validate message length before sending
- Handle network errors gracefully

## Setup Checklist

### Initial Setup Steps

1. Run `npm create t3-app@latest` with required options.
2. Configure Vitest, Playwright, Husky, and commitlint.

## Git Workflow

Commit after each major milestone:

1. Initial T3 app setup and configuration files
2. Database schema and Prisma setup
3. Basic UI components
4. tRPC API routes
5. Real-time messaging functionality
6. Username system
7. Final styling and polish

## Deployment

- Deploy to Vercel (not GitHub Pages, since this is a full-stack app)
- Use Vercel's built-in PostgreSQL database for production
- Update README.md with live demo link
- Deploy using Vercel CLI or GitHub integration

## Testing & Quality Tools

### Testing Strategy

- **Unit Tests**: Vitest + React Testing Library for component and utility testing.
- **E2E Tests**: Playwright for full user journey testing.
- **API Tests**: Supertest for tRPC route testing.
- **Component Tests**: Testing Library with MSW for API mocking.
- **Test Coverage**: Aim for 80%+ coverage on business logic.

### Development Tools

- **Storybook**: Component development and documentation
- **Bundle Analyzer**: Optimize bundle size and identify bloat
- **Vitest UI**: Interactive test runner interface

## Documentation

- README.md with live demo link and contributing instructions
- Include screenshots of the app
- Document API endpoints and database schema

## Future Improvements

- **Real-time Subscriptions**: Replace polling with tRPC subscriptions for instant message delivery and reduced server load
