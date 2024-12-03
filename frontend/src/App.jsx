import { Route, Routes } from 'react-router-dom';
import './App.css';
import Typing from './pages/Typing.jsx';
import Login from './pages/Login.jsx';
import Notfound from './pages/Notfound.jsx';
import ProtectedRoute from './auths/ProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/typing"
        element={
          <ProtectedRoute>
            <Typing />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
