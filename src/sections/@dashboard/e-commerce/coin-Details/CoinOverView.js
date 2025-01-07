import React, { useEffect, useState } from 'react';
import { Button, Box, Stack, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getChartData } from 'src/redux/slices/product';
import ChartData from './ChartData';
import ChartDataMarketCap from './ChartDataMarketCap';

const GraphButtons = ['price', 'Market Cap'];
const TimeButtons = [
  { id: '1', value: '24h' },
  { id: '7', value: '7d' },
  { id: '30', value: '1m' },
];

export default function CoinOverView() {
  const theme = useTheme();
  const { chartData, error, isChartLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { name = '' } = useParams();
  const [dateRange, setDateRange] = useState('1');

  const [selectedGraph, setSelectedGraph] = useState('price');

  useEffect(() => {
    if (name) {
      dispatch(getChartData(name, dateRange));
    }
  }, [dispatch, name, dateRange]);

  return (
    <Box mt={2}>
      <ButtonTabs
        selectedGraph={selectedGraph}
        dateRange={dateRange}
        setDateRange={setDateRange}
        setSelectedGraph={setSelectedGraph}
      />
      {selectedGraph === 'price' ? (
        <ChartData dateRange={dateRange} chartData={chartData} />
      ) : (
        <ChartDataMarketCap dateRange={dateRange} chartData={chartData} />
      )}
    </Box>
  );
}

const ButtonTabs = ({ selectedGraph, dateRange, setDateRange, setSelectedGraph }) => {
  const theme = useTheme();

  const handleGraphChange = (graphType) => {
    if (selectedGraph !== graphType) {
      setSelectedGraph(graphType);
    }
  };

  const handleDateChange = (date) => {
    if (dateRange !== date) {
      setDateRange(date);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <Stack direction="row" spacing={1} sx={{ bgcolor: theme.palette.grey[200], borderRadius: '10px', p: 0.5 }}>
        {GraphButtons.map((item) => (
          <Button
            key={item}
            color="info"
            variant={item === selectedGraph ? 'contained' : 'text'}
            sx={{
              fontSize: '12px',
              whiteSpace: 'nowrap',
            }}
            onClick={() => handleGraphChange(item)}
          >
            {item}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" spacing={1} sx={{ bgcolor: theme.palette.grey[200], borderRadius: '10px', p: 0.5 }}>
        {TimeButtons.map((item) => (
          <Button
            key={item.id}
            color="info"
            variant={item.id === dateRange ? 'contained' : 'text'}
            sx={{ fontSize: '12px' }}
            onClick={() => handleDateChange(item.id)}
          >
            {item.value}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
