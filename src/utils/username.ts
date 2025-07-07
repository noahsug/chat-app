// Predefined lists for random username generation
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

// Color palette for username display - matches design system
const colors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
];

/**
 * Generates a random username in the format: AdjectiveNoun123
 * Example: "HappyPanda456", "CoolTiger789"
 */
export function generateRandomUsername(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)] ?? "Cool";
  const noun = nouns[Math.floor(Math.random() * nouns.length)] ?? "User";
  const number = Math.floor(Math.random() * 1000);
  
  return `${adjective}${noun}${number}`;
}

/**
 * Returns a random color from the predefined palette
 */
export function generateRandomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)] ?? "#FF6B6B";
}

/**
 * Validates username input from users
 * Note: Generated usernames don't contain spaces, but user edits can include them
 */
export function validateUsername(username: string): boolean {
  if (username.length < 3 || username.length > 50) {
    return false;
  }
  
  // Allow alphanumeric characters and spaces (more flexible than generated usernames)
  const validPattern = /^[a-zA-Z0-9\s]+$/;
  return validPattern.test(username);
}

/**
 * Gets user data (username and color) from localStorage
 * Generates new random data if none exists
 * 
 * Note: Returns random data on server-side to prevent hydration mismatches
 * Components should handle the initial random state gracefully
 */
export function getUserData(): { username: string; color: string } {
  if (typeof window === "undefined") {
    // Server-side rendering fallback - generates random data each time
    // This prevents hydration mismatches but means SSR and client will differ initially
    return {
      username: generateRandomUsername(),
      color: generateRandomColor(),
    };
  }

  let username = localStorage.getItem("chat-username");
  let color = localStorage.getItem("chat-color");

  // Generate and store new user data if none exists
  if (!username || !color) {
    username = generateRandomUsername();
    color = generateRandomColor();
    localStorage.setItem("chat-username", username);
    localStorage.setItem("chat-color", color);
  }

  return { username, color };
}

/**
 * Saves user data to localStorage
 * Used when user edits their username
 */
export function setUserData(username: string, color: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("chat-username", username);
    localStorage.setItem("chat-color", color);
  }
}