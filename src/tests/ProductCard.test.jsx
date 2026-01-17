import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "../context/ProductsContext"; // Import Provider
import ProductCard from "../components/ProductCard";

const mockProduct = {
  id: 1,
  name: "Super Mario Bros.",
  console: "NES",
  price: 19.99,
  image: "/Product_Images/Game_SuperMarioBros.png"
};

test("renders product card with correct details", () => {
  render(
    <ProductsProvider> 
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    </ProductsProvider>
  );

  expect(screen.getByText(/Super Mario Bros./i)).toBeInTheDocument();
  expect(screen.getByText(/NES/i)).toBeInTheDocument();
});