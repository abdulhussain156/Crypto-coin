import React from 'react';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { fCurrency } from 'src/utils/formatNumber';

export default function CoinHistoricalPrice() {
  const theme = useTheme();
  const { product } = useSelector((state) => state.product);
  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        BTC Historical Price
      </Typography>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" color={theme.palette.grey[600]} fontWeight={500}>
            24h Range
          </Typography>

          <Typography variant="subtitle1">
            {fCurrency(product?.market_data.low_24h.usd) + ' - ' + fCurrency(product?.market_data.high_24h.usd)}
          </Typography>
        </Stack>
        <Divider />
      </Stack>
    </Stack>
  );
}
