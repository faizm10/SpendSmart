import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  "Expense Tracking",
  "Currency Conversion",
  "Real-Time Analytics",
  // "Secure Google Login",
  // "Type-safe with TypeScript",
  // "Built on Next.js 14",
  // "Database integration",
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                Take Control of Your Finances.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Track your expenses, manage your income, and convert currencies
                seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            {/* About Section */}
            <div className="mt-20">
              
            </div>
            {/* Features Grid */}
            <div className="mt-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start space-x-3 bg-card p-6 rounded-lg border border-border"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 SpendSmart. Made with ❤️ by Faiz Mustansar
          </p>
        </div>
      </footer>
    </div>
  );
}
