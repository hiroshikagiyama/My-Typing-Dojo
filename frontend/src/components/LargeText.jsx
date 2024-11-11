import React from 'react';
import { Text } from '@chakra-ui/react';

export const LargeText = ({ children, color }) => {
  return (
    <Text textStyle="4xl" fontWeight="medium" mb="5" color={color}>
      {children}
    </Text>
  );
};
