import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import BrowseTasks from './pages/Tasks/Browse';
import TaskDetail from './pages/Tasks/TaskDetail';
import PostTask from './pages/Tasks/PostTask';
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import FreelancerDashboard from './pages/Dashboard/FreelancerDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Messaging from './pages/Messaging/Messaging';

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1F4E79] border-t-transparent"></div>
          <p className="font-medium text-gray-500">Loading StudentGig...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} /> {/* Using same for proto */}
          <Route path="/tasks" element={<BrowseTasks />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/post-task" element={<PostTask />} />
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/messages" element={<Messaging />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}
