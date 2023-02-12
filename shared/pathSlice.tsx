import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface State {
  value: string
}

const initialState: State = {
  value: "/",
}

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    updatePath: (state: State, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updatePath } = pathSlice.actions

export default pathSlice.reducer