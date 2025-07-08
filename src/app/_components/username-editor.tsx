"use client";

import { useState } from "react";
import { validateUsername } from "@/utils/username";
import { useUser } from "@/contexts/user-context";

interface UsernameEditorProps {
  username: string;
  color: string;
}

/**
 * Click-to-edit username component
 * Displays username as a button, converts to input on click
 * Validates input and saves to shared context/localStorage on save
 */
export function UsernameEditor({ username, color }: UsernameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(username);
  const [error, setError] = useState("");
  const { updateUsername } = useUser();

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(username);
    setError("");
  };

  const handleSave = () => {
    const trimmedValue = editValue.trim();

    if (!validateUsername(trimmedValue)) {
      setError(
        "Username must be 3-50 characters, alphanumeric and spaces only",
      );
      return;
    }

    updateUsername(trimmedValue);
    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(username);
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="animate-bounce-in flex min-w-0 flex-col gap-2">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          placeholder="Enter your magical username..."
          className="hover-grow min-w-0 rounded-2xl border-3 border-yellow-300 bg-white/90 px-4 py-2 font-bold text-slate-800 placeholder-purple-500 focus:placeholder-purple-300 shadow-lg focus:border-pink-400 focus:ring-3 focus:ring-pink-300 focus:outline-none"
          maxLength={50}
          autoFocus
        />
        {error && (
          <span className="animate-wiggle rounded-full border-2 border-red-400 bg-red-200 px-3 py-1 text-xs text-red-800">
            🚨 {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleEdit}
      className="max-w-32 truncate rounded-2xl border-2 border-white/30 bg-white/20 px-4 py-2 text-lg font-bold shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/40 hover:shadow-xl sm:max-w-none"
      style={{ color }}
    >
      <span className="flex items-center gap-1">
        🌟 {username} 🌟
        <span className="text-xs">✏️</span>
      </span>
    </button>
  );
}
