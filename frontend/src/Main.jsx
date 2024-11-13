import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';
import './index.css';
import Login from './Login.jsx';
import { Center } from '@chakra-ui/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <Login />
      {/*<App />*/}
    </Provider>
  </StrictMode>
);
