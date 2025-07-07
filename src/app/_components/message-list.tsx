import { Post } from "./post";

export function MessageList() {
  // Hardcoded messages for styling verification
  const mockMessages = [
    {
      id: 1,
      username: "HappyPanda123",
      content: "Hello everyone! How's everyone doing today?",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      color: "#FF6B6B",
    },
    {
      id: 2,
      username: "CoolCoder99",
      content: "Great to see so many people online!",
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      color: "#4ECDC4",
    },
    {
      id: 3,
      username: "NightOwl456",
      content: "Anyone working on any interesting projects?",
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
      color: "#45B7D1",
    },
    {
      id: 4,
      username: "DevMaster",
      content: "Just finished a React component, feeling productive! 🚀",
      timestamp: new Date(), // Now
      color: "#96CEB4",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {mockMessages.map((message) => (
          <Post
            key={message.id}
            username={message.username}
            content={message.content}
            timestamp={message.timestamp}
            color={message.color}
          />
        ))}
      </div>
    </div>
  );
}