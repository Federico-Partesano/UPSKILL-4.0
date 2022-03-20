import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/RespSignIn";

interface State {
  tokenJwt: string | undefined;
  user: User | undefined;
}
const INITIAL__STATE: State = {
  tokenJwt: undefined,
  user: undefined,
};

const authReducer = createSlice({
  name: "auth",
  initialState: INITIAL__STATE,
  reducers: {
    getAuth: (state, { payload: { tokenJwt, user } }) => ({
      ...state,
      tokenJwt: tokenJwt,
      user: user,
    }),

    resetAuth: (state) => ({ ...state, tokenJwt: undefined, user: undefined }),
  },
});

export const { getAuth, resetAuth } = authReducer.actions;
export const authReducerActions = authReducer.actions;
export default authReducer.reducer;
