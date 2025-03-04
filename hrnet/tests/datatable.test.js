import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "../src/components/datatable/Datatables";

const mockData = [
  { firstName: "Alice", lastName: "Johnson", startDate: "01/01/2023", department: "Sales", dateOfBirth: "1990-01-01", street: "123 Main St", city: "NYC", state: "NY", zipCode: "10001" },
  { firstName: "Bob", lastName: "Smith", startDate: "02/15/2023", department: "Engineering", dateOfBirth: "1985-05-12", street: "456 Elm St", city: "LA", state: "CA", zipCode: "90001" },
];

const columns = ["firstName", "lastName", "startDate", "department", "dateOfBirth", "street", "city", "state", "zipCode"];

describe("DataTable Component", () => {
  test("renders table with data", () => {
    render(<DataTable data={mockData} columns={columns} />);

    // Check if table headers are rendered
    columns.forEach((column) => {
      expect(screen.getByText(column.charAt(0).toUpperCase() + column.slice(1))).toBeInTheDocument();
    });

    // Check if first row data is rendered
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Johnson")).toBeInTheDocument();
  });

  test("sorts data when clicking on column header", () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    const firstNameHeader = screen.getByText("FirstName");
    fireEvent.click(firstNameHeader); // Sort Ascending
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Alice");

    fireEvent.click(firstNameHeader); // Sort Descending
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Bob");
  });

  test("displays pagination controls", () => {
    render(<DataTable data={mockData} columns={columns} rowsPerPage={1} />);

    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
  });
});