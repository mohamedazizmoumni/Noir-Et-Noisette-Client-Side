import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Payment() {
  const { state } = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    password: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    name: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit',
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCartItems = state?.cartItems || JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
    const subtotal = savedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax as an example
    setTotal(subtotal + tax);
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment processed with:', { billingDetails, total });
    alert('Payment processed successfully! Thank you for your purchase.');
  };

  return (
    <div className="min-h-screen bg-cream font-lora">
      {/* Header */}
      <header className="bg-cream text-dark-chocolate py-6 px-8 w-full border-b border-dark-chocolate">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="w-1/3">
            <Link to="/shop">
              <h1 className="text-5xl font-playfair font-bold tracking-widest uppercase">Noire et Noisette</h1>
            </Link>
          </div>
          <div className="w-1/3 text-center">
            <nav className="space-x-6 text-xl font-semibold tracking-wide">
              <Link to="/shop" className="hover:underline hover:text-milk-chocolate">Shop</Link>
              <Link to="/gifts" className="hover:underline hover:text-milk-chocolate">Gifts</Link>
              <Link to="/about" className="hover:underline hover:text-milk-chocolate">About</Link>
            </nav>
          </div>
          <div className="w-1/3 flex justify-end">
            <Link to="/cart" className="text-2xl hover:text-milk-chocolate">🛍</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Checkout Form */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-playfair font-bold text-dark-chocolate mb-4">Checkout</h2>
          <p className="text-gray-600 mb-4">All plans include 40+ advanced tools and features to boost your product. Choose the best plan to fit your needs.</p>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-lg font-semibold text-dark-chocolate mb-2">Payment Method</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={billingDetails.paymentMethod === 'credit'}
                  onChange={handleInputChange}
                  className="text-dark-chocolate"
                />
                <span className="flex items-center">
                  <span className="w-5 h-5 bg-gray-200 rounded-full mr-2"></span> Credit Card
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={billingDetails.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                  className="text-dark-chocolate"
                />
                <span className="flex items-center">
                  <span className="w-5 h-5 bg-gray-200 rounded-full mr-2"></span> PayPal
                </span>
              </label>
            </div>
          </div>

          {/* Billing Details */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-dark-chocolate mb-2">Billing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-dark-chocolate mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={billingDetails.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@gmail.com"
                  className="w-full p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
                />
              </div>
              <div>
                <label className="block text-dark-chocolate mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={billingDetails.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
                />
              </div>
              <div>
                <label className="block text-dark-chocolate mb-1">Country</label>
                <select
                  name="country"
                  value={billingDetails.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
                >
                  <option value="">Select</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="USA">USA</option>
                  <option value="France">France</option>
                </select>
              </div>
              <div>
                <label className="block text-dark-chocolate mb-1">Billing ZIP / Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={billingDetails.zipCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
                />
              </div>
            </div>
          </div>

          {/* Credit Card Info */}
          {billingDetails.paymentMethod === 'credit' && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-dark-chocolate mb-2">Credit Card Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-chocolate mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={billingDetails.cardNumber}
                    onChange={handleInputChange}
                    placeholder="7465 8374 5837 5067"
                    className="w-full p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-dark-chocolate mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={billingDetails.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-chocolate mb-1">Exp Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={billingDetails.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-chocolate mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={billingDetails.cvv}
                      onChange={handleInputChange}
                      placeholder="965"
                      className="w-full p-2 border border-dark-chocolate rounded-md text-dark-chocolate"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-dark-chocolate to-milk-chocolate text-cream font-lora px-6 py-2 rounded-full hover:from-milk-chocolate hover:to-dark-chocolate transition duration-300"
          >
            Proceed with Payment
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-playfair font-bold text-dark-chocolate mb-4">Order Summary</h2>
          <p className="text-gray-600 mb-4">It can help you manage and service orders before, during and after fulfillment.</p>
          <p className="text-center text-2xl font-semibold text-dark-chocolate mb-2">A simple start for everyone</p>
          <p className="text-center text-3xl font-bold text-dark-chocolate mb-2">${total.toFixed(2)}/month</p>
          <button className="w-full bg-gray-200 text-dark-chocolate py-2 rounded-md mb-4">Change Plan</button>
          <div className="space-y-2 text-dark-chocolate">
            <p>Subtotal: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
            <p>Tax: ${(total - cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)).toFixed(2)}</p>
            <p className="font-bold">Total: ${total.toFixed(2)}</p>
          </div>
          <p className="text-sm text-gray-600 mt-4">By continuing, you accept to our Terms of Services and Privacy Policy. Please note that payments are non-refundable.</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;