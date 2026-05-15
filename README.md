# Inventory & Sales Tracker

## Live Demo on Netlify

* **https://inventio-finance-dashboard.netlify.app/**


A modern, responsive React-based inventory management and sales tracking application. Built with TypeScript and Tailwind CSS, this tool allows users to track product stocks, manage transactions, and visualize financial performance through an intuitive dashboard.

## 🚀 Key Features

* **Dynamic Inventory Management:** Create and delete products with automatic duplicate checking.
* **Real-time Stock Control:** Dedicated "Buy" and "Sell" logic that updates inventory levels instantly.
* **Responsive KPI Dashboard:** Track Total Spent, Total Income, Stock Value, and Net Profit. Optimized for all screen sizes (including iPhone-specific layout fixes).
* **Data Visualization:** Interactive charts (Stock distribution, Income/Spent trends) powered by Recharts.
* **Data Persistence:** Your inventory and transactions are saved locally in the browser, ensuring data stays safe even after a page refresh.
* **Transaction Logging:** Detailed history of every stock movement with timestamps.

## 🛠️ Tech Stack

* **Frontend:** React 18 (TypeScript)
* **Routing:** React Router 6 (SPA navigation)
* **Styling:** Tailwind CSS (Mobile-first, responsive design)
* **Charts:** Recharts (Interactive data visualization)
* **Icons:** Lucide-react
* **Notifications:** Sonner (Toast alerts for transactions/inventory)
* **State Management:** React Context API + **LocalStorage persistence**
* **Testing:** Vitest + jsdom
* **Build Tool:** Vite

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/norbe98/smart-finance-dashboard.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

## 💡 Usage

1. **Add Products:** Start by adding your items in the "Inventory" section.
2. **Record Transactions:** Use the "Buy" or "Sell" buttons to update stock levels.
3. **Monitor Growth:** Check the Dashboard for real-time profit analysis and charts.

## 🧪 Testing

The project uses **Vitest** for unit testing critical utility functions (e.g., text formatting, input validation).

To run the tests:
```bash
npm test

