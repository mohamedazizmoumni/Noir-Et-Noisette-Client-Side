import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chocolate6 from '../assets/chocolate6.jpg';
import Chocolate7 from '../assets/chocolate7.jpg';

function Signup() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    termsAccepted: false,
    captcha: ''
  });
  const [error, setError] = useState('');
  const captchaValue = generateCaptcha(); // Removed setCaptchaValue

  const images = [Chocolate6, Chocolate7]; // Moved up to avoid use-before-define

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  function generateCaptcha() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStage = () => {
    switch (currentStage) {
      case 1:
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email) || formData.password.length < 6) {
          setError('Please enter a valid email and password (min 6 characters).');
          return false;
        }
        break;
      case 2:
        if (!formData.name || !formData.phone || !/^\+?[1-9]\d{9,14}$/.test(formData.phone)) {
          setError('Please enter a valid name and phone number (e.g., +216123456789).');
          return false;
        }
        break;
      case 3:
        if (!formData.street || !formData.city || !formData.postalCode || !formData.country) {
          setError('Please fill all address fields.');
          return false;
        }
        break;
      case 4:
        if (!formData.termsAccepted || formData.captcha !== captchaValue) {
          setError('Please accept terms and enter the correct CAPTCHA.');
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const nextStage = () => {
    if (validateStage()) {
      setError('');
      setCurrentStage((prev) => prev + 1);
    }
  };

  const prevStage = () => {
    setError('');
    setCurrentStage((prev) => prev - 1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateStage()) {
      try {
        const response = await axios.post('http://localhost:5000/api/signup', {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          address: `${formData.street}, ${formData.city}, ${formData.postalCode}, ${formData.country}`
        });
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred');
      }
    }
  };

  return (
    <div style={{ backgroundImage: `url(${images[currentImage]})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }} className="flex items-center justify-center">
      <div className="bg-cream bg-opacity-95 shadow-xl rounded-xl p-10 w-full max-w-lg">
        <h2 className="text-4xl font-playfair font-bold text-dark-chocolate text-center mb-8">
          Join Noir et Noisette
        </h2>

        {error && <p className="text-red-600 text-center mb-6 font-lora">{error}</p>}

        <div className="mb-6 flex justify-center space-x-2">
          {[1, 2, 3, 4].map((stage) => (
            <div
              key={stage}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStage === stage ? 'bg-dark-chocolate text-cream' : 'bg-milk-chocolate text-dark-chocolate'
              }`}
            >
              {stage}
            </div>
          ))}
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {currentStage === 1 && (
            <>
              <div>
                <label htmlFor="email" className="block mb-2 text-lg text-dark-chocolate font-lora">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-lg text-dark-chocolate font-lora">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
                  required
                />
              </div>
            </>
          )}

          {currentStage === 2 && (
            <>
              <div>
                <label htmlFor="name" className="block mb-2 text-lg text-dark-chocolate font-lora">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-lg text-dark-chocolate font-lora">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone (e.g., +216123456789)"
                  className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
                  required
                />
              </div>
            </>
          )}

          {currentStage === 3 && (
            <>
              <div>
                <label htmlFor="street" className="block mb-2 text-lg text-dark-chocolate font-lora">
                  Street Address
                </label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter your street"
                  className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block mb-2 text-lg text-dark-chocolate font-lora">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block mb-2 text-lg text-dark-chocolate font-lora">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Enter your postal code"
                  className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block mb-2 text-lg text-dark-chocolate font-lora">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
                  required
                />
              </div>
            </>
          )}

          {currentStage === 4 && (
            <>
              <div>
                <label className="block mb-2 text-lg text-dark-chocolate font-lora">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  I accept the <a href="/terms" className="text-milk-chocolate hover:underline">Terms & Conditions</a>
                </label>
              </div>
              <div>
                <p className="mb-2 text-lg text-dark-chocolate font-lora">Enter CAPTCHA: {captchaValue}</p>
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  value={formData.captcha}
                  onChange={handleChange}
                  placeholder="Type the CAPTCHA above"
                  className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-between">
            {currentStage > 1 && (
              <button
                type="button"
                onClick={prevStage}
                className="bg-milk-chocolate text-cream font-lora px-6 py-2 rounded-full hover:bg-dark-chocolate transition duration-300"
              >
                Back
              </button>
            )}
            {currentStage < 4 ? (
              <button
                type="button"
                onClick={nextStage}
                className="bg-dark-chocolate text-cream font-lora px-6 py-2 rounded-full hover:bg-milk-chocolate transition duration-300"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-dark-chocolate text-cream font-lora px-6 py-2 rounded-full hover:bg-milk-chocolate transition duration-300"
              >
                Submit
              </button>
            )}
          </div>
        </form>

        <p className="mt-8 text-center text-dark-chocolate font-lora text-base">
          Already have an account?{' '}
          <Link to="/login" className="text-milk-chocolate hover:underline font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;