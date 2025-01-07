import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fCurrency } from 'src/utils/formatNumber';

export default function ChartData({ dateRange, chartData }) {
  const [state, setState] = React.useState({
    series: [
      {
        name: 'Price',
        data: chartData?.prices.map((item) => item[1]), // Assuming price is at index 1
      },
    ],
    options: {
      chart: {
        height: 500,
        type: 'area',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>';
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        type: 'datetime',
        categories: chartData?.prices.map((item) => item[0]),
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            if (dateRange == '1') {
              return `${date.getHours()}:${date.getMinutes()}`;
            } else {
              return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`;
            }
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: [
          {
            formatter: function (val) {
              return `${fCurrency(val.toFixed(2))}`;
            },
          },
          {
            formatter: function (val) {
              return `${val} Volume`;
            },
          },
        ],
      },
      yaxis: {
        opposite: true,
        labels: {
          formatter: function (value) {
            return (value / 1000).toFixed(0) + 'k';
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#f4d4b1'],
          inverseColors: false,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 100],
        },
      },
      colors: ['#a18552'],
      grid: {
        borderColor: '#f1f1f1',
      },
    },
  });

  useEffect(() => {
    if (chartData) {
      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: 'Price',
            data: chartData?.prices.map((item) => item[1]),
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            categories: chartData?.prices.map((item) => item[0]),
          },
        },
      }));
    }
  }, [chartData, dateRange]);

  return (
    <Box>
      <ReactApexChart options={state.options} series={state.series} type="area" height={500} width={800} />
    </Box>
  );
}
