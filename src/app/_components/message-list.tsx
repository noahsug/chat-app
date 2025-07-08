"use client";

import { useCallback, useEffect, useRef } from "react";
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
  const wasAtBottomRef = useRef<boolean>(true); // Track if user was at bottom before new messages

  const isAtBottom = useCallback(() => {
    if (!containerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Consider "at bottom" if within 100px of the bottom
    return scrollHeight - scrollTop - clientHeight < 100;
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Track scroll position to determine if user was at bottom before new messages
  useEffect(() => {
    const handleScroll = () => {
      wasAtBottomRef.current = isAtBottom();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isAtBottom]);

  // Smart auto-scroll: scroll on initial load, then only when user is at bottom AND there's a new message
  useEffect(() => {
    const currentMessageCount = messages?.length ?? 0;
    const hasNewMessage = currentMessageCount > prevMessageCountRef.current;
    const isInitialLoad = !hasInitiallyScrolledRef.current && currentMessageCount > 0;

    // Scroll on initial page load or when user was at bottom and new message arrives
    if (isInitialLoad || (hasNewMessage && wasAtBottomRef.current)) {
      scrollToBottom();
      hasInitiallyScrolledRef.current = true;
      // After scrolling, user is now at bottom
      wasAtBottomRef.current = true;
    }

    prevMessageCountRef.current = currentMessageCount;
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto glass">
        <div className="mx-auto max-w-4xl p-6">
          <div className="glass p-6 rounded-3xl text-center animate-bounce-in">
            <div className="text-2xl animate-rainbow mb-2">🌟✨🌟</div>
            <div className="text-lg font-bold text-purple-800">Loading magical messages...</div>
            <div className="text-sm text-purple-600 mt-2 animate-float">Please wait while we sprinkle some fun! 🎨</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto glass">
        <div className="mx-auto max-w-4xl p-6">
          <div className="bg-red-200 border-4 border-red-400 p-6 rounded-3xl text-center animate-wiggle">
            <div className="text-3xl mb-2">🚨🔥🚨</div>
            <div className="text-lg font-bold text-red-800">Oops! Something went wrong!</div>
            <div className="text-sm text-red-600 mt-2">{error.message}</div>
            <div className="text-xs text-red-500 mt-2 animate-bounce">Don&apos;t worry, we&apos;re fixing it! 🔧✨</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto glass" ref={containerRef}>
      <div className="mx-auto max-w-4xl p-4">
        {messages?.length === 0 ? (
          <div className="text-center py-12 animate-bounce-in">
            <div className="glass p-8 rounded-3xl inline-block hover-grow">
              <div className="text-6xl mb-4 animate-float">🎉🌈🎉</div>
              <div className="text-2xl font-bold text-purple-800 mb-2">No messages yet!</div>
              <div className="text-lg text-purple-600 animate-wiggle">Be the first to spread some joy! ✨</div>
              <div className="text-sm text-purple-500 mt-2">Type something fun below! 👇</div>
            </div>
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
