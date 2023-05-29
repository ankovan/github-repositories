import { createSlice } from '@reduxjs/toolkit'

export interface SearchState {
  value: string
}

const initialState: SearchState = {
  value: "",
}
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValueRedux: (state, action) => {
      return {
        ...state, 
        value: action.payload
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearchValueRedux } = searchSlice.actions

export default searchSlice.reducer