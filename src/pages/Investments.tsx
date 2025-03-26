
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import InvestmentAdvisor from '@/components/investment/InvestmentAdvisor';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Investments: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="container max-w-7xl mx-auto px-4 space-y-8">
          <h1 className="text-3xl font-bold">Investment Advisor</h1>
          <p className="text-muted-foreground mb-8">
            Get personalized investment recommendations and plan your financial future
          </p>
          
          <InvestmentAdvisor />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Investments;
