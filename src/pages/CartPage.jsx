// src/pages/CartPage.jsx
import { useProductsContext } from "../context/ProductsContext.jsx";
import "./Cart.css";

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

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useProductsContext();

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <p style={{ padding: "100px 20px", textAlign: "center" }}>
        Your cart is empty.
      </p>
    );

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.map((item) => {
          const imageSrc = item.image
            ? item.image
            : productImages[item.name]
            ? productImages[item.name]
            : item.productType === "Console"
            ? ConsolePlaceholder
            : GamePlaceholder;

          return (
            <div key={item.id} className="cart-item">
              <img src={imageSrc} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-control">
                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <h3 className="total">Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}

export default CartPage;
