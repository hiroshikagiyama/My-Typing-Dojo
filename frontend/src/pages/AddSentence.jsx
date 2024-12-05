import React, { useContext, useState } from 'react';
import { TypingButton } from '../components/TypingButton.jsx';
import { HStack, Textarea, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { LoginUserContext } from '../components/ContextProvider.jsx';

const AddSentence = () => {
  const [inputSentence, setInputSentence] = useState('');
  const [inputTag, setInputTg] = useState('');
  const { loginUser } = useContext(LoginUserContext);
  const navigate = useNavigate();
  console.log('🚀🚀🚀🚀 loginUser--->> ', loginUser);
  const navigateTyping = () => {
    navigate('/typing');
  };

  const resistanceSentence = async () => {
    await fetch('/api/sentence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sentence: inputSentence,
        tag: inputTag,
        userId: loginUser.userId,
      }),
    });
    console.log('inputSentence: ', inputSentence);
  };

  return (
    <VStack>
      <Textarea
        width="480px"
        fontSize="30px"
        resize="none"
        onChange={(e) => setInputTg(e.target.value)}
        value={inputTag}
      />
      <Textarea
        size="xl"
        width="1080px"
        fontSize="30px"
        resize="none"
        placeholder="XLarge size"
        onChange={(e) => setInputSentence(e.target.value)}
        value={inputSentence}
      />
      <HStack>
        <TypingButton clickFunc={resistanceSentence}>add</TypingButton>
        <TypingButton clickFunc={navigateTyping}>back</TypingButton>
      </HStack>
    </VStack>
  );
};

export default AddSentence;
