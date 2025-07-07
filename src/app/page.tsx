import { Header } from "@/app/_components/header";
import { MessageList } from "@/app/_components/message-list";
import { ChatInput } from "@/app/_components/chat-input";
import { HydrateClient } from "@/trpc/server";

/**
 * Main chat application page
 * Layout: Header (top) -> MessageList (middle, scrollable) -> ChatInput (bottom, fixed)
 */
export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col h-screen max-w-6xl mx-auto min-w-0">
        <Header />
        <MessageList />
        <ChatInput />
      </main>
    </HydrateClient>
  );
}
