# Kimia Farma

A Next.js web application for Kimia Farma with NextAuth authentication and SQLite database.

## Features

- ✅ **NextAuth Authentication** - Replaces Clerk
- ✅ **SQLite Database** - Replaces Neon database  
- ✅ **No Stripe Integration** - Payment processing removed
- ✅ **Dummy Users** - Pre-loaded test accounts
- ✅ **Ready to Use** - Complete working application

## Demo Accounts

The application comes with pre-loaded dummy users for testing:

- **Admin**: `admin@kimiafarma.com` / `admin123`
- **User**: `user@kimiafarma.com` / `user123`  
- **Doctor**: `doctor@kimiafarma.com` / `doctor123`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Sign in with one of the demo accounts above

## Environment Variables

The application uses the following environment variables (already configured in `.env.local`):

```env
NEXTAUTH_SECRET=kimiafarma-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

## Database

The application uses SQLite with a local `kimiafarma.db` file. The database is automatically initialized with the dummy users when the application starts.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v5
- **Database**: SQLite with better-sqlite3
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Screenshots

### Sign In Page
![Sign In](https://github.com/user-attachments/assets/8cf0b6f8-b67d-4d91-a04d-311ad0d9d4d0)

### Main Dashboard  
![Dashboard](https://github.com/user-attachments/assets/5bdaf51a-7ae1-4544-be6c-fc7862f29d70)

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```
