import './App.css';
import Home from './Home.jsx';
import { useState } from 'react';
import Typing from './Typing.jsx';

function App() {
  const [userData, setUserData] = useState('');
  return <>{userData ? <Typing /> : <Home setUserData={setUserData} />}</>;
}

export default App;
