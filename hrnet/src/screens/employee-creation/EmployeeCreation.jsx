import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { states } from '../../constants/states';
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/slices/employee.slice";

Modal.setAppElement("#root"); // Required for accessibility

const EmployeeCreationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState("Sales");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const saveEmployee = () => {
    const dateOfBirthStr = new Date(dateOfBirth).toISOString().split("T")[0];
    const startDateStr = new Date(startDate).toISOString().split("T")[0];
    const employeeData = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirthStr,
      startDate : startDateStr,
      street, 
      city, 
      state, 
      zipCode,
      department,
    };
    dispatch(addEmployee(employeeData));
    setModalIsOpen(true);
  };

  const handleEmployeeCreated = () => {
    setModalIsOpen(false);
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold text-center mb-4">HRnet</h1>
      
      <h2 className="text-lg font-semibold mt-4">Create Employee</h2>
      <form className="flex flex-col gap-3">
        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-2" />

        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-2" />

        <label>Date of Birth</label>
        <DatePicker selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)} className="border p-2 w-full" />

        <label>Start Date</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="border p-2 w-full" />

        <fieldset className="border p-3">
          <legend className="font-semibold">Address</legend>
          <label>Street</label>
          <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="border p-2 w-full" />

          <label>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="border p-2 w-full" />

          <label>State</label>
          <select
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name} ({state.abbreviation})
              </option>
            ))}
          </select>

          <label>Zip Code</label>
          <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="border p-2 w-full" />
        </fieldset>

        <label>Department</label>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} className="border p-2">
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>

        <button type="button" onClick={saveEmployee} className="bg-blue-500 text-white p-2 mt-3">
          Save
        </button>
      </form>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="p-6 bg-white shadow-lg rounded-md max-w-sm mx-auto">
        <h2 className="text-lg font-bold">Employee Created!</h2>
        <button onClick={() => handleEmployeeCreated()} className="mt-4 bg-red-500 text-white p-2">Close</button>
      </Modal>
    </div>
  );
};

export default EmployeeCreationForm;