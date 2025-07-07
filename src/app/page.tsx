import { Header } from "@/app/_components/header";
import { MessageList } from "@/app/_components/message-list";
import { ChatInput } from "@/app/_components/chat-input";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col h-screen max-w-6xl mx-auto">
        <Header />
        <MessageList />
        <ChatInput />
      </main>
    </HydrateClient>
  );
}
