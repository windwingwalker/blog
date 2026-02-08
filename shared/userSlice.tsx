import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch } from './store'
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
    // Pure reducer - no side effects
    setGuestRole: (state: State) => {
      state.role = "guest";
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, setGuestRole } = userSlice.actions

// Thunk action to handle logout with side effects
export const logout = () => (dispatch: AppDispatch) => {
  // Side effect: Remove cookies
  removeCookies();
  // Pure action: Update state
  dispatch(setGuestRole());
}

export default userSlice.reducer