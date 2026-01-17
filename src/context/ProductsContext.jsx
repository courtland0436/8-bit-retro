import { createContext, useContext, useState, useEffect } from "react";
import useProducts from "../hooks/useProducts.js";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const productsHook = useProducts(); // { products, setProducts, loading }

  // Original default products
  const originalProducts = productsHook.products || [];

  // Local state to control products
  const [products, setProducts] = useState(originalProducts);

  // Sync with hook initially
  useEffect(() => {
    if (productsHook.products) {
      setProducts(productsHook.products);
    }
  }, [productsHook.products]);

  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Update cart quantity
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  // Add product
  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  // Remove product from products AND cart
  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset app to original products
  const resetApp = () => {
    setProducts(originalProducts);
    setCart([]);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        cart,
        loading: productsHook.loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        addProduct,
        removeProduct,
        resetApp,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
