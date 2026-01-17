// src/pages/Admin.jsx
import { useState } from "react";
import { useProductsContext } from "../context/ProductsContext.jsx";
import AdminModal from "../components/AdminModal.jsx";
import "./Admin.css";

function Admin() {
  // Use editProduct and deleteProduct from context for persistent CRUD
  const { products, editProduct, deleteProduct, resetApp } = useProductsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Requirement: "Allow the administrator to change different values... such as price."
  const handlePriceEdit = (product) => {
    const newPrice = window.prompt(`Enter new price for ${product.name}:`, product.price);
    
    if (newPrice !== null && !isNaN(newPrice) && newPrice !== "") {
      editProduct(product.id, { price: parseFloat(newPrice) });
    }
  };

  const handleResetApp = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the app? This will reload all products from the server."
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
            <div className="product-details">
              <span className="product-name">{product.name}</span>
              <span className="product-price-label">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="admin-actions">
              {/* This button satisfies the "Update/PATCH" requirement */}
              <button
                className="edit-btn"
                onClick={() => handlePriceEdit(product)}
              >
                Edit Price
              </button>

              {/* This button satisfies the "Delete" requirement */}
              <button
                className="remove-btn"
                onClick={() => deleteProduct(product.id)}
              >
                Remove
              </button>
            </div>
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