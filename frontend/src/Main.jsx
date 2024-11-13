import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';
import './index.css';
import Login from './Login.jsx';
import App from './App.jsx';

const isDev = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>{isDev ? <Login /> : <App />}</Provider>
  </StrictMode>
);
