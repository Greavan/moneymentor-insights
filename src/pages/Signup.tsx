
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/context/AuthContext';

const Signup: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container relative flex-1 flex items-center justify-center h-full py-16 md:py-24">
          <div className="w-full mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  Create Your Account
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join thousands of users improving their financial health
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Secure Platform</h3>
                    <p className="text-sm text-muted-foreground">
                      Your financial data is always protected and private
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Smart Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered tools to categorize and analyze your spending
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Payment Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Never miss a bill or loan payment with smart alerts
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <SignupForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
