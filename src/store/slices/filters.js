import { createSlice } from '@reduxjs/toolkit'
import fetchAll from '../../api'

const initialState = {
  filters: [],
  filteredCoins: [
    { code: 'CASHRUB', name: ' Наличные RUB' },
    { code: 'CASHUSD', name: ' Наличные USD' },
    { code: 'SBERRUB', name: ' Сбербанк RUB' },
    { code: 'ACRUB', name: ' Альфа-банк RUB' },
    { code: 'TCSBRUB', name: ' Тинькофф RUB' },
    { code: 'USDTTRC', name: ' Tether TRC-20 USDTTRC' },
  ],
}

const filters = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    load(state, action) {
      state.filters = action.payload
    },
    set(state, action) {
      const selectedCoins = state.filters.filter((elem) => {
        return action.payload === elem.from.code
      })
      state.filteredCoins = selectedCoins[0].to
    },
  },
})

const { load, set } = filters.actions
export const { reducer: filtersReducer } = filters

export const setFilters = () => (dispatch) => {
  try {
    const data = fetchAll().filters
    dispatch(load(data))
  } catch (error) {
    console.log(error.message)
  }
}

export const setToCoins = (coin) => (dispatch) => {
  dispatch(set(coin))
}
