import { useState, createContext } from 'react';

export const SentenceDataContext = createContext([]);

export function ContextProvider({ children }) {
  const [sentenceData, setSentenceData] = useState([]);

  return (
    <SentenceDataContext.Provider value={{ sentenceData, setSentenceData }}>
      {children}
    </SentenceDataContext.Provider>
  );
}
