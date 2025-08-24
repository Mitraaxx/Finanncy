# Finnancy: Personal Finance Tracker

\<div align="center"\>

# Finnancy

\<p\>
A powerful MERN-stack application for tracking personal income and expenses, helping users manage their financial health with an intuitive and responsive interface.
\</p\>

\<p\>
\<a href="[https://github.com/Mitraaxx/finnancy/stargazers](https://github.com/Mitraaxx/finnancy/stargazers)"\>\<img src="[https://img.shields.io/github/stars/Mitraaxx/finnancy?style=for-the-badge\&logo=github\&color=FFC107](https://img.shields.io/github/stars/Mitraaxx/finnancy?style=for-the-badge&logo=github&color=FFC107)" alt="Stars"\>\</a\>
\<a href="[https://github.com/Mitraaxx/finnancy/network/members](https://github.com/Mitraaxx/finnancy/network/members)"\>\<img src="[https://img.shields.io/github/forks/Mitraaxx/finnancy?style=for-the-badge\&logo=github\&color=8BC34A](https://img.shields.io/github/forks/Mitraaxx/finnancy?style=for-the-badge&logo=github&color=8BC34A)" alt="Forks"\>\</a\>
\<a href="[https://github.com/Mitraaxx/finnancy/issues](https://github.com/Mitraaxx/finnancy/issues)"\>\<img src="[https://img.shields.io/github/issues/Mitraaxx/finnancy?style=for-the-badge\&logo=github\&color=FF5722](https://img.shields.io/github/issues/Mitraaxx/finnancy?style=for-the-badge&logo=github&color=FF5722)" alt="Issues"\>\</a\>
\</p\>

\<p\>
\<a href="https://fiinance.netlify.app/"\>\<strong\>View Demo\</strong\>\</a\>
·
\<a href="[https://github.com/Mitraaxx/finnancy/issues](https://github.com/Mitraaxx/finnancy/issues)"\>Report Bug\</a\>
·
\<a href="[https://github.com/Mitraaxx/finnancy/issues](https://github.com/Mitraaxx/finnancy/issues)"\>Request Feature\</a\>
\</p\>
\</div\>

## Overview

**Finnancy** is a full-stack web application designed to provide a simple, secure, and efficient platform for personal finance management. Built with **MongoDB, Express.js, React, and Node.js (MERN)**, the application allows users to track their income and expenses, view their transaction history, and visualize their financial data through charts.

The application features a modern, intuitive UI where users can register, log in, and manage their financial transactions. It serves as a complete solution for anyone looking to take control of their personal finances.

-----

## Key Features

  - **Secure Authentication**: Robust user registration and login system using JWT (JSON Web Tokens).
  - **Transaction Management**: Users can easily add, view, and delete their income and expense records.
  - **Interactive Dashboard**: A central dashboard provides a clear overview of total income, expenses, and current balance.
  - **Data Visualization**: Financial data is represented in a clean line chart to show trends over time.
  - **Transaction History**: View a complete list of all past transactions, sorted by date.
  - **Data Export**: Users can download a detailed Excel report of their income and expenses.
  - **Responsive Design**: A clean, mobile-first interface built with Styled Components for a seamless experience on any device.
  - **Secure API**: Backend routes are protected, ensuring that users can only access their own financial data.

-----

## Tech Stack

### Frontend

  - **Library**: React.js
  - **Routing**: React Router
  - **Styling**: Styled Components
  - **State Management**: React Context API
  - **Charts**: Chart.js
  - **HTTP Client**: Axios

### Backend

  - **Runtime**: Node.js
  - **Framework**: Express.js
  - **Database**: MongoDB with Mongoose ODM
  - **Authentication**: JSON Web Tokens (JWT) & `bcrypt.js`
  - **File Generation**: ExcelJS for creating `.xlsx` reports

-----

## Project Structure

```
.
├── backend
│   ├── .env              # Environment variables
│   ├── package.json
│   ├── app.js            # Express app entry point
│   ├── db
│   │   └── db.js         # MongoDB connection setup
│   ├── middleware
│   │   └── auth.js       # JWT authentication middleware
│   ├── models
│   │   ├── UserModel.js    # User mongoose schema
│   │   ├── IncomeModels.js # Income mongoose schema
│   │   └── ExpenseModels.js# Expense mongoose schema
│   └── routes
│       └── transactions.js # API routes for all transactions
│
└── frontend
    ├── package.json
    ├── public
    │   ├── index.html
    │   └── ...
    └── src
        ├── App.js            # Main application component with routing
        ├── index.js          # React DOM entry point
        ├── Loading.js        # Loading spinner component
        ├── components
        │   ├── Auth            # Login and Register components
        │   ├── Button
        │   ├── Chart
        │   ├── Dashboard
        │   ├── Expenses
        │   ├── Form          # Reusable form component (used for Income)
        │   ├── History
        │   ├── Income
        │   ├── IncomeItems   # Component to display single transaction item
        │   ├── Navigation
        │   ├── Orb
        │   └── View          # Component for viewing all transactions
        ├── context
        │   └── GlobalContext.js  # Global state management
        ├── styles
        │   ├── GlobalStyle.js
        │   └── Layouts.js
        └── utils
            ├── dateFormat.js
            ├── Icons.js
            ├── menuItems.js
            └── useWindowSize.js
```

-----

## Data Flow

1.  **Authentication**: A new user registers or an existing user logs in. The backend validates the credentials, hashes the password using `bcrypt`, and returns a JWT.
2.  **Session Management**: The JWT is stored in the client's local storage and sent in the `Authorization` header with every subsequent API request to authenticate the user.
3.  **Transaction Management**: A logged-in user adds a new income or expense. The data, linked to their user ID, is sent via a protected API route and saved to the MongoDB database.
4.  **Data Fetching**: The frontend fetches the user's income and expense data from the backend. This data is then used to populate the dashboard, charts, and transaction lists.
5.  **Data Export**: A user requests to download their data. The backend fetches all their transactions, generates an Excel file using ExcelJS, and sends it back to the client for download.

-----

## Development Setup

### Prerequisites

  - Node.js and npm (or yarn/pnpm)
  - MongoDB instance (local or a cloud service like MongoDB Atlas)

<!-- end list -->

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Mitraaxx/finnancy.git
    cd finnancy
    ```
2.  **Setup Backend:**
    ```sh
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URL=<Your_MongoDB_Connection_String>
    JWT_SECRET=<Your_JWT_Secret_Key>
    ```
    Run the backend server:
    ```sh
    npm start
    ```
3.  **Setup Frontend:**
    ```sh
    cd ../frontend
    npm install
    ```
    The frontend is configured to make API requests to the backend server.
    Run the development server:
    ```sh
    npm start
    ```

<!-- end list -->

  - Frontend runs at: `http://localhost:3000`
  - Backend runs at: `http://localhost:5000`

-----

## Usage

1.  **Register/Login**: Open the application and create a new account or log in.
2.  **View Dashboard**: After logging in, you will be taken to the main dashboard with a summary of your finances and a chart.
3.  **Add Income/Expense**: Use the "Incomes" or "Expenses" tabs to add new transactions via the provided forms.
4.  **View Transactions**: Navigate to "View Transactions" to see a complete history of your financial activity.
5.  **Download Report**: From the dashboard, click the download button to get an Excel file of all your data.

-----

## Troubleshooting

  - **Failed to Fetch Data**: Ensure the backend server is running and the `MONGO_URL` in your `.env` file is correct. Check for any CORS errors in the browser console.
  - **Authentication Errors**: If login fails, double-check your credentials. If issues persist, ensure the `JWT_SECRET` is correctly set in the backend's `.env` file.
  - **Installation Errors**: If `npm install` fails, try deleting the `node_modules` directory and the `package-lock.json` file in both the `frontend` and `backend` directories, then run `npm install` again in each.

-----

## Future Scope

  - [ ] **Budgeting Feature**: Allow users to set monthly budgets for different categories and track their spending against them.
  - [ ] **Recurring Transactions**: Add functionality to schedule recurring income or expenses (e.g., monthly salary, subscriptions).
  - [ ] **Advanced Filtering**: Implement options to filter transactions by date range, category, or amount.
  - [ ] **Multiple Currencies**: Add support for different currencies.
  - [ ] **Data Import**: Allow users to import transaction data from CSV files.

-----

## Contributing

We welcome contributions to enhance this project\! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature/YourFeatureName`
3.  Make your changes and commit them: `git commit -m 'Add some amazing feature'`
4.  Push to the branch: `git push origin feature/YourFeatureName`
5.  Open a Pull Request.

-----

## Contact

For support or queries, please open an issue on the GitHub repository.