import { Box, Button, Center, Input, Text, VStack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SentenceDataContext } from '../components/ContextProvider.jsx';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginMode, setLoginMode] = useState('login');
  const [isInputError, setIsInputError] = useState(false);
  const navigate = useNavigate();
  const { setSentenceData } = useContext(SentenceDataContext);

  // ログイン画面 文字数下限値設定
  const isLoginButtonEnabled = username.length >= 4 && password.length >= 4;
  const isSignupButtonEnabled = isLoginButtonEnabled && email.length >= 4;

  // sing in or lon
  const handleSignupOrLoginClick = async (e) => {
    const selectUrl = e.target.textContent === '新規登録' ? 'signup' : 'login';
    console.log('🚀🚀🚀🚀 selectUrl--->> ', selectUrl);
    const loginUser = {
      username,
      password,
      email,
    };
    try {
      let response = await axios.post(`/api/${selectUrl}`, loginUser, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // クッキーを含める
      });
      console.log('server response: ', response.data);
      setIsInputError(false);
      navigate('/typing');
    } catch (err) {
      setIsInputError(true);
      console.log('server response: ', err.message);
    }
  };

  // タイピング用の文字列を取得
  useEffect(() => {
    let ignore = false;
    console.log('🚀🚀🚀🚀 useEffect--->> ');
    (async () => {
      let response = await fetch('/api/sentence');
      response = await response.json();
      if (!ignore) setSentenceData(response.data);
    })();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Center>
      <Box mt="4xl" w="md">
        <VStack>
          <Center>
            <Text fontSize="5xl" fontWeight="bold">
              my typing dojo
            </Text>
          </Center>
          <VStack>
            <Text>Name</Text>
            <Input
              type="text"
              placeholder="your name"
              // color="gray.700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            {loginMode === 'signup' && (
              <>
                <Text>E-Mail</Text>
                <Input
                  type="email"
                  placeholder="your e-mail"
                  // color="gray.700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </>
            )}
            <Text>Password</Text>
            <Input
              type="password"
              placeholder="your password"
              // color="gray.700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Center>
              <Text color="red.400" fontWeight="bold" height="24px">
                {isInputError && 'NameまたはPasswordが正しくありません'}
              </Text>
            </Center>
            {loginMode === 'signup' ? (
              <Button
                onClick={handleSignupOrLoginClick}
                disabled={!isSignupButtonEnabled}
              >
                新規登録
              </Button>
            ) : (
              <Button
                onClick={handleSignupOrLoginClick}
                disabled={!isLoginButtonEnabled}
              >
                ログイン
              </Button>
            )}
            <Center>
              {loginMode === 'login' ? (
                <Text
                  color="blue.700"
                  fontWeight="bold"
                  textDecoration="underline"
                  onClick={() => setLoginMode('signup')}
                >
                  初めての利用はこちら
                </Text>
              ) : (
                <Text
                  color="blue.700"
                  fontWeight="bold"
                  textDecoration="underline"
                  onClick={() => setLoginMode('login')}
                >
                  既に登録済みの方はこちら
                </Text>
              )}
            </Center>
            <Center>
              <Text fontSize="sm" color="gray.300">
                © 2024 kagi
              </Text>
            </Center>
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};
export default Login;
