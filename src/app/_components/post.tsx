interface PostProps {
  username: string;
  content: string;
  timestamp: Date;
  color: string;
}

export function Post({ username, content, timestamp, color }: PostProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="px-4 py-1 text-sm leading-relaxed">
      <span className="text-gray-400">[{formatTime(timestamp)}]</span>{" "}
      <span style={{ color }} className="font-medium">
        {username}
      </span>
      <span className="text-gray-400">: </span>
      <span className="text-gray-200">{content}</span>
    </div>
  );
}