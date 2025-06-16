import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import { useState } from 'react';
import Hero from './Components/Hero';
import ProductShowcase from './Components/ProductShowcase';
import BrandStory from './Components/BrandStory';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Shop from './Components/Shop';
import ProductDetail from './Components/ProductDetail';
import Cart from './Components/Cart';
import Wishlist from './Components/Wishlist';
import Payment from './Components/Payment';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="bg-dark-chocolate text-cream">
        <Header setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProductShowcase searchQuery={searchQuery} />
              <BrandStory />
            </>
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;