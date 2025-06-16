import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DarkChocolateBar from '../assets/Dark Chocolate Bar.jpg';
import DarkTruffle from '../assets/Dark-truffle.jpg';
import HazelnutPraline from '../assets/Hazelnut Pralines.jpg';
import MilkChocolateTruffles from '../assets/Milk Chocolate Truffles.jpg';
import NoirCaramel from '../assets/Noir Caramel.jpg';
import WhiteChocolateAlmonds from '../assets/White Chocolate Almonds.jpg';
import Chocolate6 from '../assets/chocolate6.jpg';
import Chocolate7 from '../assets/chocolate7.jpg';

function Shop() {
  const [currentImage, setCurrentImage] = useState(0);
  const [products] = useState([
    { id: 1, name: 'Dark Chocolate Bar', price: 18.57, category: 'Bars', chocolateType: 'Dark', ingredients: ['Caramel'], cocoaPercentage: '61-75%', productType: 'Bars', occasion: 'Corporate Gifts', rating: 4, inStock: true, image: DarkChocolateBar, description: 'A rich dark chocolate bar with a smooth caramel filling.' },
    { id: 2, name: 'Dark Truffle', price: 27.87, category: 'Truffles', chocolateType: 'Dark', ingredients: ['Praline', 'Nuts'], cocoaPercentage: '76-90%', productType: 'Truffles', occasion: 'Valentine\'s Day', rating: 5, inStock: true, image: DarkTruffle, description: 'Decadent dark truffles with a nutty praline center.' },
    { id: 3, name: 'White Chocolate Almonds', price: 20.12, category: 'Nuts', chocolateType: 'White', ingredients: ['Nuts', 'Fruit'], cocoaPercentage: '30-40%', productType: 'Coated Nuts/Fruits', occasion: 'Birthday', rating: 3, inStock: false, image: WhiteChocolateAlmonds, description: 'Creamy white chocolate-coated almonds with a fruity twist.' },
    { id: 4, name: 'Hazelnut Pralines', price: 24.77, category: 'Pralines', chocolateType: 'Milk', ingredients: ['Nuts', 'Praline'], cocoaPercentage: '41-60%', productType: 'Bonbons', occasion: 'Christmas', rating: 4, inStock: true, image: HazelnutPraline, description: 'Milk chocolate pralines filled with roasted hazelnuts.' },
    { id: 5, name: 'Milk Chocolate Truffles', price: 27.87, category: 'Truffles', chocolateType: 'Milk', ingredients: ['Cream filling'], cocoaPercentage: '41-60%', productType: 'Truffles', occasion: 'Wedding', rating: 5, inStock: true, image: MilkChocolateTruffles, description: 'Smooth milk chocolate truffles with a creamy center.' },
    { id: 6, name: 'Noir Caramel', price: 22.45, category: 'Bars', chocolateType: 'Dark', ingredients: ['Caramel', 'Spices'], cocoaPercentage: '76-90%', productType: 'Bars', occasion: 'Graduation', rating: 4, inStock: false, image: NoirCaramel, description: 'Dark chocolate bar with spiced caramel layers.' },
  ]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    chocolateTypes: [],
    ingredients: [],
    dietaryFilters: [],
    cocoaPercentages: [],
    productTypes: [],
    occasions: [],
    priceRanges: [],
    countryOfOrigin: [],
    optionalExtras: [],
    search: '',
  });
  const [viewMode, setViewMode] = useState('grid');
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let updatedProducts = products;
    if (filters.chocolateTypes.length > 0) {
      updatedProducts = updatedProducts.filter(p => filters.chocolateTypes.includes(p.chocolateType));
    }
    if (filters.ingredients.length > 0) {
      updatedProducts = updatedProducts.filter(p => filters.ingredients.some(ing => p.ingredients.includes(ing)));
    }
    if (filters.dietaryFilters.length > 0) {
      updatedProducts = updatedProducts.filter(p => {
        return filters.dietaryFilters.every(filter => {
          if (filter === 'Dairy-Free' && p.ingredients.includes('Cream filling')) return false;
          if (filter === 'Nut-Free' && p.ingredients.some(ing => ing.includes('Nuts'))) return false;
          if (filter === 'Gluten-Free' && p.ingredients.includes('Biscuits')) return false;
          if (filter === 'Vegan' && p.ingredients.includes('Cream filling')) return false;
          if (filter === 'Sugar-Free' && p.price < 25) return false;
          if (filter === 'Organic' && !p.occasion.includes('Wellness')) return false;
          return true;
        });
      });
    }
    if (filters.cocoaPercentages.length > 0) {
      updatedProducts = updatedProducts.filter(p => filters.cocoaPercentages.includes(p.cocoaPercentage));
    }
    if (filters.productTypes.length > 0) {
      updatedProducts = updatedProducts.filter(p => filters.productTypes.includes(p.productType));
    }
    if (filters.occasions.length > 0) {
      updatedProducts = updatedProducts.filter(p => filters.occasions.includes(p.occasion));
    }
    if (filters.priceRanges.length > 0) {
      updatedProducts = updatedProducts.filter(p => {
        return filters.priceRanges.some(range => {
          if (range === 'Under 5' && p.price < 5) return true;
          if (range === '5–10' && p.price >= 5 && p.price <= 10) return true;
          if (range === '10–20' && p.price > 10 && p.price <= 20) return true;
          if (range === '20–50' && p.price > 20 && p.price <= 50) return true;
          if (range === 'Over 50' && p.price > 50) return true;
          return false;
        });
      });
    }
    if (filters.countryOfOrigin.length > 0) {
      updatedProducts = updatedProducts.filter(p => filters.countryOfOrigin.includes(p.country));
    }
    if (filters.optionalExtras.includes('Customer Rating 4+')) {
      updatedProducts = updatedProducts.filter(p => p.rating >= 4);
    }
    if (filters.optionalExtras.includes('In Stock')) {
      updatedProducts = updatedProducts.filter(p => p.inStock);
    }
    if (filters.search) {
      updatedProducts = updatedProducts.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    setFilteredProducts(updatedProducts);
  }, [filters, products]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedCartItems) setCartItems(JSON.parse(savedCartItems));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const handleAddToCart = (product) => {
    if (product.inStock) {
      const itemToAdd = { ...product, quantity: 1 };
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        const newItems = existingItem
          ? prevItems.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...prevItems, itemToAdd];
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        navigate('/cart', { state: { cartItems: newItems } });
        return newItems;
      });
    }
  };

  const handleAddToFavorites = (product) => {
    if (product.inStock && !favorites.some(fav => fav.id === product.id)) {
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      navigate('/wishlist', { state: { favorites: newFavorites } });
    }
  };

  const handleFilterChange = (category, value, checked) => {
    setFilters(prev => {
      const currentValues = Array.isArray(prev[category]) ? prev[category] : [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      return { ...prev, [category]: newValues };
    });
  };

  const resetFilters = () => {
    setFilters({
      chocolateTypes: [],
      ingredients: [],
      dietaryFilters: [],
      cocoaPercentages: [],
      productTypes: [],
      occasions: [],
      priceRanges: [],
      countryOfOrigin: [],
      optionalExtras: [],
      search: '',
    });
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div style={{ backgroundImage: `url(${currentImage === 0 ? Chocolate6 : Chocolate7})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }} className="relative">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-16 left-4 bg-dark-chocolate text-cream p-3 rounded-full z-10 hover:bg-milk-chocolate transition duration-300"
      >
        <FaBars size={24} />
      </button>
      <div className={`fixed top-0 left-0 h-full bg-cream bg-opacity-90 p-6 shadow-lg transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-1/4 z-20 overflow-y-auto`}>
        <h3 className="text-xl font-playfair font-semibold text-black mb-4">Filters</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-black font-lora font-semibold mb-2">Search</label>
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value, true)}
              placeholder="Search products..."
              className="w-full p-2 rounded-lg border border-milk-chocolate text-black"
            />
          </div>
          <div>
            <h4 className="text-md font-playfair font-semibold text-black mb-2">1. Type of Chocolate</h4>
            {['Dark Chocolate', 'Milk Chocolate', 'White Chocolate', 'Ruby Chocolate', 'Blond Chocolate', 'Vegan Chocolate'].map(type => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.chocolateTypes.includes(type)}
                  onChange={(e) => handleFilterChange('chocolateTypes', type, e.target.checked)}
                  className="text-black"
                />
                <span className="text-black">{type}</span>
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-md font-playfair font-semibold text-black mb-2">2. Ingredients / Fillings</h4>
            {['Fruit', 'Nuts', 'Caramel', 'Coconut', 'Coffee', 'Biscuits / Wafer', 'Liqueur / Alcohol', 'Praline', 'Cream filling', 'Spices', 'Mint'].map(ing => (
              <label key={ing} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.ingredients.includes(ing)}
                  onChange={(e) => handleFilterChange('ingredients', ing, e.target.checked)}
                  className="text-black"
                />
                <span className="text-black">{ing}</span>
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-md font-playfair font-semibold text-black mb-2">3. Allergen / Dietary Filters</h4>
            {['Dairy-Free', 'Nut-Free', 'Gluten-Free', 'Vegan', 'Sugar-Free', 'Organic'].map(filter => (
              <label key={filter} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.dietaryFilters.includes(filter)}
                  onChange={(e) => handleFilterChange('dietaryFilters', filter, e.target.checked)}
                  className="text-black"
                />
                <span className="text-black">{filter}</span>
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-md font-playfair font-semibold text-black mb-2">4. Cocoa Percentage</h4>
            {['30–40%', '41–60%', '61–75%', '76–90%', '90%+'].map(range => (
              <label key={range} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.cocoaPercentages.includes(range)}
                  onChange={(e) => handleFilterChange('cocoaPercentages', range, e.target.checked)}
                  className="text-black"
                />
                <span className="text-black">{range}</span>
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-md font-playfair font-semibold text-black mb-2">5. Product Category / Format</h4>
            {['Chocolate Bars', 'Truffles', 'Bonbons', 'Coated Nuts/Fruits', 'Cakes / Pastries', 'Hot Chocolate Mix', 'Gift Boxes', 'Chocolate Spreads'].map(type => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.productTypes.includes(type)}
                  onChange={(e) => handleFilterChange('productTypes', type, e.target.checked)}
                  className="text-black"
                />
                <span className="text-black">{type}</span>
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-md font-playfair font-semibold text-black mb-2">6. Occasion / Theme</h4>
            {['Valentine\'s Day', 'Christmas', 'Birthday', 'Graduation', 'Wedding', 'Wellness', 'Corporate Gifts'].map(occ => (
              <label key={occ} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.occasions.includes(occ)}
                  onChange={(e) => handleFilterChange('occasions', occ, e.target.checked)}
                  className="text-black"
                />
                <span className="text-black">{occ}</span>
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-md font-playfair font-semibold text-black mb-2">7. Price Range (TND)</h4>
            {['Under 5', '5–10', '10–20', '20–50', 'Over 50'].map(range => (
              <label key={range} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.priceRanges.includes(range)}
                  onChange={(e) => handleFilterChange('priceRanges', range, e.target.checked)}
                  className="text-black"
                />
                <span className="text-black">{range}</span>
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-md font-playfair font-semibold text-black mb-2">8. Country of Origin / Brand</h4>
            {['Belgium', 'France', 'Italy', 'Switzerland', 'Ghana', 'Ecuador', 'Local Artisans'].map(country => (
              <label key={country} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.countryOfOrigin.includes(country)}
                  onChange={(e) => handleFilterChange('countryOfOrigin', country, e.target.checked)}
                  className="text-black"
                />
                <span className="text-black">{country}</span>
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-md font-playfair font-semibold text-black mb-2">9. Optional Extras</h4>
            {['Customer Rating 4+', 'In Stock', 'New Arrivals', 'Best Sellers'].map(extra => (
              <label key={extra} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.optionalExtras.includes(extra)}
                  onChange={(e) => handleFilterChange('optionalExtras', extra, e.target.checked)}
                  className="text-black"
                />
                <span className="text-black">{extra}</span>
              </label>
            ))}
          </div>
          <button
            onClick={resetFilters}
            className="w-full bg-gradient-to-r from-milk-chocolate to-dark-chocolate text-cream font-lora px-4 py-2 rounded-full hover:from-dark-chocolate hover:to-milk-chocolate transition duration-300"
          >
            Reset Filters
          </button>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-2 mr-2 rounded ${viewMode === 'grid' ? 'bg-dark-chocolate text-cream' : 'bg-cream text-dark-chocolate'} border border-dark-chocolate`}
          style={{ fontSize: '0' }}
        >
          <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid black' }}></span>
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded ${viewMode === 'list' ? 'bg-dark-chocolate text-cream' : 'bg-cream text-dark-chocolate'} border border-dark-chocolate`}
          style={{ fontSize: '0' }}
        >
          <span style={{ display: 'inline-block', width: '16px', height: '8px', border: '2px solid black', marginBottom: '4px' }}></span>
          <span style={{ display: 'inline-block', width: '16px', height: '8px', border: '2px solid black' }}></span>
        </button>
      </div>
      <div className={`p-4 ${isSidebarOpen ? 'md:ml-[16rem]' : 'ml-0'} pt-4 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'flex flex-col'} gap-0.5 transition-all duration-300`}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={`bg-cream bg-opacity-95 shadow-md rounded-md p-2 text-center cursor-pointer ${viewMode === 'grid' ? 'max-w-xs flex flex-col items-center' : 'flex items-center p-4'}`} onClick={() => handleProductClick(product.id)}>
            {product.image ? (
              <img src={product.image} alt={product.name} className={viewMode === 'grid' ? 'w-full h-32 object-cover rounded-t-md' : 'w-32 h-32 object-cover mr-4'} onError={(e) => console.error(`Image failed to load: ${product.name}`, e)} />
            ) : (
              <div className={viewMode === 'grid' ? 'w-full h-32 bg-gray-300 flex items-center justify-center' : 'w-32 h-32 bg-gray-300 flex items-center justify-center mr-4'}>No Image</div>
            )}
            {viewMode === 'grid' ? (
              <>
                <h4 className="text-md font-playfair font-bold text-dark-chocolate mt-2">{product.name}</h4>
                <p className="text-dark-chocolate font-lora mb-2">{product.price.toFixed(2)} TND</p>
                <p className="text-dark-chocolate font-lora mb-2">Rating: {renderStars(product.rating)}</p>
                <div className="space-x-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    className="bg-gradient-to-r from-dark-chocolate to-milk-chocolate text-cream font-lora px-3 py-1 rounded-full text-sm hover:from-milk-chocolate hover:to-dark-chocolate transition duration-300"
                    disabled={!product.inStock}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToFavorites(product); }}
                    className="bg-gradient-to-r from-milk-chocolate to-dark-chocolate text-dark-chocolate font-lora px-3 py-1 rounded-full text-sm hover:from-dark-chocolate hover:to-milk-chocolate transition duration-300"
                    disabled={!product.inStock}
                  >
                    Add to Favorites
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1">
                <h4 className="text-md font-playfair font-bold text-dark-chocolate">{product.name}</h4>
                <p className="text-dark-chocolate font-lora">Price: {product.price.toFixed(2)} TND</p>
                <p className="text-dark-chocolate font-lora">Rating: {renderStars(product.rating)}</p>
                <p className="text-dark-chocolate font-lora">Ingredients: {product.ingredients.join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;