import React, { useEffect, useState } from 'react';

const Typing = ({ sentenceData }) => {
  const [count, setCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState([]);

  function handleNextClick() {
    // countの上限制御
    if (sentenceData.length - 1 > count) {
      setCount((count) => count + 1);
    }
  }

  function handlePressKey(e) {
    const newPressedKeys = [...pressedKeys, e.key];
    setPressedKeys(newPressedKeys);
  }
  console.log('pressedKeys: ', pressedKeys);

  return (
    <div onKeyDown={(e) => handlePressKey(e)} tabIndex="0">
      <div>Typing display!</div>
      <p>{sentenceData[count].sentence}</p>
      <button onClick={handleNextClick}>next</button>
    </div>
  );
};

export default Typing;
