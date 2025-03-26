
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import SpendingInsights from '@/components/dashboard/SpendingInsights';
import TransactionList from '@/components/dashboard/TransactionList';
import UploadStatement from '@/components/dashboard/UploadStatement';
import ManualTransactionForm from '@/components/shared/ManualTransactionForm';
import { FinancialSummary, Transaction } from '@/lib/deepseek';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [financialData, setFinancialData] = useState<FinancialSummary | null>(null);
  const [manualTransactions, setManualTransactions] = useState<Transaction[]>([]);

  const handleAnalysisComplete = (data: FinancialSummary) => {
    setFinancialData(data);
  };

  const handleTransactionAdded = (transaction: Transaction) => {
    setManualTransactions(prev => [transaction, ...prev]);
    
    // If we have financial data, update it with the new transaction
    if (financialData) {
      const updatedData = { ...financialData };
      
      // Add transaction to the list
      updatedData.transactions = [transaction, ...updatedData.transactions];
      
      // Update totals
      if (transaction.type === 'income') {
        updatedData.totalIncome += transaction.amount;
      } else {
        updatedData.totalExpenses += transaction.amount;
      }
      
      updatedData.balance = updatedData.totalIncome - updatedData.totalExpenses;
      updatedData.savingsRate = Math.round((updatedData.balance / updatedData.totalIncome) * 100);
      
      // Update categories if it's an expense
      if (transaction.type === 'expense') {
        const categoryIndex = updatedData.topExpenseCategories.findIndex(
          cat => cat.category === transaction.category
        );
        
        if (categoryIndex >= 0) {
          // Update existing category
          updatedData.topExpenseCategories[categoryIndex].amount += transaction.amount;
          updatedData.topExpenseCategories[categoryIndex].transactions.push(transaction);
          
          // Recalculate percentages
          updatedData.topExpenseCategories.forEach(cat => {
            cat.percentage = Math.round((cat.amount / updatedData.totalExpenses) * 100);
          });
          
          // Resort categories
          updatedData.topExpenseCategories.sort((a, b) => b.amount - a.amount);
        } else {
          // Add new category
          updatedData.topExpenseCategories.push({
            category: transaction.category,
            amount: transaction.amount,
            percentage: Math.round((transaction.amount / updatedData.totalExpenses) * 100),
            transactions: [transaction]
          });
          
          // Recalculate percentages for all categories
          updatedData.topExpenseCategories.forEach(cat => {
            cat.percentage = Math.round((cat.amount / updatedData.totalExpenses) * 100);
          });
          
          // Resort categories
          updatedData.topExpenseCategories.sort((a, b) => b.amount - a.amount);
        }
      }
      
      setFinancialData(updatedData);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Combine API and manual transactions
  const allTransactions = financialData
    ? [...manualTransactions, ...financialData.transactions]
    : manualTransactions;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="container max-w-7xl mx-auto px-4 space-y-8">
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          
          <DashboardOverview data={financialData} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="space-y-6">
                <UploadStatement onAnalysisComplete={handleAnalysisComplete} />
                <ManualTransactionForm onTransactionAdded={handleTransactionAdded} />
              </div>
            </div>
            <div className="md:col-span-2">
              <SpendingInsights data={financialData} />
            </div>
          </div>
          
          <TransactionList transactions={allTransactions.length > 0 ? allTransactions : null} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
