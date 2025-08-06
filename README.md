# 🛒 Cartzy

**Cartzy** is a modern e-commerce platform with OAuth/OIDC authentication built with Next.js 15, TypeScript, and PostgreSQL.

## 🔐 Features

- **OAuth Authentication** - Google & GitHub sign-in with NextAuth.js v5
- **Database Sessions** - Secure 30-day sessions stored in PostgreSQL
- **Complete E-commerce Schema** - Products, Orders, Cart, Reviews, Users
- **Type-Safe ORM** - Prisma with full TypeScript support
- **Modern UI** - Tailwind CSS with responsive design
- **Production Ready** - Enterprise-grade authentication system

## 🧰 Tech Stack

| Layer         | Technology                    |
|--------------|-------------------------------|
| Frontend     | Next.js 15 (React framework)   |
| Styling      | Tailwind CSS                    |
| Auth         | NextAuth.js v5 (OAuth/OIDC)    |
| Backend API  | Next.js API routes             |
| ORM          | Prisma                         |
| Database     | PostgreSQL                     |
| Language     | TypeScript                     |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OAuth provider credentials (Google/GitHub)

### Installation

```bash
# Clone the repository
git clone https://github.com/Convert-ToInt32/Cartzy.git
cd Cartzy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and OAuth credentials

# Run database migration
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Database Schema

The application includes 11 tables:
- **Authentication**: User, Account, Session, VerificationToken
- **E-commerce**: Product, Category, CartItem, Order, OrderItem, Review

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cartzy_dev"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### OAuth Setup

1. **Google**: https://console.cloud.google.com/
2. **GitHub**: https://github.com/settings/developers

Set redirect URIs to: `http://localhost:3000/api/auth/callback/[provider]`

## 📝 License

This project is for portfolio demonstration purposes.
