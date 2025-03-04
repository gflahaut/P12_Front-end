import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import styles from "./EmployeeList.module.css";
import DataTable from "../../components/datatable/Datatables";
import { useSelector } from "react-redux";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.list).map((employee) => ({
    ...employee,
    startDate: new Date(employee.startDate).toLocaleDateString(),
    dateOfBirth: new Date(employee.dateOfBirth).toLocaleDateString(),
  }));
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Current Employees</h1>
      <span className={styles.addButton}>
        <Link
          to="/new-employee"
        >
          Add new employee
          <Plus size={24} />
        </Link>
      </span>
      <DataTable data={employees} columns={["firstName", "lastName", "startDate", "department", "dateOfBirth", "street", "city", "state", "zip"]} />
    </div>
  );
};

export default EmployeeList;
