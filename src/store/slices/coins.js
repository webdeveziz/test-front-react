import { createSlice } from '@reduxjs/toolkit'

const coinss = ['BTC', 'ETH', 'USDTTRC']
const banks = ['ACRUB', 'SBERRUB', 'TCSBRUB']
const cashs = ['CASHUSD', 'CASHRUB']

const initialState = {
  coins: [],
}

const coins = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    set(state, action) {
      state.coins = action.payload
    },
    selectCat(state, action) {
      state.coins = action.payload.data
      if (action.payload.cat === 'Все') {
        state.coins = [...state.coins, action.payload.data]
      } else if (action.payload.cat === 'Криптовалюты') {
        const temp = state.coins.filter((item) => coinss.includes(item.code))
        state.coins = temp
      } else if (action.payload.cat === 'Наличные') {
        const temp = state.coins.filter((item) => cashs.includes(item.code))
        state.coins = temp
      } else if (action.payload.cat === 'Банки RUB') {
        const temp = state.coins.filter((item) => banks.includes(item.code))
        state.coins = temp
      } else {
        state.coins = [{ code: 'Отсутствует', name: 'нет' }]
      }
    },
  },
})

const { set, selectCat } = coins.actions
export const { reducer: coinsReducer } = coins

export const setCoins = (data) => (dispatch) => {
  dispatch(set(data))
}

export const setSecondCat = (data, cat) => (dispatch) => {
  dispatch(selectCat({ data, cat }))
}
