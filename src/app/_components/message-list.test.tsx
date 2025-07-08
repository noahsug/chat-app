import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { TRPCError } from "@trpc/server";
import { MessageList } from "./message-list";
import { api } from "@/trpc/react";

// Mock the tRPC API
jest.mock("@/trpc/react", () => ({
  api: {
    message: {
      getAll: {
        useQuery: jest.fn(),
      },
    },
  },
}));

// Mock the Post component
jest.mock("./post", () => ({
  Post: ({ username, content }: { username: string; content: string }) => (
    <div data-testid="message">{username}: {content}</div>
  ),
}));

const mockMessages = [
  {
    id: 1,
    username: "User1",
    content: "First message",
    createdAt: new Date("2023-01-01T10:00:00Z"),
    color: "#FF6B6B",
  },
  {
    id: 2,
    username: "User2", 
    content: "Second message",
    createdAt: new Date("2023-01-01T10:01:00Z"),
    color: "#4ECDC4",
  },
  {
    id: 3,
    username: "User3",
    content: "Third message", 
    createdAt: new Date("2023-01-01T10:02:00Z"),
    color: "#45B7D1",
  },
];

describe("MessageList Scroll Behavior", () => {
  let mockScrollIntoView: jest.Mock;
  let mockContainer: HTMLElement;

  beforeEach(() => {
    // Mock scrollIntoView
    mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    // Mock container scroll properties
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      writable: true, 
      value: 1000,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      writable: true,
      value: 500,
    });

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Initial Page Load", () => {
    it("should scroll to bottom on initial load with messages", async () => {
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages,
        isLoading: false,
        error: null,
      });

      render(<MessageList />);

      // Wait for the effect to run
      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
      });

      expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
    });

    it("should not scroll if no messages on initial load", async () => {
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      });

      render(<MessageList />);

      // Wait a bit to ensure effect doesn't run
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });

    it("should not scroll while loading", async () => {
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
      });

      render(<MessageList />);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe("New Message Behavior", () => {
    it("should scroll to bottom for new message when user is at bottom", async () => {
      const { rerender } = render(<MessageList />);

      // Initial load with 2 messages
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages.slice(0, 2),
        isLoading: false,
        error: null,
      });

      rerender(<MessageList />);

      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
      });

      // Mock user being at bottom (scrollTop + clientHeight >= scrollHeight - 100)
      const container = document.querySelector('.overflow-y-auto');
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 400 }); // 400 + 500 = 900, within 100px of 1000
      }

      // Add new message
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages, // Now 3 messages
        isLoading: false,
        error: null,
      });

      rerender(<MessageList />);

      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledTimes(2);
      });
    });

    it("should NOT scroll for new message when user is scrolled up", async () => {
      const { rerender } = render(<MessageList />);

      // Initial load with 2 messages  
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages.slice(0, 2),
        isLoading: false,
        error: null,
      });

      rerender(<MessageList />);

      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
      });

      // Mock user being scrolled up (not at bottom)
      const container = document.querySelector('.overflow-y-auto');
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 0 }); // At top, not within 100px of bottom
      }

      // Add new message
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages, // Now 3 messages
        isLoading: false,
        error: null,
      });

      rerender(<MessageList />);

      // Wait to ensure no additional scroll happens
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockScrollIntoView).toHaveBeenCalledTimes(1); // Still only the initial scroll
    });

    it("should handle edge case of being exactly at bottom threshold", async () => {
      const { rerender } = render(<MessageList />);

      // Initial load
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages.slice(0, 2),
        isLoading: false,
        error: null,
      });

      rerender(<MessageList />);

      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
      });

      // Mock user being exactly at the 100px threshold
      const container = document.querySelector('.overflow-y-auto');
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 400 }); // 400 + 500 = 900, exactly 100px from 1000
      }

      // Add new message
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages,
        isLoading: false,
        error: null,
      });

      rerender(<MessageList />);

      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("Error and Loading States", () => {
    it("should display loading state without scrolling", () => {
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
      });

      render(<MessageList />);

      expect(screen.getByText("Loading messages...")).toBeInTheDocument();
      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });

    it("should display error state without scrolling", () => {
      const error = new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database connection failed",
      });

      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: false,
        error,
      });

      render(<MessageList />);

      expect(screen.getByText(/Error loading messages/)).toBeInTheDocument();
      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });

    it("should display empty state without scrolling", () => {
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      });

      render(<MessageList />);

      expect(screen.getByText("No messages yet. Be the first to say hello!")).toBeInTheDocument();
      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe("Container Reference Handling", () => {
    it("should handle missing container ref gracefully", async () => {
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages,
        isLoading: false,
        error: null,
      });

      // Mock useRef to return null container
      const originalUseRef = React.useRef;
      jest.spyOn(React, 'useRef').mockImplementation((initial) => {
        if (initial === null && typeof initial !== 'number' && typeof initial !== 'boolean') {
          return { current: null }; // Container ref
        }
        return originalUseRef(initial);
      });

      render(<MessageList />);

      // Should still attempt initial scroll (messagesEndRef should work)
      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalled();
      });

      jest.restoreAllMocks();
    });
  });

  describe("Multiple Message Updates", () => {
    it("should handle rapid message updates correctly", async () => {
      const { rerender } = render(<MessageList />);

      // Start with 1 message
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages.slice(0, 1),
        isLoading: false,
        error: null,
      });

      rerender(<MessageList />);

      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
      });

      // User at bottom, add message 2
      const container = document.querySelector('.overflow-y-auto');
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 450 });
      }

      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages.slice(0, 2),
        isLoading: false,
        error: null,
      });

      rerender(<MessageList />);

      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledTimes(2);
      });

      // Add message 3 (still at bottom)
      (api.message.getAll.useQuery as jest.Mock).mockReturnValue({
        data: mockMessages,
        isLoading: false,
        error: null,
      });

      rerender(<MessageList />);

      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledTimes(3);
      });
    });
  });
});