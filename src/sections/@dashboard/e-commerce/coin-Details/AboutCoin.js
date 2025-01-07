import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Markdown from 'src/components/Markdown';

export default function AboutCoin() {
  const { product } = useSelector((state) => state.product);
  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        About Bitcoin
      </Typography>

      <Markdown children={product?.description.en} />
    </Box>
  );
}
