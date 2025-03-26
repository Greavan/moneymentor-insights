
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Upload, BarChart3, PieChart, Wallet, LineChart, CreditCard, BellRing, Lightbulb } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-muted/40">
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter animate-fade-in">
                  Your Personal <span className="text-primary">AI-Powered</span> Financial Advisor
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                  MoneyMentor analyzes your finances, provides personalized insights, and helps you make smarter money decisions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <Button asChild size="lg" className="h-12 px-8">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-12 px-8">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="relative bg-white/80 backdrop-blur-sm border border-border rounded-2xl shadow-lg p-6 hover-scale transition-all duration-500">
                  <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    AI-Powered
                  </div>
                  <div className="mb-6">
                    <div className="w-full bg-muted h-8 rounded-lg mb-3"></div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-muted h-20 rounded-lg"></div>
                      <div className="bg-muted h-20 rounded-lg"></div>
                      <div className="bg-muted h-20 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-muted h-4 rounded-full w-full"></div>
                    <div className="bg-muted h-4 rounded-full w-4/5"></div>
                    <div className="bg-muted h-4 rounded-full w-3/5"></div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="bg-muted h-28 rounded-lg"></div>
                    <div className="bg-muted h-28 rounded-lg"></div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-muted rounded-full"></div>
                      <div className="w-8 h-8 bg-muted rounded-full"></div>
                      <div className="w-8 h-8 bg-muted rounded-full"></div>
                    </div>
                    <div className="w-24 h-8 bg-primary rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1/3 h-1/2 bg-primary/5 rounded-l-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-primary/5 rounded-tr-full blur-3xl"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                MoneyMentor combines AI technology with personal finance expertise to help you take control of your money.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm hover-scale">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Statement Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your bank statements (CSV or PDF) and let our AI analyze and categorize your transactions.
                </p>
                <Link to="/signup" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm hover-scale">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Spending Insights</h3>
                <p className="text-muted-foreground mb-4">
                  Visualize your spending patterns with interactive charts and identify areas for improvement.
                </p>
                <Link to="/signup" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm hover-scale">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
                <p className="text-muted-foreground mb-4">
                  Get personalized financial advice and actionable recommendations to improve your finances.
                </p>
                <Link to="/signup" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm hover-scale">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Investment Advisor</h3>
                <p className="text-muted-foreground mb-4">
                  Get tailored investment suggestions based on your risk tolerance and financial goals.
                </p>
                <Link to="/signup" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm hover-scale">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Loan & EMI Tracker</h3>
                <p className="text-muted-foreground mb-4">
                  Keep track of all your loans and EMIs in one place and never miss a payment.
                </p>
                <Link to="/signup" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm hover-scale">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BellRing className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Payment Reminders</h3>
                <p className="text-muted-foreground mb-4">
                  Set up alerts for upcoming bills and payments to avoid late fees and penalties.
                </p>
                <Link to="/signup" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get started with MoneyMentor in just a few simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
                <p className="text-muted-foreground">
                  Sign up for MoneyMentor in less than a minute with just your email and password.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Statements</h3>
                <p className="text-muted-foreground">
                  Upload your bank statements in CSV or PDF format for our AI to analyze.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Insights & Take Action</h3>
                <p className="text-muted-foreground">
                  Receive personalized insights and take action to improve your financial health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/5">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-sm border border-border rounded-2xl shadow-lg p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of users who are already using MoneyMentor to improve their financial health and make smarter money decisions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="h-12 px-8">
                      <Link to="/signup">Get Started - It's Free</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-12 px-8">
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-xl p-6 text-center hover-scale">
                    <div className="text-3xl font-bold mb-2 text-primary">85%</div>
                    <p className="text-sm text-muted-foreground">Users report better financial habits</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6 text-center hover-scale">
                    <div className="text-3xl font-bold mb-2 text-primary">$350</div>
                    <p className="text-sm text-muted-foreground">Average monthly savings discovered</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6 text-center hover-scale">
                    <div className="text-3xl font-bold mb-2 text-primary">15+</div>
                    <p className="text-sm text-muted-foreground">Personalized insights per month</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6 text-center hover-scale">
                    <div className="text-3xl font-bold mb-2 text-primary">100%</div>
                    <p className="text-sm text-muted-foreground">Secure and private data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
