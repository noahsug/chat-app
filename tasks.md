# Project Tasks

This document outlines the tasks for building the global messaging app.

## Workflow (**Important**)

- Read `instructions.md` before completing any tasks
- Check off subtasks as they're finished.
- When a task is done, check it off and create a git commit.

## Phase 1: Project Setup & Basic UI

- [x] **Task 1: Initial T3 App Setup (Human only)**
  - Run `npm create t3-app@latest` with the specified options (TypeScript, Tailwind CSS, tRPC, Prisma, Next.js App Router, SQLite, ESLint/Prettier).
- [x] **Task 2: Basic UI Layout**
  - [x] Create the main application layout in `src/app/layout.tsx`.
  - [x] Implement a dark theme background for the entire app.
  - [x] Create a header component that includes the application title.
  - [x] Create a message display area component.
  - [x] Create a message input area component with a text input and a "Send" button.
  - [x] Style the layout to be full-screen with the input area at the bottom.
- [ ] **Task 3: Static Message Display**
  - [ ] Create a `post.tsx` component to display a single message.
  - [ ] The component should accept props for `username`, `content`, `timestamp`, and `color`.
  - [ ] Style the message component according to the Twitch-style chat message format: `[HH:MM] username: message content`.
  - [ ] Add some hardcoded messages to the message display area to verify the styling.

## Phase 2: Database & API

- [ ] **Task 4: Database Schema**
  - [ ] Define the `Message` model in `prisma/schema.prisma` with the specified fields (`id`, `content`, `username`, `createdAt`, `color`).
  - [ ] Run `npx prisma db push` to sync the schema with the SQLite database.
- [ ] **Task 5: tRPC API Endpoints**
  - [ ] Create a `post` router in `src/server/api/routers/post.ts`.
  - [ ] Implement a `create` mutation to add a new message to the database.
    - [ ] The mutation should take `content`, `username`, and `color` as input.
    - [ ] Validate the input (e.g., message length).
  - [ ] Implement a `getAll` query to fetch all messages from the database in chronological order.

## Phase 3: Core Functionality

- [ ] **Task 6: Connecting UI to API**
  - [ ] In the main page component, use the `api.post.getAll.useQuery()` hook to fetch messages.
  - [ ] Render the fetched messages using the `post.tsx` component.
  - [ ] Implement the `create` mutation when the "Send" button is clicked.
  - [ ] Use the `api.post.create.useMutation()` hook.
  - [ ] On successful mutation, refetch the messages to display the new message.
- [ ] **Task 7: Real-time Updates (Polling)**
  - [ ] Use a `useEffect` hook with `setInterval` to refetch messages every 2 seconds.
  - [ ] Ensure the message list automatically scrolls to the bottom when new messages are added.
- [ ] **Task 8: Username System**
  - [ ] Create a utility function to generate a random username (`adjective + noun + 3-digit number`).
  - [ ] On initial page load, check for a username in `localStorage`.
  - [ ] If no username exists, generate a new one and a random color from the predefined palette.
  - [ ] Store the username and color in `localStorage`.
  - [ ] Display the username in the header.
  - [ ] Implement the functionality to allow users to click their username to edit it.
    - [ ] Add a text input that appears when the username is clicked.
    - [ ] Validate the new username (3-50 characters, alphanumeric, no spaces).
    - [ ] Update the username in `localStorage`.

## Phase 4: Polishing & Final Touches

- [ ] **Task 9: UI/UX Refinements**
  - [ ] Implement a character counter for the message input.
  - [ ] Add loading states for when messages are being sent.
  - [ ] Display error messages for failed requests.
  - [ ] Implement alternating background colors for messages for better readability.
  - [ ] Ensure the app is responsive and looks good on mobile devices (320px) and desktops (up to 800px).
- [ ] **Task 10: Testing**
  - [ ] Write unit tests for the username generation utility.
  - [ ] Write component tests for the `post.tsx` component.
  - [ ] Write E2E tests with Playwright to simulate a user sending a message.
- [ ] **Task 11: Documentation**
  - [ ] Update the `README.md` with a description of the project, a link to the live demo, and screenshots.
- [ ] **Task 12: Deployment**
  - [ ] Deploy the application to Vercel.
  - [ ] Configure the production environment to use Vercel's PostgreSQL database.
