import { createContext, useContext, useState } from "react";
import useProducts from "../hooks/useProducts.js";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { 
    products, 
    loading, 
    addProduct: postProduct, 
    updateProduct: patchProduct, 
    deleteProduct: removeProductDB 
  } = useProducts();

  const [cart, setCart] = useState([]);

  // --- CART LOGIC ---
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // --- PRODUCT CRUD LOGIC ---

  const addProduct = (newProduct) => {
    postProduct(newProduct);
  };

  const editProduct = (id, updatedFields) => {
    patchProduct(id, updatedFields);
  };

  const deleteProduct = (id) => {
    removeProductDB(id);
    removeFromCart(id);
  };

  // --- PERSISTENT RESET LOGIC ---
  const resetApp = async () => {
    // 1. Clear local cart
    setCart([]);

    // 2. Define the original "Vision" prices
    const defaultPrices = {
      "NES": 49.99,
      "Super Mario Bros.": 19.99,
      "SNES": 49.99,
      "Starfox": 24.99,
      "SEGA Genesis": 49.99,
      "Sonic the Hedgehog": 18.99
    };

    try {
      // 3. Loop through current products and revert prices in db.json
      const resetPromises = products.map((product) => {
        const originalPrice = defaultPrices[product.name];
        
        // Only PATCH if we have a record of the original price
        if (originalPrice !== undefined) {
          return fetch(`http://localhost:3001/products/${product.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: originalPrice }),
          });
        }
        return Promise.resolve();
      });

      await Promise.all(resetPromises);
      
      // 4. Reload to ensure all state and hooks re-fetch fresh data
      window.location.reload();
    } catch (error) {
      console.error("Error resetting application prices:", error);
      alert("Reset failed. Please check if json-server is running.");
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        addProduct,
        editProduct,
        deleteProduct,
        resetApp,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);