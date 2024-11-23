# Next.js Boilerplate

This is a boilerplate project built with [Next.js](https://nextjs.org), [Shadcn](https://ui.shadcn.com), [Prisma](https://www.prisma.io/), and [NextAuth](https://next-auth.js.org/) for authentication, including sign-in with Google.

## Features

- Ready-to-use authentication system with NextAuth
- Google sign-in integration
- Database integration with Prisma
- Modern UI components using Shadcn
- Fully responsive design

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or later)
- npm, yarn, or pnpm (package managers)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### Install Dependencies

Install the required dependencies using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Set Up Environment Variables

Create a `.env` file in the root of the project and fill in the required environment variables. You can use the provided `.env.example` as a template:

```
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
JWT_SECRET=
OPENAI_API_KEY=
OPENAI_ORGANIZATION_ID=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
```

### Migrate the Database

After setting up your database URL in the `.env` file, run the following command to migrate the database:

```bash
npx prisma migrate dev
```

### Run the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
