
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import SpendingInsights from '@/components/dashboard/SpendingInsights';
import TransactionList from '@/components/dashboard/TransactionList';
import UploadStatement from '@/components/dashboard/UploadStatement';
import { FinancialSummary } from '@/lib/deepseek';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [financialData, setFinancialData] = useState<FinancialSummary | null>(null);

  const handleAnalysisComplete = (data: FinancialSummary) => {
    setFinancialData(data);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="container max-w-7xl mx-auto px-4 space-y-8">
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          
          <DashboardOverview data={financialData} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <UploadStatement onAnalysisComplete={handleAnalysisComplete} />
            </div>
            <div className="md:col-span-2">
              <SpendingInsights data={financialData} />
            </div>
          </div>
          
          <TransactionList transactions={financialData?.transactions || null} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
