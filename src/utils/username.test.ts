import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  generateRandomUsername,
  generateRandomColor,
  validateUsername,
  getUserData,
  setUserData,
} from "./username";

describe("Username utility functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("generateRandomUsername", () => {
    it("should generate a username with the correct format", () => {
      const username = generateRandomUsername();
      
      // Should match pattern: adjective + noun + number
      expect(username).toMatch(/^[A-Za-z]+[A-Za-z]+\d+$/);
      expect(username.length).toBeGreaterThan(5);
      expect(username.length).toBeLessThan(30);
    });

    it("should generate different usernames on multiple calls", () => {
      const usernames = new Set();
      for (let i = 0; i < 10; i++) {
        usernames.add(generateRandomUsername());
      }
      
      // Should have some variety (not all the same)
      expect(usernames.size).toBeGreaterThan(1);
    });
  });

  describe("generateRandomColor", () => {
    it("should generate a valid hex color", () => {
      const color = generateRandomColor();
      
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it("should generate colors from the predefined palette", () => {
      const colors = new Set();
      for (let i = 0; i < 20; i++) {
        colors.add(generateRandomColor());
      }
      
      // Should only contain colors from our palette
      const validColors = [
        "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
        "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
      ];
      
      for (const color of colors) {
        expect(validColors).toContain(color);
      }
    });
  });

  describe("validateUsername", () => {
    it("should accept valid usernames", () => {
      expect(validateUsername("HappyPanda123")).toBe(true);
      expect(validateUsername("User 123")).toBe(true);
      expect(validateUsername("ABC")).toBe(true);
      expect(validateUsername("a".repeat(50))).toBe(true);
    });

    it("should reject usernames that are too short", () => {
      expect(validateUsername("ab")).toBe(false);
      expect(validateUsername("")).toBe(false);
    });

    it("should reject usernames that are too long", () => {
      expect(validateUsername("a".repeat(51))).toBe(false);
    });

    it("should reject usernames with invalid characters", () => {
      expect(validateUsername("user@123")).toBe(false);
      expect(validateUsername("user#123")).toBe(false);
      expect(validateUsername("user.123")).toBe(false);
      expect(validateUsername("user-123")).toBe(false);
    });
  });

  describe("getUserData and setUserData", () => {
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: vi.fn(),
          setItem: vi.fn(),
          removeItem: vi.fn(),
          clear: vi.fn(),
        },
        writable: true,
      });
    });

    it("should return existing data from localStorage", () => {
      const mockGetItem = vi.fn();
      vi.mocked(localStorage).getItem = mockGetItem;
      mockGetItem.mockImplementation((key) => {
        if (key === "chat-username") return "TestUser123";
        if (key === "chat-color") return "#FF6B6B";
        return null;
      });

      const userData = getUserData();
      
      expect(userData.username).toBe("TestUser123");
      expect(userData.color).toBe("#FF6B6B");
    });

    it("should generate and store new data if none exists", () => {
      const mockGetItem = vi.fn();
      const mockSetItem = vi.fn();
      vi.mocked(localStorage).getItem = mockGetItem;
      vi.mocked(localStorage).setItem = mockSetItem;
      mockGetItem.mockReturnValue(null);

      const userData = getUserData();
      
      expect(userData.username).toBeTruthy();
      expect(userData.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(mockSetItem).toHaveBeenCalledWith("chat-username", userData.username);
      expect(mockSetItem).toHaveBeenCalledWith("chat-color", userData.color);
    });

    it("should save data to localStorage", () => {
      const mockSetItem = vi.fn();
      vi.mocked(localStorage).setItem = mockSetItem;
      
      setUserData("NewUser456", "#4ECDC4");
      
      expect(mockSetItem).toHaveBeenCalledWith("chat-username", "NewUser456");
      expect(mockSetItem).toHaveBeenCalledWith("chat-color", "#4ECDC4");
    });
  });
});