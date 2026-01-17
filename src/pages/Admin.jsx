// src/pages/Admin.jsx
import { useState } from "react";
import { useProductsContext } from "../context/ProductsContext.jsx";
import AdminModal from "../components/AdminModal.jsx";
import "./Admin.css";

function Admin() {
  const { products, removeProduct, resetApp } = useProductsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleResetApp = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the app? This will remove all added products and clear the cart."
    );
    if (confirmed) {
      resetApp();
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel</h2>

      {/* Add Product Button */}
      <button className="add-product-btn" onClick={openModal}>
        Add Product
      </button>

      {/* Published Products List */}
      <div className="published-products">
        <h3>Published Products</h3>
        {products.length === 0 && <p>No products yet.</p>}
        {products.map((product) => (
          <div key={product.id} className="published-product">
            <span className="product-name">{product.name}</span>
            <button
              className="remove-btn"
              onClick={() => removeProduct(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Reset App Button */}
      <button className="reset-app-btn" onClick={handleResetApp}>
        Reset App
      </button>

      {/* Modal */}
      {isModalOpen && <AdminModal closeModal={closeModal} />}
    </div>
  );
}

export default Admin;
