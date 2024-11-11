import React from 'react';
import { Box } from '@chakra-ui/react';

function createBackgroundColor(isMatchArray, i) {
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

export const SentenceBox = ({ children, isMatchArray, index, splitChar }) => {
  return (
    <Box
      fontSize="2xl"
      height="40px"
      fontWeight="medium"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={createBackgroundColor(isMatchArray, index)}
      width="20px"
      borderRadius="sm"
      style={{
        color: splitChar === ' ' && '#242424',
      }}
    >
      {children}
    </Box>
  );
};
