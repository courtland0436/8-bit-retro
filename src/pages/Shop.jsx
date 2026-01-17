// src/pages/Shop.jsx
import { useState } from "react";
import { useProductsContext } from "../context/ProductsContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import "./Shop.css";

function Shop() {
  const { products } = useProductsContext();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all"); // "all", "Games", "Consoles"
  const [filterConsole, setFilterConsole] = useState("all"); // "all", "NES", etc.

  const handleTypeChange = (e) => setFilterType(e.target.value);
  const handleConsoleChange = (e) => setFilterConsole(e.target.value);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

    let matchesType = true;
    if (filterType === "Games") matchesType = product.productType === "Game";
    else if (filterType === "Consoles") matchesType = product.productType === "Console";

    const matchesConsole =
      filterConsole === "all" || product.console === filterConsole;

    return matchesSearch && matchesType && matchesConsole;
  });

  return (
    <div className="shop-container">
      <h2>Shop</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filters-dropdown">
        <select value={filterType} onChange={handleTypeChange}>
          <option value="all">Games + Consoles</option>
          <option value="Games">Games</option>
          <option value="Consoles">Consoles</option>
        </select>

        <select value={filterConsole} onChange={handleConsoleChange}>
          <option value="all">All Consoles</option>
          <option value="NES">NES</option>
          <option value="SNES">SNES</option>
          <option value="SEGA Genesis">SEGA Genesis</option>
        </select>
      </div>

      {/* Product cards */}
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products match your criteria.</p>
      )}
    </div>
  );
}

export default Shop;
