import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getTweetsRequest = createAsyncThunk("TWEETS", () => {
  return axios.get("/api/tweets").then((r) => r.data);
});

export const getSingleTweetRequest = createAsyncThunk("TWEET", (id) => {
  return axios
    .get(`/api/tweets/${id}`)
    .then((r) => r.data);
});

export const getUserTweetsRequest = createAsyncThunk("USER_TWEETS", (name) => {
  return axios
    .get(`/api/users/${name}`)
    .then((r) => r.data);
});

export const postTweetRequest = createAsyncThunk("CREATE_TWEET", (args) => {
  console.log("ARGS", args);
  return axios
    .post('/api/tweets/', args)
    .then((r) => r.data);
});

export const deleteTweetRequest = createAsyncThunk("DELETE_TWEET", (id) => {
  return axios
    .delete(`/api/tweets/${id}`)
    .then((r) => r.data[0])
});

export const updateUserTweetsRequest = createAsyncThunk("UPDATE_USER_TWEETS", (args) => {
  return axios
    .put(`/api/users/${args.name}`, { isVerified: args.isVerified })
});

const tweetsReducer = createReducer([], {
  [getTweetsRequest.fulfilled]: (state, action) => action.payload,
  [getSingleTweetRequest.fulfilled]: (state, action) => action.payload,
  [getUserTweetsRequest.fulfilled]: (state, action) => action.payload,
  [postTweetRequest.fulfilled]: (state, action) => [...state, action.payload],
  [deleteTweetRequest.fulfilled]: (state, action) => state.filter(tweet => tweet.id !== action.payload.id),
  [updateUserTweetsRequest.fulfilled]: (state, action) => [...state],
});

export default tweetsReducer;
