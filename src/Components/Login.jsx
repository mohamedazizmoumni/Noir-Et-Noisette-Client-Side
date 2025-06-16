import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chocolate6 from '../assets/chocolate6.jpg';
import Chocolate7 from '../assets/chocolate7.jpg';
import GoogleIcon from '../assets/google.png';
import FacebookIcon from '../assets/facebook.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Chocolate6, Chocolate7];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/'; // Redirect to home
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  return (
    <div
      style={{ backgroundImage: `url(${images[currentImage]})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}
      className="flex items-center justify-center"
    >
      <div className="bg-cream bg-opacity-95 shadow-xl rounded-xl p-10 w-full max-w-xl"> {/* Increased size */}
        <h2 className="text-3xl font-playfair font-bold text-dark-chocolate text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-dark-chocolate font-lora mb-6">Log in to continue your chocolate journey</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-lg text-dark-chocolate font-lora">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-4 rounded-lg border border-milk-chocolate text-dark-chocolate focus:outline-none focus:ring-2 focus:ring-dark-chocolate transition duration-200"
              required
            />
          </div>
          {error && <p className="text-red-600 text-center font-lora">{error}</p>}
          <button
            type="submit"
            className="w-full bg-dark-chocolate text-cream font-lora text-lg px-6 py-3 rounded-full hover:bg-milk-chocolate transition duration-300 shadow-md"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 flex justify-center space-x-4"> {/* Side-by-side buttons with spacing */}
          <button
            onClick={() => handleSocialLogin('google')}
            className="bg-white text-dark-chocolate font-lora px-4 py-2 rounded-full hover:bg-red-100 transition duration-300 flex items-center justify-center border-2 border-red-600"
          >
            <img src={GoogleIcon} alt="Google" className="w-6 h-6 mr-2" /> Google
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="bg-blue-800 text-white font-lora px-4 py-2 rounded-full hover:bg-blue-900 transition duration-300 flex items-center justify-center"
          >
            <img src={FacebookIcon} alt="Facebook" className="w-6 h-6 mr-2" /> Facebook
          </button>
        </div>

        <p className="mt-6 text-center text-dark-chocolate font-lora text-base">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-milk-chocolate hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;