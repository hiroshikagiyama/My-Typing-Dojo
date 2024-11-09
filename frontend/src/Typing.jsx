import React, { useState } from 'react';

const Typing = ({ sentenceData }) => {
  const [count, setCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  function handlePlayStart() {
    if (!isPlay) setIsPlay(true);
  }

  function handleNextClick() {
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
      const pressedKey = e.key === 'Shift' ? '' : e.key;
      newPressedKeys = [...pressedKeys, pressedKey];
    }
    const joinNewPressKeys = newPressedKeys.join('');
    setPressedKeys(newPressedKeys);
  }

  return (
    <div onKeyDown={(e) => handleKeyDown(e)} tabIndex="0">
      <div>Typing display!</div>
      <p>{sentenceData[count].sentence}</p>
      <p>{pressedKeys.join('')}</p>
      <button onClick={handlePlayStart}>start</button>
      <button onClick={handleNextClick}>next</button>
    </div>
  );
};

export default Typing;
