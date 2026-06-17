# Inventory & Sales Tracker

## Live Demo on Netlify

* **https://inventio-finance-dashboard.netlify.app/**


Inventory & Sales Tracker is a full-stack inventory management application built with React, TypeScript, Node.js, Express, PostgreSQL and Prisma. Users can securely manage products, record transactions and monitor business performance through an interactive dashboard.

## Key Features

* User authentication with JWT
* Product management (create and delete products)
* Duplicate product prevention
* Buy and sell transactions with automatic stock updates
* KPI dashboard (Income, Expenses, Stock Value, Profit)
* Responsive design for desktop and mobile devices
* User-specific data isolation
* Interactive charts powered by Recharts

## Tech Stack

* **Frontend:**
        React 18
        TypeScript
        React Router
        Tailwind CSS
        Recharts
        Sonner
        Context API
        Vite

* **Backend:**
        Node.js
        Express
        TypeScript
        Prisma ORM
        PostgreSQL
        JWT Authentication
        bcrypt

* **Database:**
        PostgreSQL

## Installation & Setup

1.  **Clone the repository:**

    git clone https://github.com/norbe98/smart-finance-dashboard.git

2.  **Install dependencies:**
        Frontend

        cd frontend
        npm install
        npm run dev

        Backend

        cd backend
        npm install
        npm run dev

## Environment Variables
        Backend (.env)

        DATABASE_URL=your_database_url
        JWT_SECRET=your_secret_key
        PORT=3000
        
        Frontend (.env)
        
        VITE_API_URL=http://localhost:3000

## 💡 Usage

1. **Add Products:** Start by adding your items in the "Inventory" section.
2. **Record Transactions:** Use the "Buy" or "Sell" buttons to update stock levels.
3. **Monitor Growth:** Check the Dashboard for real-time profit analysis and charts.

## 🧪 Testing

The project uses **Vitest** for unit testing critical utility functions (e.g., text formatting, input validation).

To run the tests:

npm test

