import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <App />
    </AuthProvider>
);
