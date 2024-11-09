import React, { useState } from 'react';

const Typing = ({ sentenceData }) => {
  const [count, setCount] = useState(0);

  function handleNextClick() {
    // countの上限制御
    if (sentenceData.length - 1 > count) {
      setCount((count) => count + 1);
    }
  }

  return (
    <>
      <div>Typing display!</div>
      <p>{sentenceData[count].sentence}</p>
      <button onClick={handleNextClick}>next</button>
    </>
  );
};

export default Typing;
