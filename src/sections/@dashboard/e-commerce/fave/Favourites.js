import React from 'react';
import Image from 'src/components/Image';
import { Box, ButtonBase, Card, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { useDispatch } from 'react-redux';
import { removeFromFavouritesList } from 'src/redux/slices/product';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function Favourites({ item }) {
  const theme = useTheme();
  const { name, image, id } = item;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveFromFavourite = (e) => {
    e.stopPropagation();
    dispatch(removeFromFavouritesList(item));
  };

  const handleNavigation = (e) => {
    navigate(PATH_DASHBOARD.coins.view(id));
  };
  return (
    <ButtonBase onClick={(e) => handleNavigation()} sx={{ width: '100%' }}>
      <Card sx={{ p: 1, width: '100%' }}>
        <Box sx={{ position: 'absolute', right: 0, top: 0, zIndex: 100 }}>
          <IconButton onClick={(e) => handleRemoveFromFavourite(e)}>
            <Iconify icon={'system-uicons:cross'} color="black" width={20} height={20} />
          </IconButton>
        </Box>

        <Stack direction="row" alignItems="center" gap={1} sx={{ px: 3, py: 1 }}>
          <Image disabledEffect alt="btc" src={image} sx={{ borderRadius: 1.5, width: 30, height: 30 }} />

          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </Card>
    </ButtonBase>
  );
}
