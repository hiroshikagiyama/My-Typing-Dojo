import './App.css';
import Home from './Home.jsx';
import { useEffect, useState } from 'react';
import Typing from './Typing.jsx';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://my-typing-dojo.onrender.com/'
    : 'http://localhost:3000/';

function App() {
  const [userData, setUserData] = useState('');
  const [sentenceData, setSentenceData] = useState([]);

  useEffect(() => {
    let ignore = false;

    (async () => {
      let response = await fetch(`${url}api/sentence`);
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
        <Typing sentenceData={sentenceData} userData={userData} />
      ) : (
        <Home setUserData={setUserData} />
      )}
    </>
  );
}

export default App;
