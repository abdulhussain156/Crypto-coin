import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, Stack, IconButton, ButtonBase } from '@mui/material';
// utils

import { fCurrency } from '../../../../utils/formatNumber';
// components

import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
//
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { PATH_DASHBOARD } from 'src/routes/paths';
// ----------------------------------------------------------------------

function checkAndFormatChange(value) {
  // Check if the value is negative or positive
  const isNegative = value < 0;

  // Format the value to one decimal place
  const formattedValue = value?.toFixed(1);

  return {
    isNegative: isNegative,
    formattedValue: formattedValue,
  };
}

ProductTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ProductTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    market_cap_rank,
    name,
    id,
    image,
    current_price,
    symbol,
    market_cap,
    price_change_24h,
    market_cap_change_24h,
    price_change_percentage_24h,
    sparkline_in_7d,
    price_change_percentage_1h_in_currency,
  } = row;

  const result = checkAndFormatChange(price_change_percentage_24h);
  const result_1h = checkAndFormatChange(price_change_percentage_1h_in_currency);

  const handleNavigation = () => {
    navigate(PATH_DASHBOARD.coins.view(id));
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox" sx={{ alignItems: 'center' }}>
        <IconButton>
          <Iconify icon={'material-symbols-light:star-outline-rounded'} color="grey" width={30} height={30} />
        </IconButton>
      </TableCell>
      <TableCell align="right">{market_cap_rank}</TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonBase data-testid="navigate-button" onClick={handleNavigation}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Image disabledEffect alt={name} src={image} sx={{ borderRadius: 1.5, width: 30, height: 30 }} />

            <Typography variant="subtitle2" noWrap>
              {name}{' '}
              <Typography variant="body2" component="span" sx={{ color: theme.palette.grey[700] }}>
                {symbol.toUpperCase()}
              </Typography>
            </Typography>
          </Stack>
        </ButtonBase>
      </TableCell>
      <TableCell>
        <Typography variant="body2" align="right">
          {fCurrency(current_price)}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          {result_1h.isNegative ? (
            <Iconify icon={'icon-park-solid:down-one'} color={theme.palette.error.main} width={18} height={18} />
          ) : (
            <Iconify icon={'icon-park-solid:up-one'} color={theme.palette.success.dark} width={18} height={18} />
          )}
          <Typography variant="body" color={result_1h.isNegative ? 'error' : 'success.dark'}>
            {result_1h.formattedValue}%
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="right">
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          {result.isNegative ? (
            <Iconify icon={'icon-park-solid:down-one'} color={theme.palette.error.main} width={18} height={18} />
          ) : (
            <Iconify icon={'icon-park-solid:up-one'} color={theme.palette.success.dark} width={18} height={18} />
          )}
          <Typography variant="body" color={result.isNegative ? 'error' : 'success.dark'}>
            {result.formattedValue}%
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="right">{fCurrency(market_cap_change_24h)}</TableCell>
      <TableCell align="right">{fCurrency(market_cap)}</TableCell>

      <TableCell align="right">
        <IconButton onClick={handleNavigation}>
          <Iconify icon={'hugeicons:view'} color="grey" width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
