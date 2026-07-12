import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useState, createContext, useContext } from "react";
import Login from "./pages/Login";
import CashierDashboard from "./pages/CashierDashboard";
import CustomerRegistration from "./pages/CustomerRegistration";
import RFIDAssignment from "./pages/RFIDAssignment";
import LiveMonitoring from "./pages/LiveMonitoring";
import ZoneMonitoring from "./pages/ZoneMonitoring";
import PlaytimeTracking from "./pages/PlaytimeTracking";
import AccessValidation from "./pages/AccessValidation";
import EntryExitLogs from "./pages/EntryExitLogs";
import AdminDashboard from "./pages/AdminDashboard";
import PackageManagement from "./pages/PackageManagement";
import RFIDManagement from "./pages/RFIDManagement";
import CashierManagement from "./pages/CashierManagement";
import AnalyticsReports from "./pages/AnalyticsReports";
import Settings from "./pages/Settings";

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "cashier">("admin");
  const routerBasename =
    import.meta.env.BASE_URL === "/"
      ? undefined
      : import.meta.env.BASE_URL.replace(/\/$/, "");

  const logout = () => {
    setIsAuthenticated(false);
  };

  const handleLogin = (role: "admin" | "cashier") => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const defaultRoute = userRole === "cashier" ? "/cashier" : "/admin";

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      <BrowserRouter basename={routerBasename}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={defaultRoute} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={defaultRoute} replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* Cashier Routes */}
          <Route path="/cashier" element={<CashierDashboard />} />
          <Route path="/register" element={<CustomerRegistration />} />
          <Route path="/rfid-assignment" element={<RFIDAssignment />} />
          <Route path="/live-monitoring" element={<LiveMonitoring />} />
          <Route path="/zone-monitoring" element={<ZoneMonitoring />} />
          <Route path="/playtime" element={<PlaytimeTracking />} />
          <Route path="/access-validation" element={<AccessValidation />} />
          <Route path="/logs" element={<EntryExitLogs />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/packages" element={<PackageManagement />} />
          <Route path="/rfid-management" element={<RFIDManagement />} />
          <Route path="/cashier-management" element={<CashierManagement />} />
          <Route path="/analytics" element={<AnalyticsReports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
