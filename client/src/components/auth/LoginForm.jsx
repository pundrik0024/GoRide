import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-[#E6E6E1] rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#171717] mb-2">Welcome back</h2>
        <p className="text-[#6B6B67] text-sm">Sign in to manage your bookings</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 border border-[#E6E6E1] rounded-lg focus:outline-none focus:border-[#315C4B] transition-colors"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 border border-[#E6E6E1] rounded-lg focus:outline-none focus:border-[#315C4B] transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#315C4B] text-white rounded-lg font-bold hover:bg-[#234F3E] transition-colors flex items-center justify-center gap-2"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-[#6B6B67]">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#315C4B] font-bold hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
