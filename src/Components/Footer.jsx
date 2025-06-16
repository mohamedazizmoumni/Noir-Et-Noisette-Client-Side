import { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // using react-icons

function Footer() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [language, setLanguage] = useState('English');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with email: ${email}.`);
    setEmail('');
  };

  return (
    <footer className="bg-dark-chocolate text-cream py-12 px-4 font-lora">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-10 text-center md:text-left">
        {/* Brand */}
        <div>
          <h3 className="text-3xl font-playfair font-bold mb-4">Noir et Noisette</h3>
          <p>Indulgent Chocolates Since 2025</p>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-playfair font-semibold mb-3 text-lg">Products</h4>
          <ul className="space-y-1">
            <li>All Chocolates</li>
            <li>Ballotins</li>
            <li>Bars & Tablets</li>
            <li>Gift Boxes</li>
            <li>Gift Cards</li>
          </ul>
        </div>

        {/* Gift Occasions */}
        <div>
          <h4 className="font-playfair font-semibold mb-3 text-lg">Gift Occasions</h4>
          <ul className="space-y-1">
            <li>Birthday Gifts</li>
            <li>Congratulations</li>
            <li>Gifts for Her</li>
            <li>Gifts for Him</li>
            <li>Thank You Gifts</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-playfair font-semibold mb-3 text-lg">Customer Service</h4>
          <ul className="space-y-1">
            <li>FAQs</li>
            <li>Shipping & Delivery</li>
            <li>Contact Us</li>
            <li>Working with Us</li>
          </ul>
        </div>

        {/* Country, Language, Newsletter */}
        <div>
          <h4 className="font-playfair font-semibold mb-3 text-lg">Stay Connected</h4>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full mb-2 p-2 rounded-lg text-dark-chocolate"
          >
            <option>United Kingdom</option>
            <option>France</option>
            <option>Germany</option>
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full mb-2 p-2 rounded-lg text-dark-chocolate"
          >
            <option>English</option>
            <option>French</option>
            <option>German</option>
          </select>
          <form onSubmit={handleNewsletterSubmit} className="mt-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full p-2 rounded-lg text-dark-chocolate mb-2"
              required
            />
            <button
              type="submit"
              className="w-full bg-cream text-dark-chocolate py-2 rounded-full hover:bg-dark-chocolate hover:text-cream transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="max-w-7xl mx-auto border-t border-cream pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Payment Methods */}
        <div>
          <h4 className="font-playfair font-semibold mb-2 text-lg">Payment Methods</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💸 PayPal</span>
          </div>
        </div>

        {/* Shipping Methods */}
        <div>
          <h4 className="font-playfair font-semibold mb-2 text-lg">Shipping Methods</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <span>📦 DHL</span>
            <span>📦 UPS</span>
            <span>📦 FedEx</span>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-playfair font-semibold mb-2 text-lg">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-4 text-2xl">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-milk-chocolate"><FaFacebookF /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-milk-chocolate"><FaInstagram /></a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-milk-chocolate"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <p className="text-center text-sm mt-8">© 2025 Noir et Noisette. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
