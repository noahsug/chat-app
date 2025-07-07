"use client";

import { UsernameEditor } from "./username-editor";
import { useUser } from "@/contexts/user-context";

export function Header() {
  const { userData, isLoading } = useUser();

  return (
    <header className="bg-[#2F2F35] border-b border-gray-700 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold text-[#EFEFF1] truncate">Global Chat</h1>
        {!isLoading && userData.username && (
          <div className="flex items-center gap-2 text-sm min-w-0">
            <span className="text-[#ADADB8] hidden sm:inline">You are:</span>
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