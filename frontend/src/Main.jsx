import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';
import './index.css';
import Login from './Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <Login />
      {/*<App />*/}
    </Provider>
  </StrictMode>
);
