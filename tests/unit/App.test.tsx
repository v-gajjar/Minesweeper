import { render, screen } from "@testing-library/react";
import App from "../../src/components/App";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
  it("renders the game title", () => {
    render(<App />);
    expect(screen.getByText(/minesweeper/i)).toBeInTheDocument();
  });

  it("renders the difficulty selector", () => {
    render(<App />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders the remaining flags counter", () => {
    render(<App />);
    expect(screen.getByText(/remaining flags:/i)).toBeInTheDocument();
  });

  it("renders the game board", () => {
    render(<App />);
    expect(screen.getByTestId("game-board")).toBeInTheDocument();
  });

  it("does not render result modal initially", () => {
    render(<App />);
    expect(screen.queryByTestId("result-modal")).toBeNull();
  });
});