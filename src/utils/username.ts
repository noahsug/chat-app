const adjectives = [
  "Happy", "Cool", "Bright", "Swift", "Clever", "Brave", "Calm", "Wise",
  "Quick", "Bold", "Smart", "Kind", "Jolly", "Witty", "Fancy", "Noble",
  "Sunny", "Merry", "Lucky", "Eager", "Lively", "Peppy", "Zesty", "Funky"
];

const nouns = [
  "Panda", "Tiger", "Eagle", "Dolphin", "Wolf", "Fox", "Bear", "Lion",
  "Hawk", "Owl", "Deer", "Cat", "Dog", "Horse", "Rabbit", "Turtle",
  "Penguin", "Koala", "Shark", "Whale", "Monkey", "Zebra", "Elephant", "Giraffe"
];

const colors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
];

export function generateRandomUsername(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)] ?? "Cool";
  const noun = nouns[Math.floor(Math.random() * nouns.length)] ?? "User";
  const number = Math.floor(Math.random() * 1000);
  
  return `${adjective}${noun}${number}`;
}

export function generateRandomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)] ?? "#FF6B6B";
}

export function validateUsername(username: string): boolean {
  if (username.length < 3 || username.length > 50) {
    return false;
  }
  
  // Allow alphanumeric characters and spaces
  const validPattern = /^[a-zA-Z0-9\s]+$/;
  return validPattern.test(username);
}

export function getUserData(): { username: string; color: string } {
  if (typeof window === "undefined") {
    // Server-side rendering fallback
    return {
      username: generateRandomUsername(),
      color: generateRandomColor(),
    };
  }

  let username = localStorage.getItem("chat-username");
  let color = localStorage.getItem("chat-color");

  if (!username || !color) {
    username = generateRandomUsername();
    color = generateRandomColor();
    localStorage.setItem("chat-username", username);
    localStorage.setItem("chat-color", color);
  }

  return { username, color };
}

export function setUserData(username: string, color: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("chat-username", username);
    localStorage.setItem("chat-color", color);
  }
}