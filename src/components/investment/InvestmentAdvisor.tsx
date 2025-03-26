
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { getInvestmentRecommendations } from '@/lib/deepseek';
import { Calculator, ChevronDown, Globe, LineChart, Loader2, Percent, PiggyBank, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const InvestmentAdvisor: React.FC = () => {
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium');
  const [investmentGoal, setInvestmentGoal] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('5-10 years');
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [expectedReturn, setExpectedReturn] = useState('8');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  const handleGetRecommendations = async () => {
    if (!investmentGoal) {
      toast.error('Please enter your investment goal');
      return;
    }

    setIsLoading(true);
    try {
      const results = await getInvestmentRecommendations(
        riskTolerance, 
        investmentGoal,
        timeHorizon
      );
      setRecommendations(results);
      toast.success('Investment recommendations generated!');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast.error('Failed to generate recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateFutureValue = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(expectedReturn) || 0) / 100;
    const years = parseInt(timeHorizon.split('-')[0]) || 5;
    
    // Calculate future value of initial investment
    const futureValueInitial = initial * Math.pow(1 + rate, years);
    
    // Calculate future value of regular contributions
    const futureValueMonthly = monthly * 12 * ((Math.pow(1 + rate, years) - 1) / rate);
    
    return Math.round(futureValueInitial + futureValueMonthly);
  };

  const futureValue = calculateFutureValue();
  
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 animate-fade-in">
      <Card className="col-span-1 md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Investment Profile</CardTitle>
          <CardDescription>Define your investment strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="investmentGoal">Investment Goal</Label>
            <Input
              id="investmentGoal"
              placeholder="e.g., Retirement, Down Payment, Education"
              value={investmentGoal}
              onChange={(e) => setInvestmentGoal(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Risk Tolerance</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={riskTolerance === 'low' ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setRiskTolerance('low')}
              >
                Low
              </Button>
              <Button
                type="button"
                variant={riskTolerance === 'medium' ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setRiskTolerance('medium')}
              >
                Medium
              </Button>
              <Button
                type="button"
                variant={riskTolerance === 'high' ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setRiskTolerance('high')}
              >
                High
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeHorizon">Time Horizon</Label>
            <Select value={timeHorizon} onValueChange={setTimeHorizon}>
              <SelectTrigger id="timeHorizon">
                <SelectValue placeholder="Select time horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3 years">Short Term (1-3 years)</SelectItem>
                <SelectItem value="3-5 years">Medium Term (3-5 years)</SelectItem>
                <SelectItem value="5-10 years">Long Term (5-10 years)</SelectItem>
                <SelectItem value="10-20 years">Very Long Term (10-20 years)</SelectItem>
                <SelectItem value="20+ years">Retirement (20+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
            <Input
              id="initialInvestment"
              type="number"
              placeholder="0"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              placeholder="0"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
              <span className="text-sm">{expectedReturn}%</span>
            </div>
            <Slider
              id="expectedReturn"
              defaultValue={[8]}
              max={15}
              min={1}
              step={0.5}
              onValueChange={(value) => setExpectedReturn(value[0].toString())}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Conservative (1%)</span>
              <span>Aggressive (15%)</span>
            </div>
          </div>

          <Button 
            onClick={handleGetRecommendations} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Generating Recommendations...' : 'Get Recommendations'}
          </Button>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Investment Recommendations</CardTitle>
          <CardDescription>
            {recommendations 
              ? 'Personalized investment options based on your profile' 
              : 'Complete your profile to get personalized recommendations'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!recommendations ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-muted/50 p-6 flex flex-col items-center text-center hover-scale">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PiggyBank className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Regular Investing</h3>
                <p className="text-sm text-muted-foreground mb-5">Consistent contributions over time lead to significant growth through compound interest.</p>
                <div className="text-3xl font-bold">${futureValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Projected future value</p>
              </div>
              
              <div className="rounded-xl bg-muted/50 p-6 flex flex-col items-center text-center hover-scale">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Investment Types</h3>
                <p className="text-sm text-muted-foreground">The right mix of investments depends on your risk tolerance and timeline.</p>
                <div className="mt-4 grid grid-cols-3 gap-2 w-full">
                  <div className="rounded-lg bg-background p-2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium">Stocks</span>
                  </div>
                  <div className="rounded-lg bg-background p-2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-1">
                      <LineChart className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-xs font-medium">Bonds</span>
                  </div>
                  <div className="rounded-lg bg-background p-2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                      <Percent className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-xs font-medium">Funds</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="options" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="options">Investment Options</TabsTrigger>
                <TabsTrigger value="insights">Key Insights</TabsTrigger>
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
              </TabsList>
              
              <TabsContent value="options" className="mt-0">
                <div className="grid gap-4">
                  {recommendations.recommendations.map((rec: any, index: number) => (
                    <div 
                      key={index} 
                      className={`rounded-lg bg-muted/40 border border-border overflow-hidden transition-all duration-300 hover-scale
                        ${rec.suitability === 'High' ? 'border-l-4 border-l-primary' : ''}
                      `}
                    >
                      <div className="flex flex-col md:flex-row md:items-center p-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{rec.name}</h3>
                            {rec.suitability === 'High' && (
                              <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary font-medium">
                                Recommended
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                              {rec.type}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                              Risk: {rec.riskLevel}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                              Return: {rec.expectedReturn}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{rec.description}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                          <Button variant="outline" size="sm">
                            <Calculator className="w-4 h-4 mr-2" />
                            Calculate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="insights" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {recommendations.insights.map((insight: string, index: number) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                            <ChevronDown className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm">{insight}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="calculator" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                      <div>
                        <Label htmlFor="calcInitial">Initial Investment</Label>
                        <div className="flex items-center mt-1.5">
                          <span className="px-3 py-2 bg-muted text-muted-foreground text-sm rounded-l-md border border-r-0 border-input">$</span>
                          <Input
                            id="calcInitial"
                            type="number"
                            value={initialInvestment}
                            onChange={(e) => setInitialInvestment(e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="calcMonthly">Monthly Contribution</Label>
                        <div className="flex items-center mt-1.5">
                          <span className="px-3 py-2 bg-muted text-muted-foreground text-sm rounded-l-md border border-r-0 border-input">$</span>
                          <Input
                            id="calcMonthly"
                            type="number"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="calcReturn">Annual Return</Label>
                        <div className="flex items-center mt-1.5">
                          <Input
                            id="calcReturn"
                            type="number"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(e.target.value)}
                            className="rounded-r-none"
                          />
                          <span className="px-3 py-2 bg-muted text-muted-foreground text-sm rounded-r-md border border-l-0 border-input">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border flex flex-col items-center">
                      <h3 className="text-lg font-medium mb-1">Future Value</h3>
                      <div className="text-4xl font-bold text-primary mb-1">${futureValue.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">After {timeHorizon}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentAdvisor;
