# T3 Stack Global Chat App - Implementation Guide

## Project Overview

Building a real-time global messaging app using the T3 stack with Twitch-style chat UI.

## Commands

- `npm create t3-app@latest . --trpc --prisma --tailwind --typescript` - Initialize T3 app with Next.js 15 & React 19
- `npm run dev` - Start development server (with Turbopack)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint 9 with flat config
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run Vitest 3.0 test suite
- `npm run test:e2e` - Run Playwright E2E tests
- `npx prisma db push` - Push database schema
- `npx prisma studio` - Open Prisma Studio

## Code Standards

### TypeScript

- Use strict TypeScript with proper types
- Define interfaces for all data structures
- Use type guards instead of assertions
- Prefer `unknown` over `any`

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper TypeScript props interfaces
- Implement proper error boundaries

### Styling

- Use Tailwind CSS classes consistently
- Follow mobile-first responsive design
- Use CSS variables for theme colors
- Maintain consistent spacing scale

## Key Implementation Details

### Database Schema (Prisma)

```prisma
model Message {
  id        Int      @id @default(autoincrement())
  content   String   @db.VarChar(500)
  username  String   @db.VarChar(50)
  color     String   @db.VarChar(7)
  createdAt DateTime @default(now())
}
```

### tRPC API Structure

- `message.getAll` - Fetch all messages
- `message.create` - Create new message
- Input validation using Zod schemas
- Proper error handling

### Real-time Updates

- Use `useEffect` with `setInterval` for polling
- Poll every 2 seconds for new messages
- Clear intervals on component unmount
- Handle loading states properly

### Username Generation

- Format: `adjective + noun + number` (e.g., "HappyPanda123")
- Store in localStorage
- Validate on edit: 3-50 chars, alphanumeric + spaces

### Message Display

- Format: `[HH:MM] username: message content`
- Username in assigned color
- Message content in light text
- Auto-scroll to bottom on new messages

## Component Structure

### ChatInput.tsx

- Message input with character counter
- Send button with loading state
- Form validation and submission

### MessageList.tsx

- Scrollable message container
- Auto-scroll behavior
- Message rendering with proper formatting

### MessageBubble.tsx (rename to MessageItem.tsx)

- Individual message display
- Timestamp formatting
- Username color application

### UsernameEditor.tsx

- Click-to-edit username
- Input validation
- localStorage persistence

## Color Palette

```typescript
const MESSAGE_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
];

const THEME_COLORS = {
  background: "#18181B",
  surface: "#2F2F35",
  primary: "#9146FF",
  text: "#EFEFF1",
  textMuted: "#ADADB8",
};
```

## Error Handling

- Wrap API calls in try-catch
- Display user-friendly error messages
- Handle network failures gracefully
- Show loading states during operations

## Testing Strategy

- Unit tests for utility functions
- Component tests with React Testing Library
- API route tests with supertest
- Integration tests for user flows

## Performance Considerations

- Implement message limit (last 100 messages)
- Use React.memo for message components
- Debounce username changes
- Optimize re-renders with proper dependencies

## Deployment Notes

- Deploy to Vercel for full-stack support
- Use Vercel PostgreSQL for production database
- Set up proper environment variables
- Configure build and deploy scripts

## Git Workflow

Commit after each major feature:

1. T3 app setup and configuration
2. Database schema and Prisma setup
3. Basic UI layout and components
4. tRPC API implementation
5. Real-time messaging with polling
6. Username system and localStorage
7. Final styling and polish

## Common Pitfalls to Avoid

- Don't use `!` or `any` - use proper types
- Don't forget to clear intervals on unmount
- Don't render without proper loading states
- Don't skip input validation
- Don't forget to handle edge cases (empty messages, long usernames)
- Don't implement subscriptions initially - start with polling

## File Organization

```
src/
├── components/
│   ├── ChatInput.tsx
│   ├── MessageItem.tsx
│   ├── MessageList.tsx
│   └── UsernameEditor.tsx
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   └── api/trpc/[trpc].ts
├── server/
│   └── api/
│       ├── root.ts
│       └── routers/
│           └── message.ts
├── utils/
│   ├── api.ts
│   └── username.ts
├── styles/
│   └── globals.css
└── types/
    └── message.ts
```
