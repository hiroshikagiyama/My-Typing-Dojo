import './App.css';
import { useState } from 'react';

function App() {
  const [userData, setUserData] = useState('');
  const [inputName, setInputName] = useState('');

  async function handleFetch() {
    let response = await fetch(`http://localhost:3000/api/users/${inputName}`);
    response = await response.json();
    setUserData(response.data);
  }

  return (
    <>
      <h1>My Typing Dojo</h1>
      <input onChange={(e) => setInputName(e.target.value)} value={inputName} />
      <br />
      <button onClick={handleFetch}>fetch</button>
      <p>{userData.name}</p>
    </>
  );
}

export default App;
