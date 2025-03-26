
// This is a mock implementation. In a real app, this would connect to the DeepSeek API.
// Users would need to provide their own DeepSeek API key.

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  actionable: boolean;
  action?: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
  topExpenseCategories: CategoryData[];
  transactions: Transaction[];
  insights: FinancialInsight[];
}

// Mock function to simulate analyzing a bank statement with DeepSeek API
export const analyzeStatement = async (file: File, apiKey?: string): Promise<FinancialSummary> => {
  // In a real implementation, this would:
  // 1. Upload the file (PDF/CSV) to a server or directly to DeepSeek
  // 2. Process the file using DeepSeek AI API
  // 3. Return structured data based on the analysis
  
  // For demo purposes, we'll simulate a processing delay and return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockFinancialData());
    }, 2000);
  });
};

// Mock investment analysis
export const getInvestmentRecommendations = async (
  riskTolerance: 'low' | 'medium' | 'high',
  investmentGoal: string,
  timeHorizon: string,
  apiKey?: string
): Promise<any> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        recommendations: [
          {
            name: "S&P 500 Index Fund",
            type: "Index Fund",
            riskLevel: "Medium",
            expectedReturn: "8-10% annually",
            description: "Broad market exposure to 500 leading U.S. companies",
            suitability: riskTolerance === 'low' ? "Medium" : "High"
          },
          {
            name: "Total Bond Market ETF",
            type: "Bond ETF",
            riskLevel: "Low",
            expectedReturn: "3-5% annually",
            description: "Exposure to the total U.S. investment-grade bond market",
            suitability: riskTolerance === 'low' ? "High" : "Medium"
          },
          {
            name: "Growth Stock Fund",
            type: "Mutual Fund",
            riskLevel: "High",
            expectedReturn: "10-12% annually",
            description: "Focuses on companies with above-average growth potential",
            suitability: riskTolerance === 'high' ? "High" : "Medium"
          },
          {
            name: "Global Real Estate ETF",
            type: "Sector ETF",
            riskLevel: "Medium-High",
            expectedReturn: "7-9% annually",
            description: "Invests in real estate companies worldwide, including REITs",
            suitability: riskTolerance === 'medium' ? "High" : "Medium"
          },
          {
            name: "Fixed Deposit",
            type: "Fixed Income",
            riskLevel: "Very Low",
            expectedReturn: "5-6% annually",
            description: "Safe investment with guaranteed returns",
            suitability: riskTolerance === 'low' ? "High" : "Low"
          }
        ],
        insights: [
          `Based on your ${riskTolerance} risk tolerance and ${timeHorizon} time horizon, a diversified portfolio is recommended.`,
          `For your goal of ${investmentGoal}, consider allocating more to growth assets if your time horizon is long.`,
          "Regular contributions, even small ones, can significantly boost your investment growth over time.",
          "Consider rebalancing your portfolio annually to maintain your target risk level."
        ]
      });
    }, 1500);
  });
};

// Mock data generator function
const getMockFinancialData = (): FinancialSummary => {
  const categories = [
    { name: 'Housing', color: '#4C51BF' },
    { name: 'Food', color: '#38B2AC' },
    { name: 'Transportation', color: '#ED8936' },
    { name: 'Entertainment', color: '#9F7AEA' },
    { name: 'Shopping', color: '#F56565' },
    { name: 'Utilities', color: '#48BB78' },
    { name: 'Healthcare', color: '#4299E1' },
    { name: 'Travel', color: '#ECC94B' },
    { name: 'Education', color: '#ED64A6' },
    { name: 'Miscellaneous', color: '#A0AEC0' }
  ];

  // Generate mock transactions
  const transactions: Transaction[] = [];
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // Income transactions
  transactions.push({
    id: '1',
    date: formatDate(new Date(today.getFullYear(), today.getMonth(), 5)),
    description: 'Salary',
    amount: 5000,
    category: 'Income',
    type: 'income'
  });
  
  transactions.push({
    id: '2',
    date: formatDate(new Date(today.getFullYear(), today.getMonth(), 20)),
    description: 'Freelance Payment',
    amount: 700,
    category: 'Income',
    type: 'income'
  });

  // Expense transactions (about 30 of them)
  for (let i = 0; i < 30; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)].name;
    const day = Math.floor(Math.random() * 28) + 1; // Random day of month
    const randomAmount = Math.floor(Math.random() * 200) + 10; // Amount between 10 and 210
    
    const descriptions: Record<string, string[]> = {
      'Housing': ['Rent Payment', 'Home Insurance', 'Property Tax', 'Mortgage Payment'],
      'Food': ['Grocery Store', 'Restaurant', 'Coffee Shop', 'Food Delivery'],
      'Transportation': ['Gas Station', 'Public Transit', 'Uber Ride', 'Car Maintenance'],
      'Entertainment': ['Movie Theater', 'Concert Tickets', 'Streaming Service', 'Gaming Subscription'],
      'Shopping': ['Department Store', 'Online Shopping', 'Electronics Store', 'Clothing Purchase'],
      'Utilities': ['Electric Bill', 'Water Bill', 'Internet Service', 'Phone Bill'],
      'Healthcare': ['Doctor Visit', 'Pharmacy', 'Health Insurance', 'Dental Appointment'],
      'Travel': ['Flight Tickets', 'Hotel Booking', 'Rental Car', 'Travel Insurance'],
      'Education': ['Tuition Payment', 'Books Purchase', 'Online Course', 'School Supplies'],
      'Miscellaneous': ['Gift Purchase', 'Donation', 'Subscription Service', 'Home Supplies']
    };
    
    const descriptions_for_category = descriptions[category] || ['Purchase'];
    const description = descriptions_for_category[Math.floor(Math.random() * descriptions_for_category.length)];
    
    transactions.push({
      id: `expense-${i + 3}`,
      date: formatDate(new Date(today.getFullYear(), today.getMonth(), day)),
      description,
      amount: randomAmount,
      category,
      type: 'expense'
    });
  }
  
  // Sort transactions by date
  transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Calculate totals and categories
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = Math.round((balance / totalIncome) * 100);
  
  // Group expenses by category
  const expensesByCategory: Record<string, { total: number, transactions: Transaction[] }> = {};
  transactions.filter(t => t.type === 'expense').forEach(transaction => {
    if (!expensesByCategory[transaction.category]) {
      expensesByCategory[transaction.category] = { total: 0, transactions: [] };
    }
    expensesByCategory[transaction.category].total += transaction.amount;
    expensesByCategory[transaction.category].transactions.push(transaction);
  });
  
  // Convert to array and sort by amount
  const topExpenseCategories: CategoryData[] = Object.entries(expensesByCategory)
    .map(([category, data]) => ({
      category,
      amount: data.total,
      percentage: Math.round((data.total / totalExpenses) * 100),
      transactions: data.transactions
    }))
    .sort((a, b) => b.amount - a.amount);
  
  // Generate insights
  const insights: FinancialInsight[] = [
    {
      id: '1',
      title: 'High Food Spending',
      description: 'Your food expenses are higher than average. Consider meal planning to reduce costs.',
      impact: 'negative',
      actionable: true,
      action: 'Create a weekly meal plan and grocery list'
    },
    {
      id: '2',
      title: 'Good Savings Rate',
      description: `Your current savings rate is ${savingsRate}%, which is above the recommended 20%.`,
      impact: 'positive',
      actionable: false
    },
    {
      id: '3',
      title: 'Subscription Audit',
      description: 'You have multiple subscription services. Review these to eliminate unused ones.',
      impact: 'neutral',
      actionable: true,
      action: 'Review and cancel unused subscriptions'
    },
    {
      id: '4',
      title: 'Transportation Costs',
      description: 'Consider carpooling or public transit to reduce your transportation expenses.',
      impact: 'neutral',
      actionable: true,
      action: 'Research public transportation options'
    },
    {
      id: '5',
      title: 'Emergency Fund',
      description: 'Based on your spending patterns, aim to save at least $15,000 for emergencies.',
      impact: 'neutral',
      actionable: true,
      action: 'Set up automatic transfers to emergency savings'
    }
  ];
  
  return {
    totalIncome,
    totalExpenses,
    balance,
    savingsRate,
    topExpenseCategories,
    transactions,
    insights
  };
};

// Helper function to format dates
const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};
