import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupplierRegister from '@/components/auth/SupplierRegister';
import { useNavigate } from 'react-router-dom';

export default function SupplierRegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <SupplierRegister onClose={() => navigate('/')} />
      </div>
      <Footer />
    </div>
  );
}