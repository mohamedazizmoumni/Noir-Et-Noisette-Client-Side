import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();

  // Use useMemo to stabilize cartItems
  const cartItems = useMemo(() => location.state?.cartItems || [], [location.state?.cartItems]);

  const [items, setItems] = useState(cartItems);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    navigate('/cart', { state: { cartItems: updatedItems } });
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    navigate('/cart', { state: { cartItems: updatedItems } });
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="p-4 min-h-screen bg-cream">
      <h1 className="text-2xl font-playfair font-bold text-dark-chocolate mb-4">Cart</h1>
      {items.length === 0 ? (
        <p className="text-md font-lora text-dark-chocolate">Your cart is empty.</p>
      ) : (
        <>
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
              {items.map(item => (
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
                      onClick={() => handleDelete(item.id)}
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
        </>
      )}
    </div>
  );
}

export default Cart;