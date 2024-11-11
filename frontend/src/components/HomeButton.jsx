import React from 'react';
import { Button } from '@chakra-ui/react';

export const HomeButton = ({ children, handleFetch }) => {
  return (
    <Button mt="4" variant="subtle" px="8" mx="4" onClick={handleFetch}>
      {children}
    </Button>
  );
};
