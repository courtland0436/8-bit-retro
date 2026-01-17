import { render, screen, fireEvent } from "@testing-library/react";
import { ProductsProvider } from "../context/ProductsContext";
import Shop from "../pages/Shop";

test("filters products when typing in the search bar", async () => {
  render(
    <ProductsProvider>
      <Shop />
    </ProductsProvider>
  );

  const searchInput = screen.getByPlaceholderText(/search/i);
  fireEvent.change(searchInput, { target: { value: 'Sonic' } });

  // After searching for 'Sonic', Mario should not be visible
  expect(screen.queryByText(/Super Mario/i)).not.toBeInTheDocument();
});