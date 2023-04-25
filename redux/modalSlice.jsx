import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupModalOpen: false,
  loginModalOpen: false,
  bannerState: true,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignupModal: (state) => {
      state.signupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.signupModalOpen = false;
    },
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    hideBanner: (state) => {
      state.bannerState = false;
    },
    showBanner: (state) => {
      state.bannerState = true;
    },
  },
});

export const {
  openSignupModal,
  closeSignupModal,
  openLoginModal,
  closeLoginModal,
  hideBanner,
  showBanner,
} = modalSlice.actions;

export default modalSlice.reducer;
