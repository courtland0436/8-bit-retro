// src/components/ProductCard.jsx
import { useProductsContext } from "../context/ProductsContext.jsx";
import "./ProductCard.css";

// Import product images
import NESConsole from "../assets/Product_Images/Console_NES.png";
import SNESConsole from "../assets/Product_Images/Console_SNES.png";
import SegaGenesisConsole from "../assets/Product_Images/Console_SEGA_Genesis.png";
import SuperMario from "../assets/Product_Images/Game_SuperMarioBros.png";
import StarFox from "../assets/Product_Images/Game_StarFox.png";
import Sonic from "../assets/Product_Images/Game_SonicTheHedgehog.png";

// Import placeholders
import ConsolePlaceholder from "../assets/Product_Images/Console_Placeholder.png";
import GamePlaceholder from "../assets/Product_Images/Game_Placeholder.png";

// IMPORTANT: These keys must match the "name" field in your db.json EXACTLY
const productImages = {
  "NES": NESConsole,
  "SNES": SNESConsole,
  "SEGA Genesis": SegaGenesisConsole,
  "Super Mario Bros.": SuperMario,
  "Starfox": StarFox,
  "Sonic the Hedgehog": Sonic,
};

function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart } = useProductsContext();

  const inCart = cart.some((item) => item.id === product.id);

  // LOGIC:
  // 1. First, try to find a match in our productImages map using the product NAME.
  // 2. If no match, check if product.image is a full URL (for Admin-added items).
  // 3. Last resort, use a placeholder.
  const imageSrc = productImages[product.name] 
    ? productImages[product.name] 
    : (product.image && product.image.startsWith("http")) 
    ? product.image 
    : product.productType === "Console" 
    ? ConsolePlaceholder 
    : GamePlaceholder;

  return (
    <div className="product-card">
      <img
        src={imageSrc}
        alt={product.name}
        className="product-image"
        loading="lazy"
      />

      <h3 className="product-name">{product.name}</h3>

      <p className="product-info">
        {product.productType} • {product.console}
      </p>

      <p className="product-price">${product.price.toFixed(2)}</p>

      <button
        className={inCart ? "remove-btn" : "add-btn"}
        onClick={() =>
          inCart
            ? removeFromCart(product.id)
            : addToCart({ ...product, quantity: 1 })
        }
      >
        {inCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;