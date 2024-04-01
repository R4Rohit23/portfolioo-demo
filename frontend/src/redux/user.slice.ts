import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  userData: any;
  userLoading: boolean;
}

const initialState: IUserState = {
  userData: {},
  userLoading: true,
};

// action of particular slice goes here...
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    signout(state) {
      state.userData = {};
      localStorage.removeItem("accessToken");
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
});

export const { setUserData, signout, setUserLoading } = userSlice.actions;
export default userSlice.reducer;
