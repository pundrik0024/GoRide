import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen pt-20"><LoadingSpinner /></div>;
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F7F5] flex items-center justify-center p-6">
      <LoginForm />
    </div>
  );
}
