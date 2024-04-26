import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const TeacherDropdown = ({ value, onChange, formErrors = {} }) => {
  const [teacherDetails, setTeacherDetails] = useState([]);
  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    try {
      const res = await axios.get("/api/teachers/");
    if (res.status === 200) {
      setTeacherDetails(res.data.data);
      // console.log(teacherDetails);
    }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
    
  };

  return (
    <>
      <label
        htmlFor="teacher"
        className="block text-sm font-medium text-gray-700"
      >
        Teacher
      </label>
      {teacherDetails.length > 0 ? ( 
        <select
        id="teacher"
        name="teacher"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select Teacher</option>
        {teacherDetails.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {`${teacher.firstName} ${teacher.lastName}`}
            </option>
          ))}
      </select>
      ) : (
        <p>Loading teachers...</p>
      )}
      <div className="mt-2 text-sm text-red-600 dark:text-red-500">{formErrors.teacher}</div>
    </>
  );
};

TeacherDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  formErrors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default TeacherDropdown;