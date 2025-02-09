import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialEmployees = [
    { firstName: "John", lastName: "Doe", department: "Engineering", startDate: "2022-01-10", dateOfBirth: "1990-06-15", street: "123 Main St", city: "Los Angeles", state: "CA", zip: "90001" },
    { firstName: "Jane", lastName: "Smith", department: "Marketing", startDate: "2023-03-15", dateOfBirth: "1985-09-23", street: "456 Elm St", city: "New York", state: "NY", zip: "10001" },
    { firstName: "Alice", lastName: "Johnson", department: "Human Resources", startDate: "2021-07-20", dateOfBirth: "1992-12-05", street: "789 Oak St", city: "Chicago", state: "IL", zip: "60601" },
    { firstName: "Bob", lastName: "Brown", department: "Legal", startDate: "2019-06-05", dateOfBirth: "1980-03-14", street: "321 Pine St", city: "Houston", state: "TX", zip: "77001" },
    { firstName: "Charlie", lastName: "Williams", department: "Sales", startDate: "2020-08-12", dateOfBirth: "1995-07-30", street: "654 Cedar St", city: "Miami", state: "FL", zip: "33101" }
];

// Async thunk to fetch employees from an API (mock example)
export const fetchEmployees = createAsyncThunk("employees/fetchEmployees", async () => {
  const response = await fetch("https://api.example.com/employees");
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  const data = await response.json();
  return data;
});

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: initialEmployees,
    status: "idle",
    error: null
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;