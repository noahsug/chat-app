/**
 * Individual chat message component with super fun, bright formatting
 * Displays messages in colorful bubbles with animations and emojis
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

  const bubbleColors = [
    'bg-gradient-to-r from-pink-200 to-pink-300 border-pink-400',
    'bg-gradient-to-r from-blue-200 to-blue-300 border-blue-400',
    'bg-gradient-to-r from-green-200 to-green-300 border-green-400',
    'bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400',
    'bg-gradient-to-r from-purple-200 to-purple-300 border-purple-400',
    'bg-gradient-to-r from-indigo-200 to-indigo-300 border-indigo-400',
    'bg-gradient-to-r from-orange-200 to-orange-300 border-orange-400',
    'bg-gradient-to-r from-teal-200 to-teal-300 border-teal-400',
  ];

  const bubbleClass = bubbleColors[Math.abs(username.charCodeAt(0)) % bubbleColors.length];

  return (
    <div className="px-3 py-2 animate-slide-up">
      <div className={`${bubbleClass} border-3 rounded-2xl p-4 mb-3 shadow-lg hover-grow transition-all duration-300 hover:shadow-xl ${isAlternate ? 'ml-8' : 'mr-8'}`}>
        <div className="flex items-start gap-3">
          {/* Fun avatar based on first letter */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-current flex items-center justify-center font-bold text-lg animate-bounce" style={{ color }}>
            {username.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Header with username and time */}
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color }} className="font-bold text-lg drop-shadow-sm hover:animate-wiggle">
                ✨ {username} ✨
              </span>
              <span className="text-xs bg-white/60 px-2 py-1 rounded-full font-medium text-slate-600">
                🕒 {formatTime(timestamp)}
              </span>
            </div>
            
            {/* Message content */}
            <div className="text-slate-800 font-medium text-base leading-relaxed break-words">
              {content}
            </div>
          </div>
          
          {/* Fun reaction emoji */}
          <div className="flex-shrink-0 text-2xl animate-float">
            {isAlternate ? '🎨' : '💫'}
          </div>
        </div>
      </div>
    </div>
  );
}