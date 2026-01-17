import { useState, useEffect } from "react";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // READ: Fetch all products
  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  // CREATE: Post a new product
  const addProduct = (newProduct) => {
    return fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) => [...prev, data]);
        return data;
      });
  };

  // UPDATE: Patch an existing product (Required for Admin price changes)
  const updateProduct = (id, updatedFields) => {
    return fetch(`http://localhost:3001/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update product");
        return res.json();
      })
      .then((data) => {
        setProducts((prev) =>
          prev.map((product) => (product.id === id ? data : product))
        );
        return data;
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  // DELETE: Remove a product permanently from db.json
  const deleteProduct = (id) => {
    return fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete product");
        setProducts((prev) => prev.filter((product) => product.id !== id));
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Added updateProduct and deleteProduct to the return object
  return { 
    products, 
    setProducts, // Included so Context can manipulate state if needed
    loading, 
    fetchProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct 
  };
}

export default useProducts;