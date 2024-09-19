import React, { useEffect, useState } from 'react';
import { Box, H1 } from '@adminjs/design-system';

interface userAmount {
  userAmount: number;
}
const UsersAmount: React.FC<userAmount> = ({ userAmount }) => {
  return (
    <Box>
      <H1 marginBottom="8px">{userAmount}</H1>
    </Box>
  );
};
export default UsersAmount;
