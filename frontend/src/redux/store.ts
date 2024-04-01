import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import userReducer from "./user.slice";

// add your reducer here
const rootReducer = combineReducers({ userDetails: userReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    store: rootReducer,
  },
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// export const persistor = persistStore(store);
export default store;
