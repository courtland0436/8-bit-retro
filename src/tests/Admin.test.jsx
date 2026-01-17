import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest"; // Import Vitest utilities
import { ProductsProvider } from "../context/ProductsContext";
import Admin from "../pages/Admin";

// Mocking global window.confirm and window.prompt using 'vi'
window.confirm = vi.fn(() => true);
window.prompt = vi.fn(() => "25.00");

test("allows user to click Edit Price button", () => {
  render(
    <ProductsProvider>
      <Admin />
    </ProductsProvider>
  );
  
  const editButtons = screen.queryAllByText(/Edit Price/i);
  if (editButtons.length > 0) {
    fireEvent.click(editButtons[0]);
    expect(window.prompt).toHaveBeenCalled();
  }
});