import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employee.slice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;