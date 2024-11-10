import React, { useEffect, useRef, useState } from 'react';

const Typing = ({ sentenceData }) => {
  const [count, setCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [isMatchArray, setIsMatchArray] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);

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
    const typingSeconds = (Date.now() - startTime) / 1000;
    // WPMの計算方法：(文字数/5)*(60秒/入力にかかった秒数) 英単語の場合5文字で1単語として計算する
    setWpm(
      Math.round(
        (sentenceData[count].sentence.length / 5) * (60 / typingSeconds)
      )
    );
  }
  console.log('wpm: ', wpm);

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
      {wpm && <p>{wpm} wpm</p>}
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
