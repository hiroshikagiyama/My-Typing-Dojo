import React, { useState } from 'react';

const Typing = ({ sentenceData }) => {
  const [count, setCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [isPlay, setIsPlay] = useState(false);

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

  function handlePressKey(e) {
    let newPressedKeys;
    if (e.key === 'Backspace') {
      const tempPressedKeys = [...pressedKeys];
      tempPressedKeys.pop();
      newPressedKeys = [...tempPressedKeys];
    } else {
      const pressedKey = e.key === 'Shift' ? ' ' : e.key;
      newPressedKeys = [...pressedKeys, pressedKey];
    }
    const joinNewPressKeys = newPressedKeys.join('');
    console.log(joinNewPressKeys);
    setPressedKeys(newPressedKeys);
  }

  return (
    <div onKeyDown={(e) => handlePressKey(e)} tabIndex="0">
      <div>Typing display!</div>
      <p>{sentenceData[count].sentence}</p>
      <button onClick={handlePlayStart}>start</button>
      <button onClick={handleNextClick}>next</button>
    </div>
  );
};

export default Typing;
