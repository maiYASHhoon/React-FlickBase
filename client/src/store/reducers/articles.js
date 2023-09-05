import { createSlice } from '@reduxjs/toolkit';
export const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    homeSort: {},
    loading: false,
    articles: [],
    current: null,
  },
  reducers: {},
});
export default articleSlice.reducer;
