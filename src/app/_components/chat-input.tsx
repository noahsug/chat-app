"use client";

import { useState } from "react";

export function ChatInput() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Send message logic will be implemented in later tasks
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="bg-[#2F2F35] border-t border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#18181B] text-[#EFEFF1] placeholder-[#ADADB8] px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9146FF] focus:border-transparent"
            maxLength={500}
          />
          <button
            type="submit"
            className="bg-[#9146FF] hover:bg-[#8441E6] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            disabled={!message.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}