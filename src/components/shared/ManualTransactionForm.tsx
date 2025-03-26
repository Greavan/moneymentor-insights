
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addTransaction } from '@/lib/deepseek';
import { IndianRupee, ListPlus, FilePlus } from 'lucide-react';
import { toast } from 'sonner';

interface ManualTransactionFormProps {
  onTransactionAdded?: (transaction: any) => void;
  categories?: string[];
  title?: string;
  formDescription?: string; // Renamed from 'description' to 'formDescription'
}

const ManualTransactionForm: React.FC<ManualTransactionFormProps> = ({ 
  onTransactionAdded,
  categories = [
    'Housing', 
    'Food & Dining', 
    'Transportation', 
    'Entertainment', 
    'Shopping', 
    'Utilities', 
    'Healthcare', 
    'Travel', 
    'Education', 
    'Miscellaneous',
    'Income',
    'Loan EMI',
    'Investment'
  ],
  title = "Add Transaction Manually",
  formDescription = "Enter transaction details below" // Renamed from 'description' to 'formDescription'
}) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !description || !amount || !category) {
      toast.error('Please fill in all fields');
      return;
    }

    const newTransaction = addTransaction({
      date,
      description,
      amount: parseFloat(amount),
      category,
      type
    });

    if (onTransactionAdded) {
      onTransactionAdded(newTransaction);
    }

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <ListPlus className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{formDescription}</CardDescription> {/* Use formDescription here */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transaction-date">Date</Label>
              <Input
                id="transaction-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transaction-amount">Amount (₹)</Label>
              <div className="flex">
                <div className="flex items-center justify-center border border-r-0 border-input px-3 rounded-l-md bg-muted">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="transaction-amount"
                  type="number"
                  placeholder="0.00"
                  className="rounded-l-none"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-description">Description</Label>
            <Input
              id="transaction-description"
              placeholder="e.g., Grocery shopping, Movie tickets"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transaction-category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="transaction-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transaction-type">Type</Label>
              <Select value={type} onValueChange={(value: 'expense' | 'income') => setType(value)} required>
                <SelectTrigger id="transaction-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <FilePlus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManualTransactionForm;
