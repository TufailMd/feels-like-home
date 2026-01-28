import { createSlice } from "@reduxjs/toolkit";
import { signup, login, logout, getLogin } from "./userThunks";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;

        if (action.payload.user) {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default userSlice.reducer;
// D:\Web_Dev\backends\airbnb-clone frontend\src\features\user\userThunks.js
