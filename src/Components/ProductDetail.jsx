import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DarkChocolateBar from '../assets/Dark Chocolate Bar.jpg';
import DarkTruffle from '../assets/Dark-truffle.jpg';
import HazelnutPraline from '../assets/Hazelnut Pralines.jpg';
import MilkChocolateTruffles from '../assets/Milk Chocolate Truffles.jpg';
import NoirCaramel from '../assets/Noir Caramel.jpg';
import WhiteChocolateAlmonds from '../assets/White Chocolate Almonds.jpg';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSection, setSelectedSection] = useState('description');
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const products = [
    { id: 1, name: 'Dark Chocolate Bar', price: 18.57, category: 'Bars', chocolateType: 'Dark', ingredients: ['Caramel'], cocoaPercentage: '61-75%', productType: 'Bars', occasion: 'Corporate Gifts', rating: 4, inStock: true, image: DarkChocolateBar, description: 'A rich dark chocolate bar with a smooth caramel filling.' },
    { id: 2, name: 'Dark Truffle', price: 27.87, category: 'Truffles', chocolateType: 'Dark', ingredients: ['Praline', 'Nuts'], cocoaPercentage: '76-90%', productType: 'Truffles', occasion: 'Valentine\'s Day', rating: 5, inStock: true, image: DarkTruffle, description: 'Decadent dark truffles with a nutty praline center.' },
    { id: 3, name: 'White Chocolate Almonds', price: 20.12, category: 'Nuts', chocolateType: 'White', ingredients: ['Nuts', 'Fruit'], cocoaPercentage: '30-40%', productType: 'Coated Nuts/Fruits', occasion: 'Birthday', rating: 3, inStock: false, image: WhiteChocolateAlmonds, description: 'Creamy white chocolate-coated almonds with a fruity twist.' },
    { id: 4, name: 'Hazelnut Pralines', price: 24.77, category: 'Pralines', chocolateType: 'Milk', ingredients: ['Nuts', 'Praline'], cocoaPercentage: '41-60%', productType: 'Bonbons', occasion: 'Christmas', rating: 4, inStock: true, image: HazelnutPraline, description: 'Milk chocolate pralines filled with roasted hazelnuts.' },
    { id: 5, name: 'Milk Chocolate Truffles', price: 27.87, category: 'Truffles', chocolateType: 'Milk', ingredients: ['Cream filling'], cocoaPercentage: '41-60%', productType: 'Truffles', occasion: 'Wedding', rating: 5, inStock: true, image: MilkChocolateTruffles, description: 'Smooth milk chocolate truffles with a creamy center.' },
    { id: 6, name: 'Noir Caramel', price: 22.45, category: 'Bars', chocolateType: 'Dark', ingredients: ['Caramel', 'Spices'], cocoaPercentage: '76-90%', productType: 'Bars', occasion: 'Graduation', rating: 4, inStock: false, image: NoirCaramel, description: 'Dark chocolate bar with spiced caramel layers.' },
    { id: 7, name: 'Celebration Gift Box Mix', price: 48.00, category: 'Gift Boxes', chocolateType: 'Mixed', ingredients: ['Praline', 'Ganache', 'Caramel', 'Milk Chocolate', 'Dark Chocolate', 'White Chocolate'], cocoaPercentage: 'Mixed', productType: 'Gift Boxes', occasion: 'Celebration', rating: 4, inStock: false, image: WhiteChocolateAlmonds, description: 'A luxurious gift box with a variety of premium chocolates.' },
  ];
  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (!product) navigate('/shop');
    const savedCartItems = localStorage.getItem('cartItems');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedCartItems) setCartItems(JSON.parse(savedCartItems));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, [product, navigate]);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleAddToCart = () => {
    if (product.inStock) {
      const itemToAdd = { ...product, quantity };
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        const newItems = existingItem
          ? prevItems.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            )
          : [...prevItems, itemToAdd];
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        return newItems;
      });
    }
  };

  const handleAddToFavorites = () => {
    if (product.inStock && !favorites.some(fav => fav.id === product.id)) {
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const handleDeleteCartItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  if (!product) return <div>Product not found</div>;

  const nutritionValues = {
    'Energy': '2200 kJ / 525 kcal',
    'Fat': '32g, of which saturates: 19g',
    'Carbohydrate': '50g, of which sugars: 46g',
    'Protein': '7g',
    'Salt': '0.1g',
    'Vitamin A': '16.44 µg',
    'Calcium': '114.04 mg',
    'Vitamin C': '0.50 mg',
    'Iron': '6.46 mg',
    'Vitamin D': '0.87 µg',
    'Potassium': '408.26 mg',
  };

  const availableProducts = products.filter(p => p.inStock && p.id !== product.id);

  return (
    <div className="p-4 min-h-screen bg-cream">
      <button onClick={() => navigate('/shop')} className="mb-4 bg-dark-chocolate text-cream px-4 py-2 rounded-full hover:bg-milk-chocolate transition duration-300">
        Back to Shop
      </button>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-full md:w-1/3">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md" />
          ) : (
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center">No Image</div>
          )}
          <div className="flex mt-4 space-x-2">
            {products.filter(p => p.inStock).map(p => (
              <img key={p.id} src={p.image} alt={`${p.name} thumbnail`} className="w-16 h-16 object-cover rounded-md" />
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-playfair font-bold text-dark-chocolate mb-2 flex items-center">
            {product.name} <span className="ml-2 text-red-500">❤️</span>
          </h1>
          {!product.inStock && <p className="text-red-500 mb-2">This item is currently unavailable</p>}
          <p className="text-lg font-lora text-dark-chocolate mb-2">Price: {product.price.toFixed(2)} TND</p>
          <p className="text-md font-lora text-dark-chocolate mb-2">Rating: {renderStars(product.rating)}</p>
          <div className="mb-4">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
            >
              <option value="description">Product Description</option>
              <option value="ingredients">Ingredients</option>
              <option value="nutrition">Nutrition Values</option>
            </select>
          </div>
          {selectedSection === 'description' && (
            <div className="text-md font-lora text-dark-chocolate mb-4">
              Celebrating all special moments with the {product.name} ({product.weight || '266g'}) with an elegant sleeve that can be personalized. This gift box contains a selection of 24 timeless {product.chocolateType.toLowerCase()} chocolates filled with praline, ganache, and caramel.
            </div>
          )}
          {selectedSection === 'ingredients' && (
            <div className="text-md font-lora text-dark-chocolate mb-4">
              {product.ingredients.join(', ')}
            </div>
          )}
          {selectedSection === 'nutrition' && (
            <table className="w-full text-md font-lora text-dark-chocolate mb-4 border-collapse">
              <tbody>
                {Object.entries(nutritionValues).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-2">{key}</td>
                    <td className="py-2 pl-4">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="mt-4">
            <label className="block text-md font-lora text-dark-chocolate mb-2">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
              min="1"
              disabled={!product.inStock}
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 mr-2 bg-gradient-to-r from-dark-chocolate to-milk-chocolate text-cream font-lora px-6 py-2 rounded-full hover:from-milk-chocolate hover:to-dark-chocolate transition duration-300"
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
          <button
            onClick={handleAddToFavorites}
            className="mt-4 bg-gradient-to-r from-dark-chocolate to-milk-chocolate text-cream font-lora px-6 py-2 rounded-full hover:from-milk-chocolate hover:to-dark-chocolate transition duration-300"
            disabled={!product.inStock}
          >
            Add to Favoris
          </button>
          {!product.inStock && (
            <button
              onClick={() => console.log(`Notify for ${product.name} when back in stock`)}
              className="mt-2 bg-gray-300 text-dark-chocolate font-lora px-6 py-2 rounded-full hover:bg-gray-400 transition duration-300"
            >
              Notify Me When This Is Back In Stock
            </button>
          )}
        </div>
      </div>
      {availableProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-playfair font-bold text-dark-chocolate mb-4">Recommendations</h2>
          <div className="flex justify-around">
            {availableProducts.map(p => (
              <div key={p.id} className="text-center">
                <img src={p.image} alt={p.name} className="w-48 h-auto object-cover rounded-md" />
                <p className="text-md font-lora text-dark-chocolate mt-2">{p.name}</p>
                <p className="text-md font-lora text-dark-chocolate">Price: {p.price.toFixed(2)} TND</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-playfair font-bold text-dark-chocolate mb-4">Cart Items</h2>
          <table className="w-full text-md font-lora text-dark-chocolate border-collapse">
            <thead>
              <tr className="bg-dark-chocolate text-cream">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Total Price</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="p-2"><img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" /></td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 p-1 border border-dark-chocolate rounded-md text-dark-chocolate"
                      min="1"
                    />
                  </td>
                  <td className="p-2">{(item.price * item.quantity).toFixed(2)} TND</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteCartItem(item.id)}
                      className="bg-red-500 text-cream px-2 py-1 rounded-full hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-gradient-to-r from-dark-chocolate to-milk-chocolate text-cream font-lora px-6 py-2 rounded-full hover:from-milk-chocolate hover:to-dark-chocolate transition duration-300"
          >
            Passer à la caisse
          </button>
        </div>
      )}
      {favorites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-playfair font-bold text-dark-chocolate mb-4">Favoris</h2>
          <table className="w-full text-md font-lora text-dark-chocolate border-collapse">
            <thead>
              <tr className="bg-dark-chocolate text-cream">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map(fav => (
                <tr key={fav.id} className="border-b">
                  <td className="p-2"><img src={fav.image} alt={fav.name} className="w-16 h-16 object-cover rounded-md" /></td>
                  <td className="p-2">{fav.name}</td>
                  <td className="p-2">{fav.description}</td>
                  <td className="p-2">{fav.price.toFixed(2)} TND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;