/**
 * Individual chat message component with Twitch-style formatting
 * Displays: [HH:MM] username: message content
 */
interface PostProps {
  username: string;
  content: string;
  timestamp: Date;
  color: string; // Hex color for username display
  isAlternate?: boolean; // For alternating row backgrounds
}

export function Post({ username, content, timestamp, color, isAlternate = false }: PostProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`px-2 sm:px-4 py-1 text-sm leading-relaxed ${isAlternate ? 'bg-[#1E1E23]' : ''}`}>
      <span className="text-gray-400">[{formatTime(timestamp)}]</span>{" "}
      <span style={{ color }} className="font-medium break-words">
        {username}
      </span>
      <span className="text-gray-400">: </span>
      <span className="text-gray-200 break-words">{content}</span>
    </div>
  );
}