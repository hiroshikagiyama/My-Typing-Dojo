import React from 'react';
import { Text } from '@chakra-ui/react';

export const MiddleText = ({ children }) => {
  return (
    <Text textStyle="2xl" fontWeight="medium" mb="5">
      {children}
    </Text>
  );
};
