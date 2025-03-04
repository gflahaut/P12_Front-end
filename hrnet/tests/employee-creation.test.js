import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import EmployeeCreation from "../src/screens/employee-creation/EmployeeCreation";

// Mock the #root element for react-modal
beforeAll(() => {
    // Ensure #root exists in the DOM before each test
    document.body.innerHTML = '<div id="root"></div>';
});

// Mock react-modal if you don't need to test its specific behavior
jest.mock('react-modal', () => ({
    setAppElement: jest.fn(), // Mock setAppElement to avoid errors
    default: ({ children }) => <div>{children}</div>, // Mock Modal as a simple div
}));

const mockStore = configureStore([]);
let store;

describe("EmployeeCreation Component", () => {
    beforeEach(() => {
        store = mockStore({
            employees: { list: [] },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EmployeeCreation />
                </MemoryRouter>
            </Provider>
        );
    });

    test("renders form inputs correctly", () => {
        expect(screen.getByLabelText("First Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
        expect(screen.getByLabelText("Street")).toBeInTheDocument();
    });

    test("allows typing in inputs", () => {
        fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "John" } });
        fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Doe" } });

        expect(screen.getByLabelText("First Name")).toHaveValue("John");
        expect(screen.getByLabelText("Last Name")).toHaveValue("Doe");
    });

    test("shows modal on successful employee creation", () => {
        fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "Jane" } });
        fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Doe" } });

        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        expect(screen.getByText("Employee Created!")).toBeInTheDocument();
    });
});