import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminCases from "./pages/admin/AdminCases";
import AdminCaseDetail from "./pages/admin/AdminCaseDetail";
import AnalystCases from "./pages/analyst/AnalystCases";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import UserAccounts from "./pages/UserAccounts";
import UserAccountDetail from "./pages/UserAccountDetails";
import CreateAnalyst from "./pages/admin/CreateAnalyst";
import AnalystCaseDetails from "./pages/analyst/AnalystCaseDetails";
import { Navigate } from "react-router-dom";
import AnalystLayout from "./layouts/AnalystLayout";

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
          path="/admin/create-analyst"
          element={
            <PrivateRoute allowedRole="admin">
              <CreateAnalyst />
            </PrivateRoute>
          }
        />


        <Route
          path="/admin/cases/:id"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminCaseDetail />
            </PrivateRoute>
          }
        />

        <Route path="/analyst" element={<AnalystLayout />}>

          <Route path="cases" element={<AnalystCases />} />

          <Route path="case/:id" element={<AnalystCaseDetails />} />

        </Route>

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