import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentDropdown = ({ resetForm, handleStudentChange, value }) => {
  const [studentDetails, setStudentDetails] = useState([]);

  const getStudents = async () => {
    const response = await axios.get("/api/students/");
    if (response.status === 200) {
      setStudentDetails(response.data);
    };
  };
  useEffect(() => {
    getStudents();
  }, []);


  return (
    <>
      <label
        htmlFor="student"
        className="block text-sm font-medium text-gray-700"
      >
        Student
      </label>
      <select
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        id = "studentName"
        name = "studentName"
        value={value}
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (selectedValue !== "") {
            handleStudentChange(selectedValue);
          }
          resetForm();
        }}
      >
        <option value="">Select a student</option>
        {studentDetails.length > 0 && 
        studentDetails.map((student) => (
          <option key={student._id} value={student._id}>
            {`${student.firstName} ${student.lastName}`}
          </option>
        ))}
      </select>
    </>
  );
};

StudentDropdown.propTypes = {
  value: PropTypes.string,
  resetForm: PropTypes.func.isRequired,
  handleStudentChange: PropTypes.func.isRequired,
};

export default StudentDropdown;
