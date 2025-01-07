import { sentenceCase } from 'change-case';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import {} from '@mui/material/styles';
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCoin } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import CoinDetailComp from 'src/sections/@dashboard/e-commerce/CoinDetailComp';

// ----------------------------------------------------------------------

export default function CoinDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const { name = '' } = useParams();
  const { isLoading, reset } = useSelector((state) => state.product);

  useEffect(() => {
    if (name) {
      dispatch(getCoin(name));
    }
  }, [dispatch, name, reset]);

  return (
    <Page title="Crypto Currencies">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ mt: 15 }}>
        <HeaderBreadcrumbs
          links={[{ name: 'Cryptocurrencies', href: PATH_DASHBOARD.root }, { name: sentenceCase(name) }]}
        />

        {!isLoading ? (
          <>
            <CoinDetailComp />
          </>
        ) : (
          <SkeletonProduct />
        )}
      </Container>
    </Page>
  );
}
