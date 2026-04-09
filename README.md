# 🛡️ AML Detection & Case Management System (Full Stack)

A full-stack Anti-Money Laundering (AML) transaction monitoring system that detects suspicious financial activity using rule-based risk scoring, flags high-risk transactions, and provides a case management workflow for analysts and admins.

This project simulates a real-world financial intelligence platform used by banks and fintech companies.

---

# 🚀 Features

## 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control:

  * User
  * Analyst
  * Admin
* Secure protected routes
* Login / Register system

## 💳 Transaction Monitoring

* Transaction ingestion API
* Deposit / Withdrawal / Transfer support
* Real-time risk scoring
* Automatic flagging of suspicious transactions

## ⚠️ Risk Scoring Engine

Rule-based scoring based on:

* Large transaction amount
* Rapid transactions
* Suspicious transaction types
* High frequency activity
* Custom risk thresholds

Each transaction gets:

* Risk Score
* Flag status
* Priority level

## 📂 Case Management System

* Flagged transactions become cases
* Analysts can:

  * Review cases
  * Assign cases
  * Update status
  * Add notes
* Case lifecycle:

  * Pending
  * Under Review
  * Escalated
  * Closed

## 👨‍💼 Admin Dashboard

Admins can:

* Manage users
* Assign roles
* View all transactions
* Monitor flagged activity
* Manage analysts

## 📊 Dashboard

* Total transactions
* Flagged transactions
* Risk distribution
* Case statistics
* Analyst workload

---

# 🏗️ Tech Stack

## Frontend

* React
* Axios
* React Router
* Tailwind / CSS
* Context API / State Management

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Role Middleware

## Database

* MongoDB Atlas / Local MongoDB

## Optional (if using)

* Redis (for caching / queues)
* Docker
* AWS Deployment

---

# 📁 Project Structure

```
aml-project/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── App.js
│
├── docker-compose.yml
├── README.md
└── package.json
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/aml-project.git
cd aml-project
```

---

# 🔧 Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend

```bash
npm run dev
```

---

# 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

Backend runs on:

```
http://localhost:5000
```

---

# 🔄 API Endpoints

## Auth

```
POST /api/auth/register
POST /api/auth/login
```

## Transactions

```
POST /api/transactions
GET /api/transactions
GET /api/transactions/flagged
```

## Cases

```
GET /api/cases
PUT /api/cases/:id/assign
PUT /api/cases/:id/status
```

## Admin

```
GET /api/users
PUT /api/users/role
```

---

# 🧠 Risk Scoring Example

Transaction:

```
Amount: 12000
Type: Deposit
Frequency: High
```

Risk Calculation:

```
Large Amount → +40
Rapid Activity → +30
Suspicious Pattern → +20

Total Risk Score = 90
```

Transaction gets flagged automatically.

---

# 🔐 Roles

### User

* Create transactions
* View own transactions

### Analyst

* View flagged transactions
* Review cases
* Update status

### Admin

* Manage users
* Assign roles
* Monitor system
* View all data

---

# 🐳 Docker Setup (Optional)

```bash
docker-compose up --build
```

Runs:

* frontend
* backend
* mongodb
* redis (optional)

---

# ☁️ Deployment

Can be deployed on:

* AWS EC2
* Render
* Railway
* Vercel (frontend)
* Docker

---

# 🎯 Future Improvements

* ML-based anomaly detection
* Graph-based fraud detection
* Real-time alerts
* Email notifications
* Audit logs
* Transaction visualization
* Analyst workload balancing

---

# 👨‍💻 Author

Rishabh Tongia

---

# ⭐ Contribute

Pull requests are welcome. For major changes, please open an issue first.

---
