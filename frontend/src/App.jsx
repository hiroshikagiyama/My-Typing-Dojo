import './App.css';
import Home from './Home.jsx';
import { useEffect, useState } from 'react';
import Typing from './Typing.jsx';

function App() {
  const [userData, setUserData] = useState('');
  const [sentenceData, setSentenceData] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      let response = await fetch(`http://localhost:3000/api/sentence`);
      response = await response.json();
      if (!ignore) setSentenceData(response.data);
    })();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {userData.name ? (
        <Typing sentenceData={sentenceData} />
      ) : (
        <Home setUserData={setUserData} />
      )}
    </>
  );
}

export default App;
