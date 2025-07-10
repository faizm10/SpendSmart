import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, DollarSign, TrendingUp, Shield, Globe, BarChart3, CreditCard, PiggyBank, Receipt, Zap } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import HeaderAuth from "@/components/header-auth";

const features = [
  {
    icon: DollarSign,
    title: "Income Tracking",
    description: "Easily track all your income sources and categorize them for better financial planning."
  },
  {
    icon: Receipt,
    title: "Expense Management",
    description: "Monitor your spending habits with detailed expense tracking and categorization."
  },
  {
    icon: Globe,
    title: "Currency Exchange",
    description: "Track expenses in multiple currencies with real-time exchange rates."
  },
  {
    icon: BarChart3,
    title: "Financial Analytics",
    description: "Get insights into your spending patterns with beautiful charts and reports."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is encrypted and stored securely with bank-level security."
  },
  {
    icon: Zap,
    title: "Real-time Sync",
    description: "Access your financial data anywhere, anytime with cloud synchronization."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    content: "SpendSmart has completely transformed how I manage my finances. The currency exchange feature is a game-changer for my international clients.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
  },
  {
    name: "Michael Chen",
    role: "Small Business Owner",
    content: "The expense categorization and analytics help me understand where my money goes. It's like having a personal financial advisor.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
  },
  {
    name: "Emma Rodriguez",
    role: "Digital Nomad",
    content: "As someone who travels frequently, the multi-currency support is invaluable. I can track expenses in any currency seamlessly.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
  }
];

const stats = [
  { label: "Active Users", value: "50K+" },
  { label: "Countries Supported", value: "150+" },
  { label: "Currencies", value: "100+" },
  { label: "Data Security", value: "99.9%" }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SpendSmart</span>
          </div>
          <div className="flex items-center space-x-4">
            <HeaderAuth />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Now with Multi-Currency Support
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Master Your Finances with
            <span className="text-primary"> SpendSmart</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Track income, manage expenses, and handle currency exchanges all in one powerful platform. 
            Take control of your financial future with intelligent insights and beautiful analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">
                View Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Manage Your Money</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From tracking daily expenses to managing international transactions, 
              SpendSmart provides all the tools you need for comprehensive financial management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How SpendSmart Works</h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes with our simple three-step process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up & Connect</h3>
              <p className="text-muted-foreground">
                Create your account and connect your bank accounts or start manually tracking your finances.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Categorize</h3>
              <p className="text-muted-foreground">
                Add your income and expenses with automatic categorization and multi-currency support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze & Optimize</h3>
              <p className="text-muted-foreground">
                Get insights into your spending patterns and optimize your financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by Users Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              See what our users have to say about their SpendSmart experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their money smarter with SpendSmart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/sign-up">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">
                View Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">SpendSmart</span>
              </div>
              <p className="text-muted-foreground">
                Your personal finance companion for smarter money management.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/api">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SpendSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
