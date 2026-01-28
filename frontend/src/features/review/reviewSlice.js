import { createSlice } from "@reduxjs/toolkit";
import { addReview, deleteReview } from "./reviewThunks";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
// D:\Web_Dev\backends\airbnb-clone frontend\src\features\review\reviewSlice.js
