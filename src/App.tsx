import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/Dashboard";
import EmployerDashboard from "./pages/employer/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: 'student' | 'employer' }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function DashboardRoute() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role === 'student') {
    return <Navigate to="/student/dashboard" replace />;
  } else {
    return <Navigate to="/employer/dashboard" replace />;
  }
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <DashboardRoute /> : <Home />} />
        <Route path="/login" element={user ? <DashboardRoute /> : <Login />} />
        <Route path="/register" element={user ? <DashboardRoute /> : <Register />} />
        <Route path="/dashboard" element={<DashboardRoute />} />
        
        {/* Student Routes */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Employer Routes */}
        <Route 
          path="/employer/dashboard" 
          element={
            <ProtectedRoute role="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
