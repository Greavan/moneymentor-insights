
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownRight, ArrowUpRight, Landmark, LineChart, PiggyBank, Wallet, IndianRupee } from 'lucide-react';
import { FinancialSummary } from '@/lib/deepseek';

interface DashboardOverviewProps {
  data: FinancialSummary | null;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ data }) => {
  // Format currency as INR
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  // If no data, show placeholder stats
  const stats = data ? {
    income: data.totalIncome,
    expenses: data.totalExpenses,
    balance: data.balance,
    savingsRate: data.savingsRate
  } : {
    income: 0,
    expenses: 0,
    balance: 0,
    savingsRate: 0
  };

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
      <Card className="hover-scale">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <IndianRupee className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatter.format(stats.income)}
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1.5">
            <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-green-500 font-medium">+4.3%</span> 
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <Wallet className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatter.format(stats.expenses)}
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1.5">
            <ArrowUpRight className="w-4 h-4 mr-1 text-red-500" />
            <span className="text-red-500 font-medium">+2.7%</span> 
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <Landmark className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatter.format(stats.balance)}
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1.5">
            <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-green-500 font-medium">+8.2%</span> 
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <PiggyBank className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.savingsRate}%
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1.5">
            <ArrowDownRight className="w-4 h-4 mr-1 text-red-500" />
            <span className="text-red-500 font-medium">-1.8%</span> 
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
