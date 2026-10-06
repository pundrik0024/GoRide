import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { validateEmail, validatePhone, validatePassword, validateName } from '../../utils/validators';

export default function RegisterForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!validateName(formData.name)) newErrors.name = 'Name is too short';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid 10-digit phone number';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirm) newErrors.confirm = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setApiError('');
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.phone);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-[#E6E6E1] rounded-2xl p-8 shadow-sm my-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#171717] mb-2">Create an account</h2>
        <p className="text-[#6B6B67] text-sm">Join GoRide for seamless travel</p>
      </div>

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-6">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Full Name</label>
          <input
            type="text" name="name" value={formData.name} onChange={handleChange}
            className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] ${errors.name ? 'border-red-500' : 'border-[#E6E6E1]'}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Email Address</label>
          <input
            type="email" name="email" value={formData.email} onChange={handleChange}
            className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] ${errors.email ? 'border-red-500' : 'border-[#E6E6E1]'}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Phone Number</label>
          <input
            type="tel" name="phone" value={formData.phone} onChange={handleChange}
            className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] ${errors.phone ? 'border-red-500' : 'border-[#E6E6E1]'}`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Password</label>
          <input
            type="password" name="password" value={formData.password} onChange={handleChange}
            className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] ${errors.password ? 'border-red-500' : 'border-[#E6E6E1]'}`}
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6B6B67] mb-1">Confirm Password</label>
          <input
            type="password" name="confirm" value={formData.confirm} onChange={handleChange}
            className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:border-[#315C4B] ${errors.confirm ? 'border-red-500' : 'border-[#E6E6E1]'}`}
          />
          {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#315C4B] text-white rounded-lg font-bold hover:bg-[#234F3E] transition-colors mt-6"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-[#6B6B67]">
        Already have an account?{' '}
        <Link to="/login" className="text-[#315C4B] font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
