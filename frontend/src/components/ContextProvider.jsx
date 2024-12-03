import { useState, createContext } from 'react';

export const SentenceDataContext = createContext([]);
export const LoginUserContext = createContext('');

export function ContextProvider({ children }) {
  const [sentenceData, setSentenceData] = useState([]);
  const [loginUser, setLoginUser] = useState('');

  return (
    <SentenceDataContext.Provider value={{ sentenceData, setSentenceData }}>
      <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
        {children}
      </LoginUserContext.Provider>
    </SentenceDataContext.Provider>
  );
}
