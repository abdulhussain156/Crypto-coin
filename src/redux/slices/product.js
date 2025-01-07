import { createSlice } from '@reduxjs/toolkit';

import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import { API_KEY } from 'src/config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isChartLoading: false,
  error: null,
  products: [],
  chartData: null,
  reset: false,
  product: null,
  sortBy: null,
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // START LOADING
    startChartLoading(state) {
      state.isChartLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    // GET PRODUCT
    getChartSuccess(state, action) {
      state.isChartLoading = false;
      state.chartData = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getProductsSuccess, getChartSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getProducts(page = 1) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `/api/v3/coins/markets?page=${page}&price_change_percentage=1h&vs_currency=usd&&x_cg_demo_api_key=${API_KEY}`
      );
      dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCoin(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v3/coins/${name}?x_cg_demo_api_key=${API_KEY}`);
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getChartData(name, date) {
  return async () => {
    dispatch(slice.actions.startChartLoading());
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const oneHourAgo = now - 3600;
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${name}/market_chart?days=${date}&vs_currency=usd&x_cg_demo_api_key=${API_KEY}`
      );
      dispatch(slice.actions.getChartSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
