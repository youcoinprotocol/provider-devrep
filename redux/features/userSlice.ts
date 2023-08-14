import { createSlice, PayloadAction } from "@reduxjs/toolkit";

createdAt: "2023-08-07T08:04:18.000Z";
id: "6be41747-d887-47ca-899a-9596a618fff1";
jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VybmFtZSI6ImppYXhpb25nQHBhdGhkYW8uaW8iLCJpYXQiOjE2OTE0MDE3NTAsImV4cCI6MTY5MTQ4ODE1MCwiYXVkIjoiaHR0cHM6Ly9pZC55b3Vjb2luLm9yZyIsInN1YiI6IjZiZTQxNzQ3LWQ4ODctNDdjYS04OTlhLTk1OTZhNjE4ZmZmMSIsImp0aSI6IjJiMzhlOGY5LTg1YmItNGM2My1hMTllLTQyMjFjOTU2ODk3ZSJ9.dlspRWYy55bBU_hdgxTD6KgobhamJX-d9k5EZrUNfbM";
updatedAt: "2023-08-07T08:04:18.000Z";
username: "jiaxiong@pathdao.io";

type UserPayload = {
  id: string;
  createdAt: string;
  jwt: string;
  updatedAt: string;
  username: string;
};

type UserState = {
  user: UserPayload;
};

const initialState = {
  user: {
    id: "",
    createdAt: "",
    jwt: "",
    updatedAt: "",
    username: "",
  },
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
    setUser: (state, action: PayloadAction<UserPayload>) => {
      state.user = action.payload;
    },
  },
});

export const { resetUser, setUser } = user.actions;
export default user.reducer;
