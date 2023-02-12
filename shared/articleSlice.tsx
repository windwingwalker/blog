import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface State {
  tags: string[];
  series: string;
  currentPage: number;
}

const initialState: State = {
  tags: [],
  series: "",
  currentPage: 1
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    addTagFilter: (state: State, action: PayloadAction<string>) => {
      state["tags"].push(action["payload"]);
    },
    putSeriesFilter: (state: State, action: PayloadAction<string>) => {
      state["series"] = action["payload"];
    },
    resetAllFilter: (state: State) => {
      state["series"] = "";
      state["tags"] = []
    },
    setCurrentPage: (state: State, action: PayloadAction<number>) => {
      state["currentPage"] = action["payload"]
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTagFilter, putSeriesFilter, resetAllFilter, setCurrentPage } = articleSlice.actions

export default articleSlice.reducer