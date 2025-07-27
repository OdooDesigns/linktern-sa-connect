import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch, Redirect } from "wouter";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseJobs from "./pages/BrowseJobs";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentCompanies from "./pages/student/Companies";
import EmployerDashboard from "./pages/employer/Dashboard";
import EmployerProfile from "./pages/employer/Profile";
import EmployerBrowseTalents from "./pages/employer/BrowseTalents";
import PostJob from "./pages/employer/PostJob";
import CompanyDetails from "./pages/CompanyDetails";
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
    return <Redirect to="/login" />;
  }
  
  if (role && user.role !== role) {
    return <Redirect to="/dashboard" />;
  }
  
  return <>{children}</>;
}

function DashboardRoute() {
  const { user } = useAuth();
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  if (user.role === 'student') {
    return <Redirect to="/student/dashboard" />;
  } else {
    return <Redirect to="/employer/dashboard" />;
  }
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Switch>
        <Route path="/">
          {user ? <DashboardRoute /> : <Home />}
        </Route>
        <Route path="/login">
          {user ? <DashboardRoute /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <DashboardRoute /> : <Register />}
        </Route>
        <Route path="/dashboard">
          <DashboardRoute />
        </Route>
        <Route path="/browse-jobs">
          <BrowseJobs />
        </Route>
        <Route path="/company/:id">
          <CompanyDetails />
        </Route>
        
        {/* Student Routes */}
        {/* <Route path="/student/dashboard">
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/student/profile">
          <ProtectedRoute role="student">
            <StudentProfile />
          </ProtectedRoute>
        </Route>
        <Route path="/student/companies">
          <ProtectedRoute role="student">
            <StudentCompanies />
          </ProtectedRoute>
        </Route> */}
        
        {/* Employer Routes */}
        {/* <Route path="/employer/dashboard">
          <ProtectedRoute role="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/employer/profile">
          <ProtectedRoute role="employer">
            <EmployerProfile />
          </ProtectedRoute>
        </Route>
        <Route path="/employer/browse-talents">
          <ProtectedRoute role="employer">
            <EmployerBrowseTalents />
          </ProtectedRoute>
        </Route> */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/profile" 
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/companies" 
          element={
            <ProtectedRoute role="student">
              <StudentCompanies />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/browse" 
          element={
            <ProtectedRoute role="student">
              <BrowseJobs />
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
        <Route 
          path="/employer/post-job" 
          element={
            <ProtectedRoute role="employer">
              <PostJob />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer/profile" 
          element={
            <ProtectedRoute role="employer">
              <EmployerProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer/browse-talents" 
          element={
            <ProtectedRoute role="employer">
              <EmployerBrowseTalents />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
