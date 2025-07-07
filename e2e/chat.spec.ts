import { test, expect } from "@playwright/test";

test.describe("Chat Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the main chat interface", async ({ page }) => {
    // Check header
    await expect(page.getByRole("heading", { name: "Global Chat" })).toBeVisible();
    
    // Check message input
    await expect(page.getByPlaceholder("Type a message...")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send" })).toBeVisible();
  });

  test("should show username in header", async ({ page }) => {
    // Wait for username to load from localStorage or be generated
    await page.waitForTimeout(1000);
    
    // Check that a username is displayed (it could be random generated)
    const usernameButton = page.locator("header button");
    await expect(usernameButton).toBeVisible();
    
    const usernameText = await usernameButton.textContent();
    expect(usernameText).toBeTruthy();
    expect(usernameText!.length).toBeGreaterThan(3);
  });

  test("should send a message", async ({ page }) => {
    const testMessage = "Hello from E2E test!";
    
    // Wait for the app to initialize
    await page.waitForTimeout(1000);
    
    // Type message
    await page.getByPlaceholder("Type a message...").fill(testMessage);
    
    // Click send button
    await page.getByRole("button", { name: "Send" }).click();
    
    // Wait for message to appear
    await expect(page.getByText(testMessage)).toBeVisible();
    
    // Check that input is cleared
    await expect(page.getByPlaceholder("Type a message...")).toHaveValue("");
  });

  test("should show character counter", async ({ page }) => {
    const input = page.getByPlaceholder("Type a message...");
    
    // Initially should show 0/500
    await expect(page.getByText("0/500")).toBeVisible();
    
    // Type some text
    await input.fill("Hello world");
    
    // Should update counter
    await expect(page.getByText("11/500")).toBeVisible();
  });

  test("should disable send button when input is empty", async ({ page }) => {
    const sendButton = page.getByRole("button", { name: "Send" });
    
    // Button should be disabled initially
    await expect(sendButton).toBeDisabled();
    
    // Type something
    await page.getByPlaceholder("Type a message...").fill("Test");
    
    // Button should be enabled
    await expect(sendButton).toBeEnabled();
    
    // Clear input
    await page.getByPlaceholder("Type a message...").fill("");
    
    // Button should be disabled again
    await expect(sendButton).toBeDisabled();
  });

  test("should allow username editing", async ({ page }) => {
    // Wait for username to load
    await page.waitForTimeout(1000);
    
    const usernameButton = page.locator("header button");
    
    // Click username to edit
    await usernameButton.click();
    
    // Should show input field
    const usernameInput = page.locator("header input");
    await expect(usernameInput).toBeVisible();
    
    // Change username
    await usernameInput.fill("TestUser123");
    await usernameInput.press("Enter");
    
    // Should show updated username
    await expect(page.getByText("TestUser123")).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that header is visible and responsive
    await expect(page.getByRole("heading", { name: "Global Chat" })).toBeVisible();
    
    // Check that message input is visible
    await expect(page.getByPlaceholder("Type a message...")).toBeVisible();
    
    // Check that send button is visible
    await expect(page.getByRole("button", { name: "Send" })).toBeVisible();
  });

  test("should handle long messages", async ({ page }) => {
    const longMessage = "A".repeat(500);
    
    // Fill with max length message
    await page.getByPlaceholder("Type a message...").fill(longMessage);
    
    // Should show 500/500
    await expect(page.getByText("500/500")).toBeVisible();
    
    // Should still be able to send
    await expect(page.getByRole("button", { name: "Send" })).toBeEnabled();
  });
});