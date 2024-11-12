import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { TypingButton } from './components/TypingButton.jsx';
import { SentenceBox } from './components/SentenceBox.jsx';
import { LargeText } from './components/LargeText.jsx';
import { MiddleText } from './components/MiddleText.jsx';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://my-typing-dojo.onrender.com/'
    : 'http://localhost:3000/';

const Typing = ({ sentenceData, userData }) => {
  const [count, setCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [isMatchArray, setIsMatchArray] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);

  // タイピング画面へ移動時にスタートボタンにフォーカスさせる
  const startFocus = useRef(null);
  useEffect(() => {
    startFocus.current.focus();
  }, []);

  function resetState() {
    setIsMatchArray([]);
    setPressedKeys([]);
    setStartTime(null);
    setWpm(0);
  }

  function handlePlayStart() {
    resetState();
    if (!isPlay) setIsPlay(true);
  }

  function handleNextClick() {
    resetState();
    if (!isPlay) setIsPlay(true);
    // countの上限制御
    if (sentenceData.length - 1 > count) {
      setCount((count) => count + 1);
    }
  }

  function handleBackClick() {
    resetState();
    if (!isPlay) setIsPlay(true);
    // countの下限制御
    if (1 <= count) {
      setCount((count) => count - 1);
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
      const wpm = calcTypingTime();
      addWpm(wpm);
    }
  }

  function calcTypingTime() {
    const typingSeconds = (Date.now() - startTime) / 1000;
    // WPMの計算方法：(文字数/5)*(60秒/入力にかかった秒数) 英単語の場合5文字で1単語として計算する
    const wpm = Math.round(
      (sentenceData[count].sentence.length / 5) * (60 / typingSeconds)
    );
    setWpm(wpm);
    return wpm;
  }

  async function addWpm(wpm) {
    const wpmData = {
      sentenceId: sentenceData[count].id,
      userId: userData.id,
      wpm: wpm,
      date: new Date().toLocaleDateString('sv-SE'), //スウェーデンの日付形式を利用 YYYY-MM-DD
    };
    await fetch(`${url}api/record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: wpmData,
      }),
    });
  }

  function checkSentence(newPressedKeys) {
    const splitExpectedSentence = sentenceData[count].sentence.split('');
    const isMatchResults = newPressedKeys.map(
      (newPressedKey, i) => newPressedKey === splitExpectedSentence[i]
    );
    setIsMatchArray(isMatchResults);
  }

  return (
    <Box
      onKeyDown={handleKeyDown}
      tabIndex="0"
      _focus={{ outline: 'none' }}
      ref={startFocus}
    >
      {wpm > 0 ? (
        <LargeText>{wpm} wpm</LargeText>
      ) : (
        <LargeText color={'#242424'}>#</LargeText>
      )}
      <MiddleText>{sentenceData[count].tag}</MiddleText>
      <Flex flexWrap="wrap" gap="1" width="800px">
        {sentenceData[count].sentence.split('').map((splitChar, i) => (
          <SentenceBox
            key={i}
            splitChar={splitChar}
            isMatchArray={isMatchArray}
            index={i}
          >
            {splitChar === ' ' ? '_' : splitChar}
          </SentenceBox>
        ))}
      </Flex>
      {count > 0 && (
        <TypingButton clickFunc={handleBackClick}>back</TypingButton>
      )}
      <TypingButton clickFunc={handlePlayStart}>start</TypingButton>
      {sentenceData.length - 1 > count && (
        <TypingButton clickFunc={handleNextClick}>next</TypingButton>
      )}
    </Box>
  );
};

export default Typing;
