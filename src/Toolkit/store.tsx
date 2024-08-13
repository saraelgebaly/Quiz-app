import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Auth/authSlice";
import { groupSlice } from "./Groups/groupSlice";
import { studentSlice } from "./Students/studentSlice";
import { questionSlice } from "./Questions/questionSlice";
import { quizSlice } from "./Quizes/quizSlice";
import { ResultsSlice } from "./Results/resultsSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [groupSlice.reducerPath]: groupSlice.reducer,
    [studentSlice.reducerPath]: studentSlice.reducer,
    [questionSlice.reducerPath]: questionSlice.reducer,
    [quizSlice.reducerPath]: quizSlice.reducer,
      [ResultsSlice.reducerPath]: ResultsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authSlice.middleware,
      groupSlice.middleware,
      studentSlice.middleware,
      questionSlice.middleware,
      quizSlice.middleware,
      ResultsSlice.middleware,
    ),
});
