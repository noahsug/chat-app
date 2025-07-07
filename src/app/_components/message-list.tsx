"use client";

import { useEffect, useRef } from "react";
import { Post } from "./post";
import { api } from "@/trpc/react";

interface Message {
  id: number;
  username: string;
  content: string;
  createdAt: Date;
  color: string;
}

/**
 * Main message list component that displays all chat messages
 * Uses polling (every 2 seconds) for real-time updates instead of WebSockets
 * for simplicity and to work well with Vercel's serverless functions
 * 
 * Features smart auto-scroll: scrolls to bottom on initial page load, then only 
 * scrolls to new messages when user is at bottom, preserving reading position when scrolled up
 */
export function MessageList() {
  const query = api.message.getAll.useQuery(undefined, {
    refetchInterval: 2000, // Poll every 2 seconds for real-time feel
  });
  const { data: messages, isLoading, error } = query;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef<number>(0);
  const hasInitiallyScrolledRef = useRef<boolean>(false);

  const isAtBottom = () => {
    if (!containerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Consider "at bottom" if within 100px of the bottom
    return scrollHeight - scrollTop - clientHeight < 100;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Smart auto-scroll: scroll on initial load, then only when user is at bottom AND there's a new message
  useEffect(() => {
    const currentMessageCount = messages?.length ?? 0;
    const wasAtBottom = isAtBottom();
    const hasNewMessage = currentMessageCount > prevMessageCountRef.current;
    const isInitialLoad = !hasInitiallyScrolledRef.current && currentMessageCount > 0;

    // Scroll on initial page load or when user is at bottom and new message arrives
    if (isInitialLoad || (hasNewMessage && wasAtBottom)) {
      scrollToBottom();
      hasInitiallyScrolledRef.current = true;
    }

    prevMessageCountRef.current = currentMessageCount;
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl p-4">
          <div className="text-sm text-gray-400">Loading messages...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl p-4">
          <div className="text-sm text-red-400">
            Error loading messages: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto" ref={containerRef}>
      <div className="mx-auto max-w-4xl">
        {messages?.length === 0 ? (
          <div className="p-4 text-sm text-gray-400">
            No messages yet. Be the first to say hello!
          </div>
        ) : (
          messages?.map((message: Message, index: number) => (
            <Post
              key={message.id}
              username={message.username}
              content={message.content}
              timestamp={message.createdAt}
              color={message.color}
              isAlternate={index % 2 === 1} // Alternate row backgrounds for readability
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
