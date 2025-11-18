# Evans Peptides - Next.js Application

A modern, full-stack e-commerce website for peptide research products built with Next.js 14, React 18, TypeScript, and PostgreSQL.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Visit http://localhost:3000

## 📋 Features

- 🔐 **User Authentication** - JWT-based auth with bcrypt password hashing
- 🛒 **Shopping Cart** - Full cart management with localStorage persistence
- 📦 **Order Management** - Complete order tracking and history
- 🔍 **Product Search** - Real-time product filtering
- 🎨 **Responsive Design** - Mobile-first, works on all devices
- ⚡ **Performance** - Server-side rendering and automatic code splitting
- 🛡️ **Type Safety** - Full TypeScript coverage
- 🔌 **WooCommerce Integration** - Syncs with WooCommerce products

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **External API**: WooCommerce REST API v3
- **Styling**: CSS (custom)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API routes (serverless functions)
│   │   ├── auth/         # Login, register, logout
│   │   ├── cart/         # Cart operations
│   │   ├── orders/       # Order management
│   │   ├── products/     # Product catalog
│   │   └── user/         # User profile
│   ├── (pages)/          # Page routes
│   │   ├── account/      # User account
│   │   ├── contact/      # Contact form
│   │   ├── faq/          # FAQ page
│   │   ├── login/        # Login page
│   │   ├── order/        # Product catalog
│   │   ├── register/     # Registration
│   │   └── ...
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/           # Reusable React components
│   ├── AgeGate.tsx
│   ├── Footer.tsx
│   ├── HeroCarousel.tsx
│   ├── Navbar.tsx
│   └── ResearchNotice.tsx
├── lib/                  # Utility functions
│   ├── auth.ts           # JWT utilities
│   ├── db.ts             # Database connection
│   └── woocommerce.ts    # WooCommerce API client
└── types/                # TypeScript type definitions
    ├── order.ts
    ├── product.ts
    └── user.ts
```

## 🔧 Environment Variables

Create a `.env.local` file:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/peptides_db

# JWT Secret (min 32 chars)
JWT_SECRET=your-secure-jwt-secret-here

# WooCommerce API
WOOCOMMERCE_URL=https://your-store.com
WOOCOMMERCE_CONSUMER_KEY=ck_xxxxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxx

# Environment
NODE_ENV=development
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER,
  product_name VARCHAR(255),
  quantity INTEGER,
  price DECIMAL(10, 2)
);
```

## 📡 API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products?search=query` - Get products from WooCommerce

### Cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart` - Remove cart item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get specific order

### User
- `GET /api/user` - Get current user profile

## 🎨 Pages

- `/` - Homepage with hero carousel and featured products
- `/order` - Full product catalog with search
- `/contact` - Contact form
- `/faq` - Frequently asked questions
- `/login` - User login
- `/register` - User registration
- `/account` - User account dashboard
- `/track-order` - Order tracking
- `/peptide-storage` - Peptide storage guidelines
- `/peptide-reconstruction` - Reconstitution instructions

## 🛠️ Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint code
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment
```bash
# Build
npm run build

# Start
npm start
```

Set environment variables in your hosting platform.

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt (10 rounds)
- HTTP-only cookies (recommended)
- Input validation on all forms
- SQL injection protection via parameterized queries
- XSS protection via React's built-in escaping

## 📝 License

Proprietary - Evans Peptides

## 🆘 Support

For issues or questions, contact: [your-email@example.com]

---

Built with ❤️ using Next.js
