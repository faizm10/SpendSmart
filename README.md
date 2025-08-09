# 💰 SpendSmart – Quick Budget Calculator

SpendSmart is a **full-stack personal finance budgeting app** that lets users quickly calculate a monthly budget based on their hourly pay, work hours, tax preferences, and budget split presets.

The goal is to make budgeting **simple, visual, and interactive** — perfect for quick financial planning without complex spreadsheets.

---

## 🚀 Features

### Core
- **Hourly Pay & Hours/Week Input** – Users enter their hourly rate and weekly work hours.
- **Tax Mode Selection** – Choose between **Pre-Tax** (apply flat % deduction) or **Post-Tax** (skip tax calc).
- **Budget Split Presets** – One-click presets:
  - **50/30/20** (Needs/Wants/Savings)
  - **70/20/10**
  - **90/5/5**
  - Or create a **custom split** that sums to 100%.
- **Live Budget Calculation** – Calculates:
  - Gross Monthly Income
  - Estimated Monthly Tax
  - Net Monthly Income
  - Allocation amounts for each category
- **Visual Breakdown** – Pie chart (percentages) + bar chart (amounts).

### Nice-to-Have (Planned)
- Save multiple scenarios for comparison
- Custom category names
- Adjustable tax brackets per region
- Export breakdown to PDF or image

---

## 🛠 Tech Stack

### **Frontend**
- [React](https://reactjs.org/) – Component-based UI
- [Vite](https://vitejs.dev/) – Fast build tool
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) – Form validation
- [Recharts](https://recharts.org/) – Charts & data visualization
- [Axios](https://axios-http.com/) – HTTP client

### **Backend**
- [Java 21](https://openjdk.org/projects/jdk/21/) – Modern Java version
- [Spring Boot 3](https://spring.io/projects/spring-boot) – REST API framework
- Spring Web – HTTP endpoints
- Spring Validation – Input validation
- [JUnit 5](https://junit.org/junit5/) – Unit testing

### **Testing**
- **Frontend**: Vitest + React Testing Library (unit), Cypress (optional for e2e)
- **Backend**: JUnit 5, Spring Boot Test

---

## 🔄 How It Works

1. **User inputs:**
   - Hourly pay
   - Weekly work hours
   - Tax mode (pre-tax with % or post-tax)
   - Budget split (preset or custom)
2. **Backend calculation:**
   - Gross Monthly = hourly rate × hours/week × 52 ÷ 12
   - Estimated Tax = gross × tax% (if pre-tax)
   - Net Monthly = gross − tax
   - Allocations = net × category% (rounded to 2 decimals)
3. **Frontend display:**
   - Shows numbers in cards
   - Visualizes in pie & bar charts