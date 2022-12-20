import { createSlice } from '@reduxjs/toolkit'
import fetchAll from '../../api'

const initialState = {
  directions: [],
}

const directions = createSlice({
  name: 'directions',
  initialState,
  reducers: {
    set(state, action) {
      state.directions = action.payload
    },
    selectCat(state, action) {
      if (action.payload.cat === 'Все') {
        state.directions = action.payload.data
      } else if (action.payload.cat === 'Криптовалюты') {
        state.directions = [
          action.payload.data[0],
          action.payload.data[1],
          action.payload.data[7],
        ]
      } else if (action.payload.cat === 'Наличные') {
        state.directions = [action.payload.data[2], action.payload.data[3]]
      } else if (action.payload.cat === 'Банки RUB') {
        state.directions = [
          action.payload.data[4],
          action.payload.data[5],
          action.payload.data[6],
        ]
      } else if (action.payload.cat === 'Банки UAH') {
        state.directions = [{ code: 'Нет', name: '-' }]
      }
    },
  },
})

const { set, selectCat } = directions.actions
export const { reducer: directionsReducer } = directions

export const setDirections = () => (dispatch) => {
  try {
    const data = fetchAll().directions
    dispatch(set(data))
  } catch (error) {
    console.log(error.message)
  }
}

export const selectCategories = (cat) => (dispatch) => {
  try {
    const data = fetchAll().directions
    dispatch(selectCat({ cat, data }))
  } catch (error) {
    console.log(error.message)
  }
}
