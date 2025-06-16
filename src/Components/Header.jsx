import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header({ setSearchQuery }) {
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const savedCartItems = localStorage.getItem('cartItems');
      const savedFavorites = localStorage.getItem('favorites');
      const cartItems = savedCartItems ? JSON.parse(savedCartItems) : [];
      const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
      setFavoritesCount(favorites.length);
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);

    return () => window.removeEventListener('storage', updateCounts);
  }, []);

  return (
    <header className="font-lora w-full">
      <div className="bg-dark-chocolate text-cream text-base py-3 text-center tracking-wide">
        FREE SHIPPING AS FROM 60 TND | 10% OFF ON YOUR FIRST ORDER
      </div>
      <div className="bg-cream text-dark-chocolate py-6 px-8 w-full border-b border-dark-chocolate">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="w-1/3"></div>
          <div className="w-1/3 text-center">
            <h1 className="text-5xl font-playfair font-bold tracking-widest uppercase">Noire et Noisette</h1>
            <p className="text-sm tracking-[0.2em] uppercase">Tunisia • Since 2024</p>
          </div>
          <div className="w-1/3 flex justify-end items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                value={setSearchQuery ? '' : ''} // Default empty if prop not provided
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                placeholder="Search"
                className="border-b border-dark-chocolate bg-transparent text-lg px-3 w-56 focus:outline-none"
              />
              {setSearchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-0 px-2 text-dark-chocolate"
                >
                  ✕
                </button>
              )}
            </div>
            <Link to="/wishlist" className="relative">
              <span className="text-2xl hover:text-milk-chocolate">♡</span>
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center -mt-1 -mr-1">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link to="/signup"><span className="text-2xl hover:text-milk-chocolate">👤</span></Link>
            <Link to="/cart" className="relative">
              <span className="text-2xl hover:text-milk-chocolate">🛍</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center -mt-1 -mr-1">
                  {cartCount}
                </span>
              )}
            </Link>
            <span className="cursor-pointer hover:underline">EN ▼</span>
            <a href="/franchise" className="hover:underline">Become a Franchise</a>
          </div>
        </div>
      </div>
      <nav className="bg-cream text-dark-chocolate border-b border-dark-chocolate w-full">
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex justify-center space-x-12 text-xl font-semibold tracking-wide">
          <Link to="/shop" className="hover:underline hover:text-milk-chocolate">Shop</Link>
          <Link to="/yasyous-day" className="hover:underline hover:text-milk-chocolate">Yasyous's Day</Link>
          <Link to="/gifts" className="hover:underline hover:text-milk-chocolate">Gifts</Link>
          <Link to="/about" className="hover:underline hover:text-milk-chocolate">About</Link>
          <Link to="/stores" className="hover:underline hover:text-milk-chocolate">Our Stores</Link>
          <Link to="/custom-box" className="hover:underline hover:text-milk-chocolate">Fill Your Own Box</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;