// Super fun and colorful username generation lists!
const adjectives = [
  "Magical", "Sparkly", "Rainbow", "Bubbly", "Giggly", "Bouncy", "Dreamy", "Silly",
  "Whimsical", "Fuzzy", "Cheerful", "Glittery", "Playful", "Twinkly", "Jolly", "Peppy",
  "Sunny", "Merry", "Lucky", "Zany", "Quirky", "Frisky", "Snazzy", "Jazzy", "Dazzling",
  "Vibrant", "Radiant", "Brilliant", "Fantastic", "Wonderful", "Amazing", "Awesome", "Epic"
];

const nouns = [
  "Unicorn", "Dragon", "Butterfly", "Rainbow", "Cupcake", "Balloon", "Starfish", "Jellybean",
  "Marshmallow", "Bubble", "Firefly", "Ladybug", "Honeybee", "Dragonfly", "Snowflake", "Flower",
  "Moonbeam", "Stardust", "Sunshine", "CloudHopper", "Dewdrop", "Pebble", "Feather", "Crystal",
  "Phoenix", "Comet", "Galaxy", "Prism", "Sparkle", "Twinkle", "Shimmer", "Glimmer", "Wizard"
];

// Super bright and vibrant color palette!
const colors = [
  "#FF1493", "#00CED1", "#FF4500", "#32CD32", "#FF69B4", "#1E90FF", "#FFD700", "#FF6347",
  "#9370DB", "#00FA9A", "#FF8C00", "#4169E1", "#DC143C", "#00BFFF", "#ADFF2F", "#FF1493",
  "#FF6B35", "#F7931E", "#FFE66D", "#A8E6CF", "#FFAAA5", "#FF8B94", "#A8DADC", "#457B9D"
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