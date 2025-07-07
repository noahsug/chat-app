"use client";

import { useState } from "react";
import { validateUsername, setUserData } from "@/utils/username";

interface UsernameEditorProps {
  username: string;
  color: string;
  onUsernameChange: (newUsername: string) => void;
}

export function UsernameEditor({ username, color, onUsernameChange }: UsernameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(username);
  const [error, setError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(username);
    setError("");
  };

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    
    if (!validateUsername(trimmedValue)) {
      setError("Username must be 3-50 characters, alphanumeric only");
      return;
    }

    setUserData(trimmedValue, color);
    onUsernameChange(trimmedValue);
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
      <div className="flex flex-col gap-1 min-w-0">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="bg-[#18181B] text-[#EFEFF1] px-2 py-1 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#9146FF] min-w-0"
          maxLength={50}
          autoFocus
        />
        {error && (
          <span className="text-red-400 text-xs">{error}</span>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleEdit}
      className="hover:bg-[#18181B] px-2 py-1 rounded transition-colors truncate max-w-32 sm:max-w-none"
      style={{ color }}
    >
      {username}
    </button>
  );
}