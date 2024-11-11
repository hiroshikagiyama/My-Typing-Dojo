import React from 'react';
import { Button } from '@chakra-ui/react';

export const HomeButton = ({ children, handleFetch }) => {
  return (
    <Button
      textStyle="md"
      mt="4"
      variant="subtle"
      px="8"
      mx="4"
      onClick={handleFetch}
    >
      {children}
    </Button>
  );
};
