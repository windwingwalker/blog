import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeCookies } from '../functions/auth';

// Define a type for the slice state
interface State {
  role: string;
}

const initialState: State = {
  role: "guest",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: State, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    logout: (state: State) => {
      removeCookies();
      state.role = "guest";      
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer