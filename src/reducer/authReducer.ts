import { createSlice } from "@reduxjs/toolkit";

type State = Record<'tokenJwt', string | undefined>
const INITIAL__STATE: State = {
    tokenJwt: undefined,
  }

const authReducer = createSlice({
    name: "auth",
    initialState: INITIAL__STATE,
    reducers: {
        getAuth: ({tokenJwt}, action) => (tokenJwt = action.payload),
        resetAuth: ({tokenJwt}) => (tokenJwt = undefined),
    },
  });
  
  export const { getAuth } = authReducer.actions;
  export default authReducer.reducer;
