import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import DataTable from "../../components/datatable/Datatables";
import { useSelector } from "react-redux";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.list).map((employee) => ({
    ...employee,
    startDate: new Date(employee.startDate).toLocaleDateString(),
    dateOfBirth: new Date(employee.dateOfBirth).toLocaleDateString(),
  }));
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-center mb-4">Current Employees</h1>
      <Link
        to="/new-employee"
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        Add new employee
        <Plus size={24} />
      </Link>
      <DataTable data={employees} columns={["firstName", "lastName", "startDate", "department", "dateOfBirth", "street", "city", "state", "zip"]} />
    </div>
  );
};

export default EmployeeList;
