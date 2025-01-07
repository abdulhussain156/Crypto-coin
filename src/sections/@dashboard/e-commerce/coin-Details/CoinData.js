import { Box, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import Label from 'src/components/Label';
import { fCurrency, fNumber } from 'src/utils/formatNumber';

export default function CoinData() {
  const theme = useTheme();
  const { product } = useSelector((state) => state.product);
  let dataArray = product && [
    { name: 'Market Cap', value: product?.market_data.market_cap.usd },
    { name: 'Fully Diluted Valuation', value: product?.market_data.fully_diluted_valuation.usd },
    { name: '24 Hour Trading Vol ', value: product?.market_data.total_volume.usd },
    { name: 'Circulating Supply', value: product?.market_data.circulating_supply },
    { name: 'Total Supply', value: product?.market_data.total_supply },
    { name: 'Max Supply', value: product?.market_data.max_supply },
  ];

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Image disabledEffect alt="name" src={product?.image.small} sx={{ borderRadius: 1.5, width: 30, height: 30 }} />
        <Typography variant="h6">Bitcoin</Typography>
        <Typography variant="body1" sx={{ color: theme.palette.grey[600] }}>
          {product?.symbol.toUpperCase()}
        </Typography>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          sx={{ textTransform: 'uppercase', bgcolor: theme.palette.grey[300] }}
        >
          #{product?.market_cap_rank}
        </Label>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="h3">{fCurrency(product?.market_data.current_price.usd)}</Typography>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <Iconify icon={'icon-park-solid:up-one'} color={theme.palette.success.dark} width={30} height={30} />

          <Typography variant="subtitle1" color="success.dark">
            0.3%
          </Typography>
        </Stack>
      </Stack>

      {dataArray?.map((item, index) => {
        return (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle1" color={theme.palette.grey[600]} fontWeight={500}>
                  {item.name}
                </Typography>
                <IconButton>
                  <Iconify
                    icon={'material-symbols:info-outline-rounded'}
                    color={theme.palette.grey[600]}
                    width={20}
                    height={20}
                  />
                </IconButton>
              </Stack>
              <Typography variant="subtitle1">
                {index === 4 || index === 5 ? fNumber(item.value) : fCurrency(item.value)}
              </Typography>
            </Stack>
            <Divider />
          </>
        );
      })}
    </Stack>
  );
}
