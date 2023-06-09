import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupModalOpen: false,
  loginModalOpen: false,
  commentModalOpen: false,
  searchModalOpen: false,
  bannerState: true,
  commentTweetDetails: {
    id: null,
    content: null,
    photoUrl: null,
    name: null,
    username: null,
    timestamp: null,
    image: null,
    main: null,
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
    openSearchModal: (state) => {
      state.searchModalOpen = true;
    },
    closeSearchModal: (state) => {
      state.searchModalOpen = false;
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
      state.commentTweetDetails.image = action.payload.image;
      state.commentTweetDetails.main = action.payload.main;
    },
  },
});

export const {
  openSignupModal,
  closeSignupModal,
  openLoginModal,
  closeLoginModal,
  openCommentModal,
  closeCommentModal,
  openSearchModal,
  closeSearchModal,
  hideBanner,
  showBanner,
  setTweetDetails,
} = modalSlice.actions;

export default modalSlice.reducer;
