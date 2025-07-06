# T3 Stack Chat App Implementation Tasks

## Instructions

After each task is complete:

- verify UX is as expected through e2e testing and taking a screenshot
- commit changes via git

## Phase 1: Project Setup & Configuration

### 1.1 Initial Setup

- [x] **Initialize T3 Project**
  - Run `npm create t3-app@latest . --trpc --prisma --tailwind --typescript`
  - When prompted, select: TypeScript, Tailwind CSS (Yes), tRPC (Yes),
    No authentication, Prisma (Yes), Next.js App Router (Yes), SQLite,
    ESLint/Prettier
  - Verify project structure is created correctly
  - ⚠️ Must be done by human as shell command is interactive

- [ ] **Create Configuration Files**
  - Create `.gitignore` with content from instructions.md
  - Create `.prettierrc` with content from instructions.md
  - Create `.env.example` with content from instructions.md
  - Copy `.env.example` to `.env.local` and update values for local development

- [ ] **Setup ESLint Configuration**
  - Create `eslint.config.js` with flat config format for ESLint 9
  - Configure TypeScript-specific rules and Next.js compatibility
  - Add Prettier integration to prevent conflicts

- [ ] **Install Development Dependencies**
  - Install all dev dependencies listed in instructions.md using `npm install --save-dev`
  - Update `package.json` scripts section with all scripts from instructions.md
  - Run `npm run lint` to verify ESLint setup

- [ ] **Configure Git Hooks**
  - Run `npx husky install` to initialize Husky
  - Create `.husky/pre-commit` hook that runs `npx lint-staged`
  - Create `commitlint.config.js` for conventional commit enforcement
  - Test git hooks by making a test commit

### 1.2 Database Setup

- [ ] **Design Prisma Schema**
  - Open `prisma/schema.prisma`
  - Replace default schema with Message model containing: id (Int, autoincrement, primary key), content (String, max 500 chars), username (String, max 50 chars), createdAt (DateTime, default now), color (String for hex color)
  - Ensure SQLite is configured as database provider

- [ ] **Initialize Database**
  - Run `npx prisma db push` to create database and apply schema
  - Run `npx prisma studio` to verify database structure
  - Test database connection by viewing empty Message table
  - **Note**: Human should verify database structure in Prisma Studio browser interface

---

## Phase 2: Core Backend Implementation

### 2.1 tRPC Router Setup

- [ ] **Create Message Router File**
  - Create `src/server/api/routers/message.ts`
  - Set up basic router structure with imports for z (Zod), createTRPCRouter, publicProcedure
  - Export messageRouter for use in root router

- [ ] **Update Root Router**
  - Open `src/server/api/root.ts`
  - Import messageRouter and add to router definition
  - Verify tRPC router type exports are working

### 2.2 Database Operations

- [ ] **Implement Get All Messages Endpoint**
  - Create `getAll` procedure in message router
  - Use `ctx.db.message.findMany()` with `orderBy: { createdAt: 'asc' }`
  - Limit results to last 100 messages to prevent memory issues
  - Return array of messages with all fields

- [ ] **Create Input Validation Schemas**
  - Define Zod schema for message creation: content (string, min 1, max 500), username (string, min 3, max 50, alphanumeric only), color (string, hex color format)
  - Add input validation to message creation procedure
  - Test validation with invalid inputs

- [ ] **Implement Create Message Endpoint**
  - Create `create` procedure with input validation schema
  - Use `ctx.db.message.create()` with validated data
  - Return created message with all fields
  - Handle database errors with try/catch and meaningful error messages

---

## Phase 3: Utility Functions & Business Logic

### 3.1 Username Generation System

- [ ] **Create Username Generator**
  - Create `src/utils/username.ts`
  - Define arrays of adjectives (20+ words) and nouns (20+ animals/objects)
  - Create function `generateUsername()` that returns format: `${adjective}${noun}${randomNumber}`
  - Random number should be 3 digits (100-999)
  - Export function for use in components

- [ ] **Create Color Assignment Logic**
  - In same file, define COLOR_PALETTE array with 8 hex colors from instructions
  - Create function `assignUserColor()` that returns random color from palette
  - Each user gets a random color when their username is generated

- [ ] **Implement LocalStorage Management**
  - Create functions: `saveUsername(username: string)`, `loadUsername(): string | null`, `saveUserColor(color: string)`, `loadUserColor(): string | null`
  - Handle localStorage not being available (SSR/server-side)
  - Add error handling for localStorage quota exceeded

### 3.2 Message Processing Utilities

- [ ] **Create Message Formatting Functions**
  - Create `src/utils/messages.ts`
  - Create `formatTimestamp(date: Date): string` that returns "HH:MM" format
  - Create `validateMessageContent(content: string): boolean` for client-side validation
  - Create `sanitizeInput(input: string): string` to clean user input

- [ ] **Create Character Counter Logic**
  - Create hook `useCharacterCounter(text: string, maxLength: number)`
  - Return object with: `count`, `remaining`, `isValid`, `percentage`
  - Include visual feedback states (normal, warning, error)

---

## Phase 4: Frontend Components

### 4.1 Core Components

- [ ] **Create MessageItem Component**
  - Create `src/components/MessageItem.tsx`
  - Props: `message` object with id, content, username, createdAt, color
  - Structure: `[timestamp] username: content` format
  - Apply username color from props, light gray for message content, muted gray for timestamp
  - Use fixed-width font for timestamp alignment

- [ ] **Create MessageList Component**
  - Create `src/components/MessageList.tsx`
  - Props: `messages` array
  - Create scrollable container with max-height
  - Map over messages and render MessageItem components
  - Implement auto-scroll to bottom when new messages arrive
  - Add ref management for scroll behavior

- [ ] **Create ChatInput Component**
  - Create `src/components/ChatInput.tsx`
  - Include textarea for message input, character counter, send button
  - Props: `onSendMessage(content: string)`, `disabled?: boolean`
  - Implement controlled input with React state
  - Add form validation and submission handling
  - Disable send button when message is empty or too long

- [ ] **Create UsernameEditor Component**
  - Create `src/components/UsernameEditor.tsx`
  - Display username as clickable text that becomes input field when clicked
  - Props: `username`, `onUsernameChange(newUsername: string)`
  - Include validation feedback and save/cancel buttons
  - Save to localStorage on successful change

### 4.2 Layout & Styling

- [ ] **Create Main Chat Layout**
  - Update `src/pages/index.tsx` with full-screen chat layout
  - Structure: header (app title + username), message area (flex-grow), input area (fixed bottom)
  - Use Flexbox for layout, ensure mobile responsiveness
  - Add proper spacing and container max-width (800px)

- [ ] **Apply Dark Theme Styling**
  - Update `src/styles/globals.css` with color variables from instructions
  - Apply dark background (`#18181B`), dark surface (`#2F2F35`), purple accent (`#9146FF`)
  - Style all components with consistent dark theme
  - Add hover effects and focus states

- [ ] **Implement Responsive Design**
  - Add responsive breakpoints using Tailwind CSS
  - Ensure minimum width of 320px is supported
  - Test touch-friendly interface on mobile devices
  - Adjust font sizes and spacing for different screen sizes

---

## Phase 5: Real-time Features & State Management

### 5.1 Message Polling System

- [ ] **Set Up Polling Hook**
  - Create custom hook `useMessagePolling()` in `src/hooks/useMessagePolling.ts`
  - Use `setInterval` to fetch messages every 2 seconds
  - Include cleanup on component unmount with `clearInterval`
  - Handle component lifecycle and avoid memory leaks

- [ ] **Implement Optimistic Updates**
  - When user sends message, immediately add to local state
  - Mark as "pending" until server confirms
  - On success, replace pending message with server response
  - On failure, remove pending message and show error

- [ ] **Add Loading States**
  - Create loading indicators for message sending
  - Disable input and send button during API calls
  - Show visual feedback for polling status
  - Handle network errors gracefully

### 5.2 State Management

- [ ] **Create Message State Management**
  - Use React hooks (useState, useEffect) for message state
  - Implement message deduplication by ID
  - Handle race conditions between polling and user actions
  - Maintain scroll position when appropriate

- [ ] **Integrate Username System**
  - Load username and color from localStorage on component mount
  - Generate new username/color if none exists
  - Update localStorage when username changes
  - Sync username changes across components

---

## Phase 6: Enhanced User Experience

### 6.1 Auto-scroll Behavior

- [ ] **Implement Auto-scroll Behavior**
  - Auto-scroll to bottom when new messages arrive
  - Use `scrollIntoView()` for smooth scrolling
  - Ensure messages stay visible as they're added

### 6.2 Keyboard Shortcuts

- [ ] **Add Input Keyboard Handling**
  - Enter key to send message (prevent default form submission)
  - Shift+Enter for new line in message
  - Escape key to cancel username editing
  - Tab navigation for accessibility

### 6.3 Error Handling

- [ ] **Implement Comprehensive Error Handling**
  - Network error handling with retry mechanisms
  - Validation error display with user-friendly messages
  - Database error handling on backend
  - Graceful degradation when features fail

- [ ] **Add Retry Logic**
  - Implement exponential backoff for failed requests
  - Show retry buttons for failed messages
  - Handle offline/online state changes
  - Prevent spam from repeated retries

---

## Phase 7: Testing Setup

### 7.1 Unit Testing

- [ ] **Configure Vitest Environment**
  - Create `vitest.config.ts` with React Testing Library setup
  - Configure test environment with jsdom
  - Set up test utilities and mocks for tRPC and Prisma

- [ ] **Write Utility Function Tests**
  - Test username generation produces correct format
  - Test color assignment returns valid hex colors
  - Test message formatting functions
  - Test localStorage wrapper functions

- [ ] **Write Component Tests**
  - Test MessageItem renders correctly with props
  - Test ChatInput validation and submission
  - Test UsernameEditor edit functionality
  - Test MessageList scrolling behavior

### 7.2 API Testing

- [ ] **Test tRPC Endpoints**
  - Test message.getAll returns messages in correct order
  - Test message.create with valid and invalid inputs
  - Test error handling for database failures
  - Mock database for isolated testing

### 7.3 End-to-End Testing

- [ ] **Set Up Playwright**
  - Create `playwright.config.ts` with browser configurations
  - Set up test database for E2E tests
  - Configure CI/CD pipeline integration

- [ ] **Write User Journey Tests**
  - Test complete message sending flow
  - Test username editing functionality
  - Test real-time message updates
  - Test responsive design on different devices

---

## Phase 8: Performance Optimization

### 8.1 Message Optimization

- [ ] **Implement Message Limiting**
  - Limit displayed messages to last 100 in memory
  - Implement virtual scrolling for large message lists
  - Add pagination or "load more" functionality
  - Clean up old messages from state

- [ ] **Optimize React Renders**
  - Wrap MessageItem in React.memo with custom comparison
  - Use useMemo for expensive calculations (message formatting)
  - Use useCallback for event handlers passed to children
  - Minimize unnecessary re-renders with proper dependency arrays

### 8.2 Bundle Optimization

- [ ] **Analyze Bundle Size**
  - Install and configure Bundle Analyzer
  - Identify large dependencies and opportunities for optimization
  - Implement code splitting for non-critical features
  - Use dynamic imports where appropriate

---

## Phase 9: Production Deployment

### 9.1 Environment Configuration

- [ ] **Set Up Production Environment**
  - Configure production environment variables
  - Set up PostgreSQL database on Vercel
  - Update Prisma schema for PostgreSQL
  - Run database migrations in production

- [ ] **Deploy to Vercel**
  - Connect GitHub repository to Vercel
  - Configure build settings and environment variables
  - Set up custom domain if needed
  - Test production deployment

### 9.2 Monitoring

- [ ] **Set Up Error Tracking**
  - Configure error monitoring service
  - Set up logging for API endpoints
  - Monitor database performance
  - Create alerts for critical errors

---

## Phase 10: Documentation & Polish

### 10.1 Documentation

- [ ] **Write Project README**
  - Include setup instructions and prerequisites
  - Document tech stack and architecture decisions
  - Add API documentation with request/response examples
  - Include troubleshooting section

- [ ] **Add Code Documentation**
  - Add JSDoc comments to complex functions
  - Document component props with TypeScript interfaces
  - Add inline comments for business logic
  - Document environment variables and configuration

### 10.2 Final Testing

- [ ] **Manual Testing**
  - Test all features across different browsers
  - Verify mobile responsiveness
  - Test edge cases and error scenarios
  - Performance testing under load

- [ ] **Security Review**
  - Audit input validation and sanitization
  - Check for XSS vulnerabilities
  - Review dependency security
  - Verify CORS and security headers
