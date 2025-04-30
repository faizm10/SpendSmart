
import { Home, DollarSign, User2, ChevronUp } from "lucide-react";
export const transactionType = [
  {
    value: "income",
    label: "income",
  },
  {
    value: "expense",
    label: "expense",
  },
]
export const sampledata1 = [
  { month: "January", income: 186, expense: 80 },
  { month: "February", income: 305, expense: 200 },
  { month: "March", income: 237, expense: 120 },
  { month: "April", income: 73, expense: 190 },
  { month: "May", income: 209, expense: 130 },
  { month: "June", income: 214, expense: 140 },
];

export const sampledata2 = [
  { category: "Food", amount: 600 },
  { category: "Rent", amount: 1200 },
  { category: "Utilities", amount: 300 },
  { category: "Entertainment", amount: 200 },
  { category: "Transportation", amount: 150 },
  { category: "Shopping", amount: 250 },
  { category: "Healthcare", amount: 400 },
];

export const sampledata3 = [
  { category: "Food", percentage: 35, fill: "var(--color-chrome)" },
  { category: "Rent", percentage: 30, fill: "var(--color-safari)" },
  { category: "Utilities", percentage: 10, fill: "var(--color-firefox)" },
  { category: "Transportation", percentage: 5, fill: "var(--color-edge)" },
  { category: "Other", percentage: 20, fill: "var(--color-other)" },
];

export const sampledata4 = [
  { month: "January", spending: 1800, savings: 3200 },
  { month: "February", spending: 1400, savings: 3700 },
  { month: "March", spending: 1200, savings: 4000 },
  { month: "April", spending: 1600, savings: 3400 },
  { month: "May", spending: 2000, savings: 3000 },
  { month: "June", spending: 1000, savings: 4100 },
  { month: "July", spending: 1700, savings: 3300 },
  { month: "August", spending: 1300, savings: 3700 },
  { month: "September", spending: 1900, savings: 2900 },
  { month: "October", spending: 1100, savings: 4200 },
  { month: "November", spending: 1500, savings: 3500 },
  { month: "December", spending: 1700, savings: 3000 },
];
export const transactions = [
  {
    id: "TXN001",
    description: "Freelance Payment",
    category: "Income",
    amount: 500.0,
    method: "Bank Transfer",
  },
  {
    id: "TXN002",
    description: "Grocery Shopping",
    category: "Expense",
    amount: 80.25,
    method: "Credit Card",
  },
  {
    id: "TXN003",
    description: "Electricity Bill",
    category: "Expense",
    amount: 120.0,
    method: "PayPal",
  },
  {
    id: "TXN004",
    description: "Stock Dividend",
    category: "Income",
    amount: 150.0,
    method: "Bank Transfer",
  },
  {
    id: "TXN005",
    description: "Online Course Refund",
    category: "Income",
    amount: 100.0,
    method: "PayPal",
  },
  {
    id: "TXN006",
    description: "Dining Out",
    category: "Expense",
    amount: 50.0,
    method: "Credit Card",
  },
];
export const features = [
  "Expense Tracking",
  "Currency Conversion",
  "Real-Time Analytics",
  "Budget Planning",
  "Customizable Categories",
  "Spending Alerts and Notifications",
];
// Menu items.
export const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: DollarSign,
  },
];
export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
];

export const reviews = [
  {
    name: "Hamza Memon",
    username: "@hamzam",
    body: "SpendSmart has completely changed how I manage my finances. The features are intuitive and super helpful!",
    img: "https://avatar.vercel.sh/hamzam",
  },
  {
    name: "Taha Mohyuddin",
    username: "@taham",
    body: "I love SpendSmart! It's simple to use, and the insights it provides into my spending habits are unmatched.",
    img: "https://avatar.vercel.sh/taham",
  },
  {
    name: "Sarah Ahmed",
    username: "@sarah",
    body: "SpendSmart makes tracking expenses fun and easy. I recommend it to everyone who wants to save money.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Fawaz Rizwan",
    username: "@fawaz",
    body: "With SpendSmart, I finally have control over my budget. The income and expense categorization is spot-on!",
    img: "https://avatar.vercel.sh/alik",
  },
  {
    name: "Ayesha Siddiqui",
    username: "@ayesha",
    body: "The best app I've used for financial management. The visual analytics make understanding my finances so simple.",
    img: "https://avatar.vercel.sh/ayesha",
  },
  {
    name: "Bilal Shaikh",
    username: "@bilals",
    body: "SpendSmart is like having a personal finance assistant. It's a game-changer for budgeting effectively.",
    img: "https://avatar.vercel.sh/bilals",
  },
  {
    name: "Zara Fatima",
    username: "@zaraf",
    body: "I'm amazed at how SpendSmart helps me identify areas where I can cut back on spending. Highly recommended!",
    img: "https://avatar.vercel.sh/zaraf",
  },
  {
    name: "Omar Farooq",
    username: "@omar",
    body: "As a student, SpendSmart is perfect for managing my limited budget and ensuring I don't overspend.",
    img: "https://avatar.vercel.sh/omar",
  },
  {
    name: "Nida Karim",
    username: "@nidakarim",
    body: "A must-have app for anyone serious about managing their money. The interface is clean and easy to navigate.",
    img: "https://avatar.vercel.sh/nida",
  },
  {
    name: "Ahmed Qureshi",
    username: "@ahmedq",
    body: "SpendSmart's insights have been eye-opening. I've saved so much money by using this app.",
    img: "https://avatar.vercel.sh/ahmedq",
  },
];

export const firstRow = reviews.slice(0, reviews.length / 2);
export const secondRow = reviews.slice(reviews.length / 2);
