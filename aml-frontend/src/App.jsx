import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AnalystDashboard from "./pages/AnalystDashboard";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminCases from "./pages/adminCases";
import AdminCaseDetail from "./pages/AdminCaseDetail";
import AnalystCases from "./pages/AnalystCases";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import UserAccounts from "./pages/UserAccounts";
import UserAccountDetail from "./pages/UserAccountDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/"
          element={
            <Login />
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <ResetPassword />
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/analyst"
          element={
            <PrivateRoute allowedRole="analyst">
              <AnalystDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/user"
          element={
            <PrivateRoute allowedRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/cases"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminCases />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/cases/:id"
          element={
            <AdminCaseDetail />
          }
        />

        <Route
          path="/analyst/cases"
          element={
            <AnalystCases />
          }
        />

        <Route
          path="/user/accounts"
          element={
            <UserAccounts />
          }
        />

        <Route
          path="/user/accounts/:id"
          element={
            <UserAccountDetail />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;