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

// Map product name → local image
const productImages = {
  NES: NESConsole,
  SNES: SNESConsole,
  "SEGA Genesis": SegaGenesisConsole,
  "Super Mario Bros.": SuperMario,
  Starfox: StarFox,
  "Sonic the Hedgehog": Sonic,
};

function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart } = useProductsContext();

  // Check if this product is in the cart
  const inCart = cart.some((item) => item.id === product.id);

  // Determine the image to display
  const imageSrc = product.image
    ? product.image
    : productImages[product.name]
    ? productImages[product.name]
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
