import React from 'react';
import { Box, Divider, Grid, Stack } from '@mui/material';
import { AboutCoin, CoinData, CoinHistoricalPrice, CoinInfo, CoinOverViewTabs } from './coin-Details';
import Markdown from 'src/components/Markdown';

export default function CoinDetailComp() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={4}>
          <Stack spacing={2}>
            <CoinData />
            <CoinInfo />
            <CoinHistoricalPrice />
          </Stack>
        </Grid>
        <Grid item xs={0} lg={0.5}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} lg={7.5}>
          <CoinOverViewTabs />

          <AboutCoin />
        </Grid>
      </Grid>
    </Box>
  );
}
