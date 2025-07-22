import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../../src/App";

describe("App", () => {
  it("renders difficulty selection buttons on load", () => {
    render(<App />);
    
    const easyButton = screen.getByText(/easy/i);
    const mediumButton = screen.getByText(/medium/i);
    const hardButton = screen.getByText(/hard/i);

    expect(easyButton).toBeTruthy();
    expect(mediumButton).toBeTruthy();
    expect(hardButton).toBeTruthy();
  });
});