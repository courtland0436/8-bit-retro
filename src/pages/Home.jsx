// src/pages/Home.jsx
import "./Home.css";
import BannerImage from "../assets/Banner_Image.jpg"; // import the image

function Home() {
  return (
    <div className="home-container">
      {/* Banner Section */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${BannerImage})` }} // use imported image
      >
        <div className="banner-overlay">
          <h1 className="store-name">8-Bit Retro</h1>
        </div>
      </div>

      {/* Body Section */}
      <div className="home-body">
        <h2>Welcome to 8-Bit Retro!</h2>
        <p>
          Here at 8-Bit Retro, the pixels are chunky, the soundtracks are legendary,
          and the games still hold up. We’re here to celebrate the consoles, cartridges,
          and arcade-era magic that laid the foundation for everything gaming is today.
          No microtransactions—just pure nostalgia, timeless gameplay, and the joy of hitting “Continue.”
        </p>
        <a href="/shop" className="shop-button">Shop</a>
      </div>
    </div>
  );
}

export default Home;
