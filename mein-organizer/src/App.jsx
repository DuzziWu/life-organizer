import { useAuth, AuthProvider } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <AuthPage />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
