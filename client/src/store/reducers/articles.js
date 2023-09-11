import { createSlice } from '@reduxjs/toolkit';
import { addArticle } from '../action/articles';
export const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    homeSort: {},
    loading: false,
    articles: [],
    current: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Add Article
      .addCase(addArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.lastAdded = action.payload;
      })
      .addCase(addArticle.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default articleSlice.reducer;
