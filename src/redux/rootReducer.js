import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices

import productReducer from './slices/product';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const subscriptionPersistConfig = {
  key: 'subscription',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['plan'],
};

const rootReducer = combineReducers({
  product: productReducer,
});

export { rootPersistConfig, rootReducer };
