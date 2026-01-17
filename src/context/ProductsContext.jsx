import { createContext, useContext, useState } from "react";
import useProducts from "../hooks/useProducts.js";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  // Use all the CRUD functions from our custom hook
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

  // --- PRODUCT CRUD LOGIC (Persistent) ---

  // CREATE: Calls the hook's POST request
  const addProduct = (newProduct) => {
    postProduct(newProduct);
  };

  // UPDATE: Calls the hook's PATCH request (Satisfies price edit requirement)
  const editProduct = (id, updatedFields) => {
    patchProduct(id, updatedFields);
  };

  // DELETE: Calls the hook's DELETE request & clears from cart
  const deleteProduct = (id) => {
    removeProductDB(id);
    removeFromCart(id); // Clean up cart if product is deleted from store
  };

  const resetApp = () => {
    setCart([]);
    window.location.reload(); // Re-fetches fresh data from db.json
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
        editProduct,   // New: Pass this to Admin for price changes
        deleteProduct, // New: Pass this to Admin for permanent removal
        resetApp,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);