"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { getUserData } from "@/utils/username";

export function ChatInput() {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({ username: "", color: "" });
  const utils = api.useUtils();

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  const createMessage = api.message.create.useMutation({
    onSuccess: async () => {
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
    <div className="bg-[#2F2F35] border-t border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-[#18181B] text-[#EFEFF1] placeholder-[#ADADB8] px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9146FF] focus:border-transparent"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-1 px-1">
              <div className="text-xs text-[#ADADB8] min-w-0 truncate">
                {createMessage.error && (
                  <span className="text-red-400">Error: {createMessage.error.message}</span>
                )}
              </div>
              <div className="text-xs text-[#ADADB8] ml-2">
                {message.length}/500
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#9146FF] hover:bg-[#8441E6] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 sm:self-start"
            disabled={!message.trim() || !userData.username || createMessage.isPending}
          >
            {createMessage.isPending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}