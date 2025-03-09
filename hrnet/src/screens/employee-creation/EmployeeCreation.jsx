import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/slices/employee.slice";
import { states } from "../../constants/states";
import { zipcodes } from "../../constants/zipCode";
import CustomDatePicker from "../../components/Datepicker";
import CustomModal from "../../components/Modal";
import CustomSelect from "../../components/Select";
import styles from "./EmployeeCreation.module.css";

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
  const filteredZipcodes = zipcodes.filter(z => z.abbreviation === state);

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
    <div className={ styles.container }>
      <h1 className={ styles.title }>HRnet</h1>
      <h2 className={ styles.subtitle }>Create Employee</h2>

      <form className={ styles.form }>
        <label>First Name</label>
        <input type="text" value={ firstName } onChange={ (e) => setFirstName(e.target.value) } className={ styles.input } />

        <label>Last Name</label>
        <input type="text" value={ lastName } onChange={ (e) => setLastName(e.target.value) } className={ styles.input } />

        <label>Date of Birth</label>
        <CustomDatePicker selected={ dateOfBirth } onChange={ setDateOfBirth } className={ styles.input } />

        <label>Start Date</label>
        <CustomDatePicker selected={ startDate } onChange={ setStartDate } className={ styles.input } />

        <fieldset className={ styles.fieldset }>
          <legend>Address</legend>
          <label>Street</label>
          <input type="text" value={ street } onChange={ (e) => setStreet(e.target.value) } className={ styles.input } />

          <label>City</label>
          <input type="text" value={ city } onChange={ (e) => setCity(e.target.value) } className={ styles.input } />

          <label>State</label>
          <CustomSelect
            value={ state }
            onChange={ (e) => setState(e.target.value) }
            options={ states.map(s => ({ value: s.abbreviation, label: `${s.name} (${s.abbreviation})` })) }
            className={ styles.input }
          />

          <label>Zip Code</label>
          <CustomSelect
            value={ zip }
            onChange={ (e) => setZip(e.target.value) }
            options={ filteredZipcodes.map(z => ({ value: z.zip, label: z.zip })) }
            className={ styles.input }
          />

        </fieldset>

        <label>Department</label>
        <CustomSelect
          value={ department }
          onChange={ (e) => setDepartment(e.target.value) }
          options={ [
            { value: "Sales", label: "Sales" },
            { value: "Marketing", label: "Marketing" },
            { value: "Engineering", label: "Engineering" },
            { value: "Human Resources", label: "Human Resources" },
            { value: "Legal", label: "Legal" },
          ] }
          className={ styles.input }
        />

        <button type="button" onClick={ saveEmployee } className={ styles.saveButton }>
          Save
        </button>
      </form>

      <CustomModal isOpen={ modalIsOpen } onRequestClose={ () => setModalIsOpen(false) } className={ styles.modal }>
        <h2>Employee Created!</h2>
        <button onClick={ handleEmployeeCreated } className={ styles.closeButton }>
          Close
        </button>
      </CustomModal>
    </div>
  );
};

export default EmployeeCreation;
