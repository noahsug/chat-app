# Components Overview

This directory contains all React components for the chat application.

## Component Hierarchy

```
App (page.tsx)
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

1. **User Management**: Each component calls `getUserData()` independently (TODO: move to shared context)
2. **Message Flow**: ChatInput → API → MessageList (via polling/invalidation)
3. **Real-time**: Uses 2-second polling instead of WebSockets for simplicity

## State Management

Currently uses local component state + localStorage. Consider moving to React Context for shared user state.