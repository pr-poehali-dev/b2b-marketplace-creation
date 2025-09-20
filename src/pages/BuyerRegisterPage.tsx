import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BuyerRegister from '@/components/auth/BuyerRegister';
import { useNavigate } from 'react-router-dom';

export default function BuyerRegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <BuyerRegister onClose={() => navigate('/')} />
      </div>
      <Footer />
    </div>
  );
}