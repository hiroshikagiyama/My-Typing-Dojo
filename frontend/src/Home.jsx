import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { HomeButton } from './components/HomeButton.jsx';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://my-typing-dojo.onrender.com/'
    : 'http://localhost:3000/';

const Home = ({ setUserData }) => {
  const [inputName, setInputName] = useState('');

  async function handleFetch() {
    let response = await fetch(`${url}api/users/${inputName}`);
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
      <Text textStyle="6xl">My Typing Dojo</Text>
      <Input
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="4"
        onKeyDown={handleEnterKeyDown}
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
      />
      <br />
      <HomeButton handleFetch={handleFetch}>Login</HomeButton>
    </>
  );
};

export default Home;
