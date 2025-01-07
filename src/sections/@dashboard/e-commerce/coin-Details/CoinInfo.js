import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonBase,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Label from 'src/components/Label';
import { useSelector } from 'react-redux';
import { extractDomainPart } from 'src/utils/formatNumber';
import Iconify from 'src/components/Iconify';
import MenuPopover from 'src/components/MenuPopover';

export default function CoinInfo() {
  const theme = useTheme();
  const { product } = useSelector((state) => state.product);

  return (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Info
      </Typography>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" color={theme.palette.grey[600]} fontWeight={500}>
            Website
          </Typography>
          <Stack direction="row" spacing={2}>
            <ButtonBase component="a" href={product?.links.homepage} target="_blank">
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                sx={{
                  bgcolor: theme.palette.grey[300],
                  color: 'black',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                {extractDomainPart(product?.links.homepage[0])}
              </Label>
            </ButtonBase>
            {product?.links.whitepaper !== '' && (
              <ButtonBase component="a" href={product?.links.whitepaper} target="_blank">
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  sx={{
                    bgcolor: theme.palette.grey[300],
                    color: 'black',
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  White Paper
                </Label>
              </ButtonBase>
            )}
          </Stack>
        </Stack>
        <Divider />
      </Stack>

      {product?.links.blockchain_site && (
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" color={theme.palette.grey[600]} fontWeight={500}>
              Explorers
            </Typography>
            <MoreMenuButton sites={product?.links.blockchain_site} />
          </Stack>
          <Divider />
        </Stack>
      )}
    </Stack>
  );
}

function MoreMenuButton(sites) {
  const [open, setOpen] = useState(null);
  const theme = useTheme();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ bgcolor: theme.palette.grey[300], borderRadius: '10px' }}>
        <Button size="small" onClick={handleOpen} sx={{ color: 'black', fontSize: 12 }}>
          {extractDomainPart(sites?.sites[0])}
        </Button>
        <IconButton size="small" onClick={handleOpen}>
          <Iconify icon={'ic:baseline-expand-more'} width={20} height={20} />
        </IconButton>
      </Stack>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {sites?.sites.slice(1).map((item, index) => {
          return (
            <MenuItem component="a" key={index} href={item}>
              {extractDomainPart(item)}
            </MenuItem>
          );
        })}
      </MenuPopover>
    </>
  );
}
