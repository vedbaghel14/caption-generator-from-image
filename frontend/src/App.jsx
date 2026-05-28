import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function AppContent() {
  const { user, logout } = useAuth();
  const [authMode, setAuthMode] = useState('login');

  if (!user) {
    return (
      <>
        {authMode === 'login' ? (
          <Login 
            onSuccess={() => {}}
            onSwitchToRegister={() => setAuthMode('register')}
          />
        ) : (
          <Register 
            onSuccess={() => setAuthMode('login')}
          />
        )}
      </>
    );
  }

  return (
    <Dashboard 
      onLogout={() => {
        logout();
        setAuthMode('login');
      }}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
