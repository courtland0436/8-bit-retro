// src/components/AdminModal.jsx
import { useState } from "react";
import { useProductsContext } from "../context/ProductsContext.jsx";
import "./AdminModal.css";

function AdminModal({ closeModal }) {
  const { addProduct } = useProductsContext();

  const [formData, setFormData] = useState({
    name: "",
    productType: "Game",
    console: "NES",
    price: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      id: Date.now()
    };
    addProduct(newProduct);
    closeModal();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2>Add Product</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Product Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Product Type
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
            >
              <option value="Game">Game</option>
              <option value="Console">Console</option>
            </select>
          </label>

          <label>
            Console
            <select
              name="console"
              value={formData.console}
              onChange={handleChange}
            >
              <option value="NES">NES</option>
              <option value="SNES">SNES</option>
              <option value="SEGA Genesis">SEGA Genesis</option>
            </select>
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Image URL
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Optional"
            />
          </label>

          <div className="modal-buttons">
            <button type="submit">Add Product</button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminModal;
