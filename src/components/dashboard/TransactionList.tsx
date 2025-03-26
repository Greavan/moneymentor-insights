
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/lib/deepseek';
import { ArrowDownLeft, ArrowUpRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TransactionListProps {
  transactions: Transaction[] | null;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // If no transactions, show empty state
  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Upload a bank statement to see your transactions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No transactions yet</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Upload your bank statement to see your transaction history and get personalized insights
          </p>
        </CardContent>
      </Card>
    );
  }

  // Get all unique categories from transactions
  const categories = Array.from(new Set(transactions.map(t => t.category)));

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Apply search filter
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply type filter
    const matchesTypeFilter = 
      filter === 'all' || 
      (filter === 'income' && transaction.type === 'income') ||
      (filter === 'expense' && transaction.type === 'expense');
    
    // Apply category filter
    const matchesCategoryFilter = 
      categoryFilter === 'all' || 
      transaction.category === categoryFilter;
    
    return matchesSearch && matchesTypeFilter && matchesCategoryFilter;
  });

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Your recent financial activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={(value) => setFilter(value as 'all' | 'income' | 'expense')}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr 
                    key={transaction.id} 
                    className={`border-t border-border hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-transparent' : 'bg-muted/10'}`}
                  >
                    <td className="px-4 py-3 text-sm">{transaction.date}</td>
                    <td className="px-4 py-3 text-sm">{transaction.description}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex items-center justify-end">
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 mr-1 text-red-500" />
                        )}
                        <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                          {formatter.format(transaction.amount)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTransactions.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No transactions match your filters</p>
            </div>
          )}
          {filteredTransactions.length > 0 && filteredTransactions.length < transactions.length && (
            <div className="py-3 px-4 border-t border-border bg-muted/20 text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
