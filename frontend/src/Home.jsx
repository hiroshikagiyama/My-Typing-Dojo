import React, { useState } from 'react';

const Home = ({ setUserData }) => {
  const [inputName, setInputName] = useState('');

  async function handleFetch() {
    let response = await fetch(`http://localhost:3000/api/users/${inputName}`);
    response = await response.json();
    setUserData(response.data);
  }
  // 入力エリアでenter key を押してもボタンを押したようにするため
  function handleEnterKeyDown(e) {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    handleFetch(); // 警告は出るがそのままで良い
  }

  return (
    <>
      <h1>My Typing Dojo</h1>
      <input
        onKeyDown={handleEnterKeyDown}
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
      />
      <br />
      <button onClick={handleFetch}>fetch</button>
    </>
  );
};

export default Home;
