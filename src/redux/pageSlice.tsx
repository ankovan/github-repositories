import { createSlice } from '@reduxjs/toolkit'

export interface SearchState {
  value: number;
}

const initialState: SearchState = {
  value: 0,
}
export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageNumberRedux: (state, action) => {
      return {
        ...state, 
        value: action.payload
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPageNumberRedux } = pageSlice.actions

export default pageSlice.reducer