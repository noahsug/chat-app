"use client";

import { useEffect, useRef } from "react";
import { Post } from "./post";
import { api } from "@/trpc/react";

export function MessageList() {
  const { data: messages, isLoading, error } = api.message.getAll.useQuery(
    undefined,
    {
      refetchInterval: 2000, // Poll every 2 seconds
    }
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-gray-400 text-sm">Loading messages...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-red-400 text-sm">Error loading messages: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {messages?.length === 0 ? (
          <div className="p-4 text-gray-400 text-sm">
            No messages yet. Be the first to say hello!
          </div>
        ) : (
          messages?.map((message) => (
            <Post
              key={message.id}
              username={message.username}
              content={message.content}
              timestamp={message.createdAt}
              color={message.color}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}