# Components Overview

This directory contains all React components for the chat application.

## Component Hierarchy

```
App (page.tsx)
├── UserProvider (context)
├── Header
│   └── UsernameEditor
├── MessageList
│   └── Post (renders individual messages)
└── ChatInput
```

## Component Descriptions

### Core Layout
- **Header**: App title + username display/editor
- **MessageList**: Scrollable list of messages with auto-scroll and polling
- **ChatInput**: Message input with validation and sending

### Utility Components
- **Post**: Individual message display (Twitch-style format)
- **UsernameEditor**: Click-to-edit username functionality

## Data Flow

1. **User Management**: Shared `UserProvider` context manages username/color globally
2. **Message Flow**: ChatInput → API → MessageList (via polling/invalidation)
3. **Real-time**: Uses 2-second polling instead of WebSockets for simplicity

## State Management

- **User State**: React Context (`UserProvider`) with localStorage persistence
- **Message State**: tRPC queries with 2-second polling
- **Form State**: Local component state for inputs

### User Context Usage
```typescript
const { userData, updateUsername, isLoading } = useUser();
```