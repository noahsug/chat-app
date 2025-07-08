"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { useUser } from "@/contexts/user-context";

/**
 * Chat input component with message validation and sending
 * Uses shared user context for consistent state management
 */
export function ChatInput() {
  const [message, setMessage] = useState("");
  const { userData, isLoading } = useUser();
  const utils = api.useUtils();

  const createMessage = api.message.create.useMutation({
    onSuccess: async () => {
      // Invalidate the message list to trigger refetch and show new message immediately
      // This works with polling to ensure instant UI update
      await utils.message.getAll.invalidate();
      setMessage("");
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && userData.username) {
      createMessage.mutate({
        content: message.trim(),
        username: userData.username,
        color: userData.color,
      });
    }
  };

  return (
    <div className="glass border-t-4 border-white/40 p-6 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="✨ Share your magical thoughts... Type something fun! 🌈"
                className="w-full bg-white/90 text-slate-800 placeholder-purple-500 px-6 py-4 rounded-2xl border-4 border-pink-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-pink-400 shadow-lg transition-all duration-300 font-medium text-lg hover-grow"
                maxLength={500}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl animate-float">
                🎭
              </div>
            </div>
            <div className="flex justify-between items-center mt-3 px-3">
              <div className="text-sm min-w-0 truncate">
                {createMessage.error && (
                  <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full border-2 border-red-400 animate-wiggle">
                    🚨 Error: {createMessage.error.message}
                  </span>
                )}
              </div>
              <div className="text-sm ml-3 bg-white/70 px-3 py-1 rounded-full font-bold text-purple-700 border-2 border-purple-300">
                {message.length}/500 ✍️
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 sm:self-start shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 animate-rainbow"
            disabled={!message.trim() || !userData.username || createMessage.isPending || isLoading}
          >
            {createMessage.isPending ? (
              <span className="flex items-center gap-2">
                <span className="animate-wiggle">🚀</span>
                Sending Magic...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="animate-bounce">🎉</span>
                Send Fun!
                <span className="animate-float">✨</span>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}