
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialSummary } from '@/lib/deepseek';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowDown, ArrowUp, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SpendingInsightsProps {
  data: FinancialSummary | null;
}

const COLORS = ['#4C51BF', '#38B2AC', '#ED8936', '#9F7AEA', '#F56565', '#48BB78', '#4299E1', '#ECC94B', '#ED64A6', '#A0AEC0'];

const SpendingInsights: React.FC<SpendingInsightsProps> = ({ data }) => {
  const categoryData = useMemo(() => {
    if (!data) return [];
    return data.topExpenseCategories.map((category, index) => ({
      ...category,
      color: COLORS[index % COLORS.length],
    }));
  }, [data]);

  // Format currency as INR
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-white shadow-lg rounded-lg border border-border">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">{formatter.format(payload[0].value)}</p>
          <p className="text-xs text-muted-foreground">{payload[0].payload.percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  const monthlyTrend = [
    { name: 'Jan', amount: 40000 },
    { name: 'Feb', amount: 45000 },
    { name: 'Mar', amount: 42000 },
    { name: 'Apr', amount: 48000 },
    { name: 'May', amount: 44000 },
    { name: 'Jun', amount: 47000 },
    { name: 'Jul', amount: 43000 },
    { name: 'Aug', amount: 41000 },
    { name: 'Sep', amount: 46000 },
    { name: 'Oct', amount: 40000 },
    { name: 'Nov', amount: 43000 },
    { name: 'Dec', amount: data?.totalExpenses || 45000 },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
      <Card className="col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Spending Breakdown</CardTitle>
          <CardDescription>Your expense distribution by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="amount"
                  nameKey="category"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ paddingLeft: '20px' }}
                  formatter={(value, entry: any) => (
                    <span className="text-sm">{value} - {entry.payload.percentage}%</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Top Categories</CardTitle>
            <TooltipProvider>
              <TooltipUI>
                <TooltipTrigger>
                  <Info size={18} className="text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">Your highest spending categories for this period</p>
                </TooltipContent>
              </TooltipUI>
            </TooltipProvider>
          </div>
          <CardDescription>Where most of your money goes</CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <div className="space-y-4">
            {categoryData.slice(0, 5).map((category, index) => (
              <div key={index} className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-2 h-12 rounded-full mr-4" style={{ backgroundColor: category.color }}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium truncate">{category.category}</p>
                    <Badge variant="outline">{category.percentage}%</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Monthly Spending Trend</CardTitle>
          <CardDescription>How your expenses evolved over the year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyTrend}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `₹${(value/1000)}k`} 
                  width={80}
                />
                <Tooltip 
                  formatter={(value) => [`${formatter.format(value as number)}`, 'Spending']} 
                  labelFormatter={(label) => `${label} 2023`}
                />
                <Bar 
                  dataKey="amount" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {data && (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Financial Insights</CardTitle>
            <CardDescription>DeepSeek AI-generated suggestions to improve your finances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {data.insights.map((insight, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg bg-muted/40 border border-border flex flex-col overflow-hidden hover-scale"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {insight.impact === 'positive' && (
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {insight.impact === 'negative' && (
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    {insight.impact === 'neutral' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Info className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    <h3 className="font-medium">{insight.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground flex-1">{insight.description}</p>
                  {insight.actionable && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Badge variant="outline" className="bg-background">Suggestion</Badge>
                      <p className="text-xs mt-1 text-foreground">{insight.action}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpendingInsights;
