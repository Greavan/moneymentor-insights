import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoanTracker from '@/components/loans/LoanTracker';
import ManualTransactionForm from '@/components/shared/ManualTransactionForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Transaction } from '@/lib/deepseek';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, ReceiptIndianRupee } from 'lucide-react';

const Loans: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [manualTransactions, setManualTransactions] = useState<Transaction[]>([]);

  const handleTransactionAdded = (transaction: Transaction) => {
    setManualTransactions(prev => [transaction, ...prev]);
  };

  const loanCategories = [
    'Home Loan',
    'Car Loan',
    'Personal Loan',
    'Education Loan',
    'Credit Card',
    'Business Loan',
    'Other EMI'
  ];

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="container max-w-7xl mx-auto px-4 space-y-8">
          <h1 className="text-3xl font-bold">Loan & EMI Tracker</h1>
          <p className="text-muted-foreground mb-8">
            Track your loans, EMIs, and upcoming payments in one place
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ManualTransactionForm 
                onTransactionAdded={handleTransactionAdded}
                categories={loanCategories}
                title="Add Loan Payment"
                formDescription="Record your loan EMI payments"
              />
              
              {manualTransactions.length > 0 && (
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <ReceiptIndianRupee className="w-5 h-5 text-primary" />
                      <CardTitle>Recent Payments</CardTitle>
                    </div>
                    <CardDescription>Your recent loan payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {manualTransactions.map((transaction) => (
                        <div 
                          key={transaction.id} 
                          className="flex justify-between items-center p-3 rounded-lg bg-muted/40 border border-border"
                        >
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">{transaction.date}</p>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                {transaction.category}
                              </span>
                            </div>
                          </div>
                          <p className="font-semibold">
                            ₹{transaction.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="md:col-span-2">
              <LoanTracker />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Loans;
