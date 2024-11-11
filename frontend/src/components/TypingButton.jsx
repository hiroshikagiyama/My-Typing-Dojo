import React from 'react';
import { Button } from '@chakra-ui/react';

export const TypingButton = ({ children, clickFunc }) => {
  return (
    <Button
      textStyle="md"
      variant="subtle"
      px="8"
      mx="4"
      mt="20"
      onClick={clickFunc}
    >
      {children}
    </Button>
  );
};
