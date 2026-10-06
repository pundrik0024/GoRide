import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function RegisterPage() {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen pt-20"><LoadingSpinner /></div>;
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F7F5] flex items-center justify-center p-6 py-12">
      <RegisterForm />
    </div>
  );
}
