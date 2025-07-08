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
      setError("Username must be 3-50 characters, alphanumeric and spaces only");
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
      <div className="flex flex-col gap-2 min-w-0 animate-bounce-in">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="bg-white/90 text-slate-800 px-4 py-2 rounded-2xl border-3 border-yellow-300 focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 min-w-0 font-bold shadow-lg hover-grow"
          maxLength={50}
          autoFocus
        />
        {error && (
          <span className="bg-red-200 text-red-800 text-xs px-3 py-1 rounded-full border-2 border-red-400 animate-wiggle">
            🚨 {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleEdit}
      className="bg-white/20 hover:bg-white/40 px-4 py-2 rounded-2xl transition-all duration-300 truncate max-w-32 sm:max-w-none font-bold text-lg backdrop-blur-sm hover:scale-110 shadow-lg hover:shadow-xl border-2 border-white/30 hover-bounce"
      style={{ color }}
    >
      <span className="flex items-center gap-1">
        🌟 {username} 🌟
        <span className="text-xs">✏️</span>
      </span>
    </button>
  );
}