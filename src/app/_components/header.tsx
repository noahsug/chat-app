"use client";

import { UsernameEditor } from "./username-editor";
import { useUser } from "@/contexts/user-context";

export function Header() {
  const { userData, isLoading } = useUser();

  return (
    <header className="glass border-b-4 border-white/30 p-6 pt-12 shadow-2xl animate-slide-up overflow-visible">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-white truncate animate-float drop-shadow-lg overflow-visible">
          <span className="animate-rainbow">🌈 FunChat</span>
          <span className="animate-wiggle inline-block ml-2">✨</span>
          <span className="animate-bounce inline-block ml-1">🎉</span>
        </h1>
        {!isLoading && userData.username && (
          <div className="flex items-center gap-3 text-sm min-w-0 animate-bounce-in">
            <span className="text-white font-semibold hidden sm:inline bg-white/20 px-3 py-1 rounded-full backdrop-blur">
              🎭 You are:
            </span>
            <UsernameEditor
              username={userData.username}
              color={userData.color}
            />
          </div>
        )}
      </div>
    </header>
  );
}