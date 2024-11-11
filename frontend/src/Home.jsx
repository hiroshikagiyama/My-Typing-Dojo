import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

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
      <Button mt="4" onClick={handleFetch}>
        fetch
      </Button>
    </>
  );
};

export default Home;
