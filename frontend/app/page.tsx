import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Component } from "@/components/charts/linechart";
import { Component1 } from "@/components/charts/bargraph";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { features } from "@/lib/data";
const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20 text-center">
            <BlurFade delay={0.25 * 2} inView>
              <h1 className="text-2xl font-bold tracking-tight sm:text-6xl mb-6 text-wrap">
                Take Control of Your Finances.
              </h1>
            </BlurFade>
            <BlurFade delay={0.25 * 5} inView>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-wrap">
                Track your expenses, manage your income, and convert currencies
                seamlessly.
              </p>
            </BlurFade>

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

          {/* Charts Section */}
          <div className="mt-[190]">
            <h1 className=" text-center text-4xl font-bold tracking-tight sm:text-4xl mb-6">
              See Your Income and Expenses at a Glance
            </h1>
            <div className="grid lg:grid-cols-2 gap-4 my-5">
              <Component />
              <Component1 />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Year-to-Date Spending */}
              <Card>
                <CardHeader>
                  <CardTitle>Year-to-Date Spending</CardTitle>
                  <CardDescription>January - November 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-500">
                    $
                    <NumberTicker
                      value={25000}
                      className="text-3xl font-bold text-red-500 dark:text-red-500"
                    />
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    Trending down by 2% from last year{" "}
                    <TrendingDown className="ml-2 h-4 w-4" />
                  </p>
                </CardContent>
              </Card>

              {/* Top Expense Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Expense</CardTitle>
                  <CardDescription>November 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Rent</p>
                  <p className="text-sm text-muted-foreground">
                    Accounts for 30% of spending
                  </p>
                </CardContent>
              </Card>
              {/* Savings Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Savings</CardTitle>
                  <CardDescription>November 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-500">
                    $
                    <NumberTicker
                      value={1200}
                      className="text-3xl font-bold text-green-500 dark:text-green-500"
                    />
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    Trending up by 8% this month{" "}
                    <TrendingUp className="ml-2 h-4 w-4" />
                  </p>
                </CardContent>
              </Card>

              {/* Monthly Spending Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Spending Breakdown</CardTitle>
                  <CardDescription>Category-wise for November</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Food: $600</p>
                  <p className="text-sm text-muted-foreground">Rent: $1,200</p>
                  <p className="text-sm text-muted-foreground">
                    Entertainment: $300
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20" id="features">
            <h1 className=" text-center text-4xl font-bold tracking-tight sm:text-4xl mb-6">
              What SpendSmart Offers You
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature: any) => (
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
      </main>

      {/* Footer */}
      {/* <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 SpendSmart.
          </p>
        </div>
      </footer> */}
    </div>
  );
}

function ChartCard({
  children,
  title,
  description,
}: { children: ReactNode } & { title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
