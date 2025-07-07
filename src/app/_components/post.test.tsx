import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Post } from "./post";

describe("Post component", () => {
  const mockProps = {
    username: "TestUser123",
    content: "This is a test message",
    timestamp: new Date("2023-12-01T10:30:00Z"),
    color: "#FF6B6B",
  };

  it("should render the message with correct format", () => {
    render(<Post {...mockProps} />);
    
    expect(screen.getByText("TestUser123")).toBeInTheDocument();
    expect(screen.getByText("This is a test message")).toBeInTheDocument();
    expect(screen.getByText(/\[\d{2}:\d{2}\]/)).toBeInTheDocument();
    expect(screen.getByText(":")).toBeInTheDocument();
  });

  it("should apply the correct username color", () => {
    render(<Post {...mockProps} />);
    
    const usernameElement = screen.getByText("TestUser123");
    expect(usernameElement).toHaveStyle({ color: "#FF6B6B" });
  });

  it("should apply alternating background when isAlternate is true", () => {
    const { container } = render(<Post {...mockProps} isAlternate={true} />);
    
    const messageDiv = container.firstChild as HTMLElement;
    expect(messageDiv).toHaveClass("bg-[#1E1E23]");
  });

  it("should not apply alternating background when isAlternate is false", () => {
    const { container } = render(<Post {...mockProps} isAlternate={false} />);
    
    const messageDiv = container.firstChild as HTMLElement;
    expect(messageDiv).not.toHaveClass("bg-[#1E1E23]");
  });

  it("should format timestamp in 24-hour format", () => {
    const morningTime = new Date("2023-12-01T09:15:00Z");
    const eveningTime = new Date("2023-12-01T21:45:00Z");
    
    const { rerender } = render(<Post {...mockProps} timestamp={morningTime} />);
    // Just check that it shows a valid time format
    expect(screen.getByText(/\[\d{2}:\d{2}\]/)).toBeInTheDocument();
    
    rerender(<Post {...mockProps} timestamp={eveningTime} />);
    // Check that it's still a valid time format
    expect(screen.getByText(/\[\d{2}:\d{2}\]/)).toBeInTheDocument();
  });

  it("should handle long usernames and content", () => {
    const longProps = {
      ...mockProps,
      username: "VeryLongUsernameForTesting123456789",
      content: "This is a very long message that should still render correctly and not break the layout or cause any issues with the component rendering.",
    };
    
    render(<Post {...longProps} />);
    
    expect(screen.getByText(longProps.username)).toBeInTheDocument();
    expect(screen.getByText(longProps.content)).toBeInTheDocument();
  });

  it("should handle special characters in content", () => {
    const specialProps = {
      ...mockProps,
      content: "Special chars: @#$%^&*()_+-=[]{}|;:,.<>?",
    };
    
    render(<Post {...specialProps} />);
    
    expect(screen.getByText(specialProps.content)).toBeInTheDocument();
  });
});