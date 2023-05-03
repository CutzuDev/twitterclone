import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupModalOpen: false,
  loginModalOpen: false,
  commentModalOpen: false,
  bannerState: true,
  commentTweetDetails: {
    id: null,
    content: null,
    photoUrl: null,
    name: null,
    username: null,
    timestamp: null,
  },
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
    showBanner: (state) => {
      state.bannerState = true;
    },
    hideBanner: (state) => {
      state.bannerState = false;
    },
    openCommentModal: (state) => {
      state.commentModalOpen = true;
    },
    closeCommentModal: (state) => {
      state.commentModalOpen = false;
    },
    setTweetDetails: (state, action) => {
      state.commentTweetDetails.name = action.payload.name;
      state.commentTweetDetails.username = action.payload.username;
      state.commentTweetDetails.id = action.payload.id;
      state.commentTweetDetails.content = action.payload.content;
      state.commentTweetDetails.photoUrl = action.payload.photoUrl;
      state.commentTweetDetails.timestamp = action.payload.timestamp;
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
  openCommentModal,
  closeCommentModal,
  setTweetDetails,
} = modalSlice.actions;

export default modalSlice.reducer;
