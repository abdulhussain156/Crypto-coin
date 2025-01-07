import { capitalCase } from 'change-case';
// @mui
import { Tab, Box, Tabs } from '@mui/material';

// components
import useTabs from 'src/hooks/useTabs';
import Iconify from 'src/components/Iconify';
import useSettings from 'src/hooks/useSettings';
import CoinOverView from './CoinOverView';

// ----------------------------------------------------------------------

export default function CoinOverViewTabs() {
  const { currentTab, onChangeTab } = useTabs('overview');

  const OVERVIEW_TABS = [
    {
      value: 'overview',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <CoinOverView />,
    },
    {
      value: 'Markets',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
    },
    {
      value: 'News',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
    },
    {
      value: 'Similar Coins',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
    },
  ];

  return (
    <Box sx={{ ml: 3 }}>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
      >
        {OVERVIEW_TABS.map((tab) => (
          <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {OVERVIEW_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Box>
  );
}
