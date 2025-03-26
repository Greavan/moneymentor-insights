
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Calendar, DollarSign, Percent, Trash2, Edit, Wallet, CalendarClock, AlertTriangle, BellRing } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Loan {
  id: string;
  name: string;
  amount: number;
  remainingAmount: number;
  interestRate: number;
  startDate: string;
  endDate: string;
  paymentAmount: number;
  paymentFrequency: 'monthly' | 'weekly' | 'biweekly';
  type: 'mortgage' | 'auto' | 'personal' | 'student' | 'other';
  nextPaymentDate: string;
}

interface Reminder {
  id: string;
  loanId: string;
  date: string;
  amount: number;
  isPaid: boolean;
}

const LoanTracker: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: '1',
      name: 'Home Mortgage',
      amount: 250000,
      remainingAmount: 235000,
      interestRate: 4.5,
      startDate: '2022-01-01',
      endDate: '2052-01-01',
      paymentAmount: 1250,
      paymentFrequency: 'monthly',
      type: 'mortgage',
      nextPaymentDate: '2023-12-01'
    },
    {
      id: '2',
      name: 'Car Loan',
      amount: 35000,
      remainingAmount: 28000,
      interestRate: 3.9,
      startDate: '2022-03-15',
      endDate: '2027-03-15',
      paymentAmount: 650,
      paymentFrequency: 'monthly',
      type: 'auto',
      nextPaymentDate: '2023-12-15'
    },
    {
      id: '3',
      name: 'Student Loan',
      amount: 45000,
      remainingAmount: 32000,
      interestRate: 5.8,
      startDate: '2020-09-01',
      endDate: '2030-09-01',
      paymentAmount: 450,
      paymentFrequency: 'monthly',
      type: 'student',
      nextPaymentDate: '2023-12-05'
    }
  ]);
  
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      loanId: '1',
      date: '2023-12-01',
      amount: 1250,
      isPaid: false
    },
    {
      id: '2',
      loanId: '2',
      date: '2023-12-15',
      amount: 650,
      isPaid: false
    },
    {
      id: '3',
      loanId: '3',
      date: '2023-12-05',
      amount: 450,
      isPaid: false
    }
  ]);
  
  const [newLoan, setNewLoan] = useState<Partial<Loan>>({
    name: '',
    amount: 0,
    remainingAmount: 0,
    interestRate: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    paymentAmount: 0,
    paymentFrequency: 'monthly',
    type: 'personal'
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLoanId, setEditingLoanId] = useState<string | null>(null);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const calculateTotalMonthlyPayment = () => {
    return loans.reduce((sum, loan) => sum + loan.paymentAmount, 0);
  };

  const calculateTotalDebt = () => {
    return loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  };

  const handleDeleteLoan = (id: string) => {
    setLoans(loans.filter(loan => loan.id !== id));
    setReminders(reminders.filter(reminder => reminder.loanId !== id));
    toast.success('Loan deleted successfully');
  };

  const handleEditLoan = (loan: Loan) => {
    setNewLoan(loan);
    setEditingLoanId(loan.id);
    setIsDialogOpen(true);
  };

  const handleAddOrUpdateLoan = () => {
    if (!newLoan.name || !newLoan.amount || !newLoan.interestRate || !newLoan.startDate || !newLoan.endDate || !newLoan.paymentAmount) {
      toast.error('Please fill all required fields');
      return;
    }

    const today = new Date();
    const nextPaymentDay = new Date(today);
    nextPaymentDay.setMonth(today.getMonth() + 1);
    
    if (editingLoanId) {
      // Update existing loan
      setLoans(loans.map(loan => 
        loan.id === editingLoanId 
          ? { 
              ...loan, 
              ...newLoan as Loan,
              id: editingLoanId
            } 
          : loan
      ));
      
      toast.success('Loan updated successfully');
    } else {
      // Add new loan
      const newLoanWithId: Loan = {
        ...newLoan as any,
        id: Date.now().toString(),
        remainingAmount: newLoan.remainingAmount || newLoan.amount || 0,
        nextPaymentDate: nextPaymentDay.toISOString().split('T')[0]
      };
      
      setLoans([...loans, newLoanWithId]);
      
      // Create a new reminder for the loan
      const newReminder: Reminder = {
        id: Date.now().toString(),
        loanId: newLoanWithId.id,
        date: newLoanWithId.nextPaymentDate,
        amount: newLoanWithId.paymentAmount || 0,
        isPaid: false
      };
      
      setReminders([...reminders, newReminder]);
      toast.success('Loan added successfully');
    }
    
    setNewLoan({
      name: '',
      amount: 0,
      remainingAmount: 0,
      interestRate: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      paymentAmount: 0,
      paymentFrequency: 'monthly',
      type: 'personal'
    });
    
    setEditingLoanId(null);
    setIsDialogOpen(false);
  };

  const handlePayReminder = (reminderId: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, isPaid: true } 
        : reminder
    ));
    
    toast.success('Payment marked as paid');
  };

  const getLoanById = (loanId: string) => {
    return loans.find(loan => loan.id === loanId);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mortgage':
        return <Wallet className="h-4 w-4" />;
      case 'auto':
        return <Wallet className="h-4 w-4" />;
      case 'personal':
        return <Wallet className="h-4 w-4" />;
      case 'student':
        return <Wallet className="h-4 w-4" />;
      default:
        return <Wallet className="h-4 w-4" />;
    }
  };

  const calculateProgress = (loan: Loan) => {
    const paid = loan.amount - loan.remainingAmount;
    return (paid / loan.amount) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isUpcoming = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  const isDue = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date.getTime() <= today.getTime();
  };

  const getPaymentStatusBadge = (date: string, isPaid: boolean) => {
    if (isPaid) {
      return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">Paid</Badge>;
    }
    if (isDue(date)) {
      return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">Due</Badge>;
    }
    if (isUpcoming(date)) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">Upcoming</Badge>;
    }
    return <Badge variant="outline">Scheduled</Badge>;
  };

  const upcomingReminders = reminders
    .filter(r => !r.isPaid && isUpcoming(r.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const overdueReminders = reminders
    .filter(r => !r.isPaid && isDue(r.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatter.format(calculateTotalDebt())}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across {loans.length} loans</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatter.format(calculateTotalMonthlyPayment())}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Due every month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overdueReminders.length + upcomingReminders.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {overdueReminders.length} overdue, {upcomingReminders.length} upcoming
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Loan Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Loan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingLoanId ? 'Edit Loan' : 'Add New Loan'}</DialogTitle>
              <DialogDescription>
                Enter the details of your loan to track payments and progress.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="loanName" className="text-right">
                  Name
                </Label>
                <Input
                  id="loanName"
                  placeholder="e.g., Home Mortgage"
                  className="col-span-3"
                  value={newLoan.name}
                  onChange={(e) => setNewLoan({ ...newLoan, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="loanType" className="text-right">
                  Type
                </Label>
                <Select
                  value={newLoan.type}
                  onValueChange={(value) => setNewLoan({ ...newLoan, type: value as any })}
                >
                  <SelectTrigger id="loanType" className="col-span-3">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                    <SelectItem value="auto">Auto Loan</SelectItem>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="student">Student Loan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="loanAmount" className="text-right">
                  Total Amount
                </Label>
                <div className="col-span-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="0.00"
                    value={newLoan.amount || ''}
                    onChange={(e) => {
                      const amount = parseFloat(e.target.value);
                      setNewLoan({ 
                        ...newLoan, 
                        amount,
                        remainingAmount: editingLoanId ? newLoan.remainingAmount : amount
                      });
                    }}
                  />
                </div>
              </div>
              
              {editingLoanId && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="remainingAmount" className="text-right">
                    Remaining
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input
                      id="remainingAmount"
                      type="number"
                      placeholder="0.00"
                      value={newLoan.remainingAmount || ''}
                      onChange={(e) => setNewLoan({ ...newLoan, remainingAmount: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="interestRate" className="text-right">
                  Interest Rate
                </Label>
                <div className="col-span-3 flex items-center">
                  <Percent className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newLoan.interestRate || ''}
                    onChange={(e) => setNewLoan({ ...newLoan, interestRate: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <div className="col-span-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    value={newLoan.startDate || ''}
                    onChange={(e) => setNewLoan({ ...newLoan, startDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <div className="col-span-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    value={newLoan.endDate || ''}
                    onChange={(e) => setNewLoan({ ...newLoan, endDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentAmount" className="text-right">
                  Payment
                </Label>
                <div className="col-span-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="paymentAmount"
                    type="number"
                    placeholder="0.00"
                    value={newLoan.paymentAmount || ''}
                    onChange={(e) => setNewLoan({ ...newLoan, paymentAmount: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentFrequency" className="text-right">
                  Frequency
                </Label>
                <Select
                  value={newLoan.paymentFrequency}
                  onValueChange={(value) => setNewLoan({ ...newLoan, paymentFrequency: value as any })}
                >
                  <SelectTrigger id="paymentFrequency" className="col-span-3">
                    <SelectValue placeholder="Select payment frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsDialogOpen(false);
                setEditingLoanId(null);
                setNewLoan({
                  name: '',
                  amount: 0,
                  remainingAmount: 0,
                  interestRate: 0,
                  startDate: new Date().toISOString().split('T')[0],
                  endDate: '',
                  paymentAmount: 0,
                  paymentFrequency: 'monthly',
                  type: 'personal'
                });
              }}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddOrUpdateLoan}>
                {editingLoanId ? 'Update Loan' : 'Add Loan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="loans" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="loans">Active Loans</TabsTrigger>
          <TabsTrigger value="payments">Upcoming Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="loans" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {loans.length === 0 ? (
              <Card className="col-span-full p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No loans yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add your first loan to start tracking your payments and progress.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Loan
                      </Button>
                    </DialogTrigger>
                    {/* Dialog content is the same as above */}
                  </Dialog>
                </div>
              </Card>
            ) : (
              loans.map((loan) => (
                <Card key={loan.id} className="overflow-hidden hover-scale">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="mb-1">{loan.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          {getTypeIcon(loan.type)}
                          <span className="capitalize">{loan.type} Loan</span>
                          <span className="mx-1">•</span>
                          <span>{loan.interestRate}% APR</span>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditLoan(loan)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteLoan(loan.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Remaining Balance</p>
                        <p className="text-lg font-semibold">{formatter.format(loan.remainingAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                        <p className="text-lg font-semibold">{formatter.format(loan.paymentAmount)}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{Math.round(calculateProgress(loan))}%</span>
                      </div>
                      <Progress value={calculateProgress(loan)} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Start Date:</span>
                        <span>{formatDate(loan.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">End Date:</span>
                        <span>{formatDate(loan.endDate)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/30 border-t border-border px-6 py-3">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-1.5">
                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Next payment:</span>
                        <span className="text-sm font-medium">{formatDate(loan.nextPaymentDate)}</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {loan.paymentFrequency.charAt(0).toUpperCase() + loan.paymentFrequency.slice(1)}
                      </Badge>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="payments" className="mt-0">
          <div className="space-y-6">
            {overdueReminders.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-medium">Overdue Payments</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {overdueReminders.map((reminder) => {
                    const loan = getLoanById(reminder.loanId);
                    if (!loan) return null;
                    
                    return (
                      <Card key={reminder.id} className="border-l-4 border-l-red-500">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-red-100">
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium">{loan.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Due on {formatDate(reminder.date)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-semibold">{formatter.format(reminder.amount)}</p>
                            <Button onClick={() => handlePayReminder(reminder.id)}>
                              Mark as Paid
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
            
            {upcomingReminders.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BellRing className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-medium">Upcoming Payments</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {upcomingReminders.map((reminder) => {
                    const loan = getLoanById(reminder.loanId);
                    if (!loan) return null;
                    
                    return (
                      <Card key={reminder.id} className="border-l-4 border-l-amber-500">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-amber-100">
                              <BellRing className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="font-medium">{loan.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Due on {formatDate(reminder.date)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-semibold">{formatter.format(reminder.amount)}</p>
                            <Button variant="outline" onClick={() => handlePayReminder(reminder.id)}>
                              Mark as Paid
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
            
            {overdueReminders.length === 0 && upcomingReminders.length === 0 && (
              <Card className="col-span-full p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <BellRing className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming payments</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! No payments are due or coming up soon.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoanTracker;
