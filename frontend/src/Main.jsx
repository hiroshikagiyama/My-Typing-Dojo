import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './components/ui/provider';
import './index.css';
import App from './App.jsx';
import { ContextProvider } from './components/ContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Provider>
          <App />
        </Provider>
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
