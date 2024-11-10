import React, { useState } from 'react';

const Typing = ({ sentenceData }) => {
  const [count, setCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [isMatchArray, setIsMatchArray] = useState([]);

  function handlePlayStart() {
    setIsMatchArray([]);
    if (!isPlay) setIsPlay(true);
  }

  function handleNextClick() {
    setIsMatchArray([]);
    if (!isPlay) setIsPlay(true);
    // countの上限制御
    if (sentenceData.length - 1 > count) {
      setCount((count) => count + 1);
    }
  }

  function handleKeyDown(e) {
    let newPressedKeys;
    if (e.key === 'Backspace') {
      const tempPressedKeys = [...pressedKeys];
      tempPressedKeys.pop();
      newPressedKeys = [...tempPressedKeys];
    } else {
      if (e.key !== 'Shift') {
        newPressedKeys = [...pressedKeys, e.key];
      }
    }
    console.log('newPressedKeys: ----->> ', newPressedKeys);
    if (newPressedKeys) {
      setPressedKeys(newPressedKeys);
      checkSentence(newPressedKeys);
    }
  }

  function checkSentence(newPressedKeys) {
    const splitExpectedSentence = sentenceData[count].sentence.split('');
    const isMatchResults = newPressedKeys.map(
      (newPressedKey, i) => newPressedKey === splitExpectedSentence[i]
    );
    setIsMatchArray(isMatchResults);
  }

  return (
    <div onKeyDown={(e) => handleKeyDown(e)} tabIndex="0">
      <div>Typing display!</div>
      <p>{sentenceData[count].sentence}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {sentenceData[count].sentence.split('').map((splitChar, i) => (
          <div
            key={i}
            style={{
              marginLeft: '1px',
              backgroundColor: pressedKeys.length > i && 'lightgray',
              color: splitChar === ' ' && 'lightgray',
              width: '15px',
              borderRadius: '2px',
            }}
          >
            {splitChar === ' ' ? '_' : splitChar}
          </div>
        ))}
      </div>
      <p>{pressedKeys.join('')}</p>
      <button onClick={handlePlayStart}>start</button>
      <button onClick={handleNextClick}>next</button>
    </div>
  );
};

export default Typing;
