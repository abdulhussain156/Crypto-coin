import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Tabs,
  Tab,
  Divider,
  Stack,
  Pagination,
  Grid,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator } from '../../hooks/useTable';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { TableNoData, TableSkeleton, TableSelectedActions, TableHeadCustom } from '../../components/table';
// sections
import { ProductTableRow, ProductTableToolbar } from '../../sections/@dashboard/e-commerce/product-list';
import useTabs from 'src/hooks/useTabs';
import Favourites from 'src/sections/@dashboard/e-commerce/fave/Favourites';

// ----------------------------------------------------------------------

const STATUS_MAPPING = {
  'Super Admin': 0,
  Admin: 1,
  User: 2,
  Pending: 3,
  Rejected: 4,
};

const TABLE_HEAD = [
  { id: 'Id', label: '#', align: 'center' },
  { id: 'Coins', label: 'Coins', align: 'left' },
  { id: 'Price', label: 'Price', align: 'right' },
  { id: '1h', label: '1h', align: 'right' },
  { id: '24h', label: '24h', align: 'right' },
  { id: '24hV', label: '24h Volume', align: 'right' },
  { id: 'Market_cap', label: 'Market Cap', align: 'right' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

// ----------------------------------------------------------------------

export default function CoinsList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
    defaultRowsPerPage: 100,
  });

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { products, isLoading, error, favourites } = useSelector((state) => state.product);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.eCommerce.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  const getLengthByStatus = (status) => tableData.filter((item) => item.accessLevel === status).length;

  const TABS = [
    { value: 'all', label: 'auth_all', color: 'info', icon: 'ic:baseline-auto-graph', count: tableData.length },
    {
      value: 'Highlights',
      label: 'High Lights',
      color: 'success',
      icon: 'material-symbols:list',
      count: getLengthByStatus(0),
    },
    { value: 'Categories', label: 'Categories', color: 'info', icon: 'bxs:shapes', count: getLengthByStatus(1) },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Page title="Coins List">
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        {/* cards go here */}
        <Grid container spacing={1} mb={2}>
          {favourites.length > 0 &&
            favourites.map((fav, index) => {
              return (
                <Grid item xs={6} md={2} key={index}>
                  <Favourites item={fav} />
                </Grid>
              );
            })}
        </Grid>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Iconify icon={tab.icon} color={tab.color} width={20} height={20} /> <div>{tab.label}</div>
                  </Stack>
                }
              />
            ))}
          </Tabs>

          <Divider />
          <ProductTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(20)] : dataFiltered).map((row, index) =>
                    row ? (
                      <ProductTableRow
                        key={index}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.name)}
                      />
                    ) : (
                      isLoading && !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    )
                  )}

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
        <Stack sx={{ p: 3 }} justifyContent="center" alignItems="center">
          <Pagination
            count={164} // Calculate number of pages
            page={page === 0 ? 1 : page} // Set current page to display in the pagination
            onChange={handlePageChange} // Update the page when pagination changes
            size="large"
          />
        </Stack>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.name.toLowerCase().includes(filterName.toLowerCase()));
  }

  if (filterStatus !== 'all') {
    const statusValue = STATUS_MAPPING[filterStatus];
    tableData = tableData.filter((item) => item.accessLevel === statusValue);
  }

  return tableData;
}
