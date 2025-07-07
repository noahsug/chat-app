"use client";

import React from "react";
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
 */
export function MessageList() {
  const query = api.message.getAll.useQuery(undefined, {
    refetchInterval: 2000, // Poll every 2 seconds for real-time feel
  });
  const { data: messages, isLoading, error } = query;

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
    <div className="flex-1 overflow-y-auto">
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
      </div>
    </div>
  );
}
