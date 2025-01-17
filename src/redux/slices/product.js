import { createSlice } from '@reduxjs/toolkit';

import { API_KEY } from 'src/config';
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isChartLoading: false,
  error: null,
  products: [],
  favourites: [],
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

    addToFavourites(state, action) {
      // console.log(action.payload);
      const findValue = state.favourites.find((item) => item.id === action.payload.id);
      const newValue = !findValue ? [...state.favourites, action.payload] : state.favourites;
      state.favourites = newValue;
    },

    removeFromFavourites(state, action) {
      // console.log(action.payload);
      const newFavourites = state.favourites.filter((item) => item.id !== action.payload.id);
      state.favourites = newFavourites;
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
export const { getProductsSuccess, getChartSuccess, addToFavourites } = slice.actions;

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

export function addToFavouritesList(item) {
  return async (dispatch) => {
    dispatch(slice.actions.addToFavourites(item));
  };
}

export function removeFromFavouritesList(item) {
  return async (dispatch) => {
    dispatch(slice.actions.removeFromFavourites(item));
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
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getChartData(name, date) {
  return async () => {
    dispatch(slice.actions.startChartLoading());
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
