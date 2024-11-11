import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

const Typing = ({ sentenceData, userData }) => {
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
    console.log(wpmData);
    const res = await fetch('http://localhost:3000/api/record', {
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

  function createBackgroundColor(i) {
    let madeBackgroundColor;
    if (isMatchArray[i] === undefined) {
      madeBackgroundColor = '';
    } else if (isMatchArray[i]) {
      madeBackgroundColor = '#38B2AC';
    } else {
      madeBackgroundColor = '#718096';
    }
    return madeBackgroundColor;
  }

  return (
    <Box onKeyDown={handleKeyDown} tabIndex="0" _focus={{ outline: 'none' }}>
      {wpm > 0 ? (
        <Text textStyle="4xl" fontWeight="medium" mb="5">
          {wpm} wpm
        </Text>
      ) : (
        <Text textStyle="4xl" fontWeight="medium" mb="5" color="#242424">
          #
        </Text>
      )}
      <Text textStyle="2xl" fontWeight="medium" mb="5">
        {sentenceData[count].tag}
      </Text>
      <Flex flexWrap="wrap" gap="1" width="800px">
        {sentenceData[count].sentence.split('').map((splitChar, i) => (
          <Box
            fontSize="2xl"
            height="40px"
            fontWeight="medium"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={createBackgroundColor(i)}
            width="20px"
            borderRadius="sm"
            key={i}
            style={{
              color: splitChar === ' ' && '#242424',
            }}
          >
            {splitChar === ' ' ? '_' : splitChar}
          </Box>
        ))}
      </Flex>
      {count > 0 && (
        <Button
          variant="subtle"
          px="8"
          mx="4"
          mt="20"
          onClick={handleBackClick}
        >
          back
        </Button>
      )}
      <Button
        variant="subtle"
        px="8"
        mx="4"
        mt="20"
        ref={startBtnFocus}
        onClick={handlePlayStart}
      >
        start
      </Button>
      {sentenceData.length - 1 > count && (
        <Button
          variant="subtle"
          px="8"
          mx="4"
          mt="20"
          onClick={handleNextClick}
        >
          next
        </Button>
      )}
    </Box>
  );
};

export default Typing;
