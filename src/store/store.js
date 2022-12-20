import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { directionsReducer } from './slices/directions'
import { coinsReducer } from './slices/coins'
import { filtersReducer } from './slices/filters'

const rootReducer = combineReducers({
  directions: directionsReducer,
  coins: coinsReducer,
  filters: filtersReducer,
})

function createStore() {
  return configureStore({ reducer: rootReducer })
}

export default createStore
