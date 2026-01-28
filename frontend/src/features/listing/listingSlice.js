import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListings,
  getListing,
  addListing,
  editListing,
  destroyListing,
  searchListings,
} from "./listingThunks";
import { addReview, deleteReview } from "../review/reviewThunks";

const listingSlice = createSlice({
  name: "listings",
  initialState: {
    loading: true,
    allListings: [],
    currListing: null,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCurrListing(state) {
      state.currListing = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all listings
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.allListings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get single listing
      .addCase(getListing.pending, (state) => {
        state.loading = true;
      })

      .addCase(getListing.fulfilled, (state, action) => {
        state.currListing = action.payload;
        state.loading = false;
      })

      .addCase(getListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add listing
      // .addCase(addListing.pending, (state) => {
      //   state.loading = true;
      // })

      .addCase(addListing.fulfilled, (state, action) => {
        state.allListings.push(action.payload);
        state.loading = false;
      })

      .addCase(addListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Edit listing
      // .addCase(editListing.pending, (state) => {
      //   state.loading = true;
      // })

      .addCase(editListing.fulfilled, (state, action) => {
        const index = state.allListings.findIndex(
          (l) => l._id === action.payload._id,
        );
        if (index !== -1) {
          state.allListings[index] = action.payload;
        }
        state.loading = false;
      })

      .addCase(editListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete listing
      .addCase(destroyListing.pending, (state) => {
        state.loading = true;
      })

      .addCase(destroyListing.fulfilled, (state, action) => {
        state.allListings = state.allListings.filter(
          (l) => l._id !== action.payload._id,
        );
        state.loading = false;
      })

      .addCase(destroyListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Search listings
      .addCase(searchListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.allListings = action.payload;
      })
      .addCase(searchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // .addCase(addReview.fulfilled, (state, action) => {
      //   if (state.currListing) {
      //     state.currListing.review.push(action.payload);
      //   }
      // })

      // .addCase(deleteReview.fulfilled, (state, action) => {
      //   if (state.currListing) {
      //     state.currListing.review = state.currListing.review.filter(
      //       (r) => r._id !== action.payload._id,
      //     );
      //   }
      // })

      .addCase(addReview.fulfilled, (state, action) => {
        state.currListing = action.payload;
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.currListing = action.payload;
      });
  },
});

export const { clearError, resetCurrListing } = listingSlice.actions;
export default listingSlice.reducer;
// D:\Web_Dev\backends\airbnb-clone frontend\src\features\listing\listingSlice.js
