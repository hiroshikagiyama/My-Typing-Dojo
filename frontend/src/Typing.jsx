import React, { useState, useEffect } from 'react';

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
    e.preventDefault(); // space keyはこれがないと再レンダリングされて、背景色が消える
    console.log('e.key: ', e.key);
    if (e.key === 'Shift') return;
    let newPressedKeys;
    if (e.key === 'Backspace') {
      const tempPressedKeys = [...pressedKeys];
      tempPressedKeys.pop();
      newPressedKeys = [...tempPressedKeys];
    } else {
      newPressedKeys = [...pressedKeys, e.key];
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

  function createBackgroundColor(i) {
    let madeBackgroundColor;
    if (isMatchArray[i] === undefined) {
      madeBackgroundColor = '';
    } else if (isMatchArray[i]) {
      madeBackgroundColor = 'lightgreen';
    } else {
      madeBackgroundColor = 'lightgray';
    }
    return madeBackgroundColor;
  }
  console.log('===================================================');

  return (
    <div onKeyDown={(e) => handleKeyDown(e)} tabIndex="0">
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
              backgroundColor: createBackgroundColor(i),
              color: splitChar === ' ' && 'lightgray',
              width: '15px',
              borderRadius: '2px',
            }}
          >
            {splitChar === ' ' ? '_' : splitChar}
          </div>
        ))}
      </div>
      <button onClick={handlePlayStart}>start</button>
      <button onClick={handleNextClick}>next</button>
    </div>
  );
};

export default Typing;
