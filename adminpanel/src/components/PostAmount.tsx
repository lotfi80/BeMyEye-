import React, { useState, useEffect } from 'react';
import { Box, H1 } from '@adminjs/design-system';

interface postAmount {
  postAmount: number;
}
const PostAmount: React.FC<postAmount> = ({ postAmount }) => {
  return (
    <Box>
      <H1 marginBottom="8px">{postAmount}</H1>
    </Box>
  );
};
export default PostAmount;
