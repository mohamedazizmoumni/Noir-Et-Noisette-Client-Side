import { useState, useEffect } from 'react';
import axios from 'axios';

function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, window.location.pathname);
      onClose();
    }
  }, [onClose]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = isSignup ? 'http://localhost:5000/api/signup' : 'http://localhost:5000/api/login';
      const response = await axios.post(url, { email, password });
      localStorage.setItem('token', response.data.token);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-cream p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-playfair font-bold mb-4">
          {isSignup ? 'Sign Up' : 'Log In'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 rounded-lg text-dark-chocolate"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 rounded-lg text-dark-chocolate"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-dark-chocolate text-cream px-4 py-2 rounded-full hover:bg-milk-chocolate transition duration-300"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => handleSocialLogin('google')}
            className="bg-red-600 text-cream px-4 py-2 rounded-full mr-2 hover:bg-red-700 transition duration-300"
          >
            Sign Up with Google
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="bg-blue-600 text-cream px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Sign Up with Facebook
          </button>
        </div>
        <p className="mt-4 text-center">
          {isSignup ? 'Already have an account?' : 'Need an account?'}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-milk-chocolate hover:underline"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>
        <button onClick={onClose} className="mt-4 text-dark-chocolate hover:underline">
          Close
        </button>
      </div>
    </div>
  );
}

export default AuthModal;