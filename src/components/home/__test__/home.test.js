import { render, screen, cleanup } from "@testing-library/react";
import Home from "../Home.js";

afterEach(() => {
  cleanup();
});

test("should render Home comonent", () => {
  render(<Home />);

  const homeElement = screen.getByTestId("home-1");
  expect(homeElement).toBeInTheDocument();
  expect(homeElement).toHaveTextContent("Loading...");
});
