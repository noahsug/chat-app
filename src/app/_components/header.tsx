"use client";

import { useState, useEffect } from "react";
import { UsernameEditor } from "./username-editor";
import { getUserData } from "@/utils/username";

export function Header() {
  const [userData, setUserData] = useState({ username: "", color: "" });

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  const handleUsernameChange = (newUsername: string) => {
    setUserData(prev => ({ ...prev, username: newUsername }));
  };

  return (
    <header className="bg-[#2F2F35] border-b border-gray-700 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#EFEFF1]">Global Chat</h1>
        {userData.username && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#ADADB8]">You are:</span>
            <UsernameEditor
              username={userData.username}
              color={userData.color}
              onUsernameChange={handleUsernameChange}
            />
          </div>
        )}
      </div>
    </header>
  );
}