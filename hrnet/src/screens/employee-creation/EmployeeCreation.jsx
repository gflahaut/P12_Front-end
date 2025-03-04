import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { states } from '../../constants/states';
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/slices/employee.slice";
import styles from "./EmployeeCreation.module.css"; // Import the CSS module

Modal.setAppElement("#root");

const EmployeeCreation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [department, setDepartment] = useState("Sales");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const saveEmployee = () => {
    const dateOfBirthStr = new Date(dateOfBirth).toISOString().split("T")[0];
    const startDateStr = new Date(startDate).toISOString().split("T")[0];
    
    const employeeData = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirthStr,
      startDate: startDateStr,
      street, 
      city, 
      state, 
      zip,
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
    <div className={styles.container}>
      <h1 className={styles.title}>HRnet</h1>
      <h2 className={styles.subtitle}>Create Employee</h2>
      
      <form className={styles.form}>
        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={styles.input} />

        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={styles.input} />

        <label>Date of Birth</label>
        <DatePicker 
          selected={dateOfBirth} 
          onChange={(date) => setDateOfBirth(date)} 
          className={styles.input} 
        />

        <label>Start Date</label>
        <DatePicker 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          className={styles.input} 
        />

        <fieldset className={styles.fieldset}>
          <legend>Address</legend>
          <label>Street</label>
          <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className={styles.input} />

          <label>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={styles.input} />

          <label>State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={styles.input}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name} ({state.abbreviation})
              </option>
            ))}
          </select>

          <label>Zip Code</label>
          <input 
            type="number" 
            value={zip} 
            onChange={(e) => setZip(e.target.value)} 
            className={styles.input} 
          />
        </fieldset>

        <label>Department</label>
        <select 
          value={department} 
          onChange={(e) => setDepartment(e.target.value)} 
          className={styles.input}
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>

        <button type="button" onClick={saveEmployee} className={styles.saveButton}>
          Save
        </button>
      </form>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        className={styles.modal}
      >
        <h2>Employee Created!</h2>
        <button onClick={handleEmployeeCreated} className={styles.closeButton}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default EmployeeCreation;
