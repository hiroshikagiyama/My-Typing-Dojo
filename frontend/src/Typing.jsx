import React, { useEffect, useRef, useState } from 'react';

const Typing = ({ sentenceData }) => {
  const [count, setCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [isMatchArray, setIsMatchArray] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [typingTime, setTypingTime] = useState(0);
  // const typingPlayTime = { start: '', end: '' };

  // タイピング画面へ移動時にスタートボタンにフォーカスさせる
  const startBtnFocus = useRef(null);
  useEffect(() => {
    startBtnFocus.current.focus();
  }, []);

  function handlePlayStart() {
    setIsMatchArray([]);
    setPressedKeys([]);
    if (!isPlay) setIsPlay(true);
  }

  function handleNextClick() {
    setIsMatchArray([]);
    setPressedKeys([]);
    if (!isPlay) setIsPlay(true);
    // countの上限制御
    if (sentenceData.length - 1 > count) {
      setCount((count) => count + 1);
    }
  }

  function handleKeyDown(e) {
    e.preventDefault(); // space key は、再レンダリングされ背景色が消える
    if (e.key === 'Shift') return;
    let newPressedKeys;
    if (e.key === 'Backspace') {
      const tempPressedKeys = [...pressedKeys];
      tempPressedKeys.pop();
      newPressedKeys = [...tempPressedKeys];
    } else {
      newPressedKeys = [...pressedKeys, e.key];
    }
    if (newPressedKeys) {
      setPressedKeys(newPressedKeys);
      checkSentence(newPressedKeys);
    }
    setPlayTime(newPressedKeys);
  }

  function setPlayTime(newPressedKeys) {
    const isStart = pressedKeys.length === 0 && newPressedKeys.length === 1;
    const isEnd =
      newPressedKeys.length === sentenceData[count].sentence.length &&
      isMatchArray.every((value) => value === true);
    if (isStart) {
      setStartTime(Date.now());
    } else if (startTime && isEnd) {
      calcTypingTime();
    }
  }

  function calcTypingTime() {
    setTypingTime((Date.now() - startTime) / 1000);
  }
  console.log('typingTime: ', typingTime);

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

  return (
    <div onKeyDown={handleKeyDown} tabIndex="0">
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
              color: splitChar === ' ' && 'white',
              width: '15px',
              borderRadius: '2px',
            }}
          >
            {splitChar === ' ' ? '_' : splitChar}
          </div>
        ))}
      </div>
      <button ref={startBtnFocus} onClick={handlePlayStart}>
        start
      </button>
      <button onClick={handleNextClick}>next</button>
    </div>
  );
};

export default Typing;
