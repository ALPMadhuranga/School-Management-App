import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const ClassroomDropdown = ({ value, onChange, formErrors = {} }) => {

  const [classroomDetails, setClassroomDetails] = useState([]);

  useEffect(() => {
    getClassrooms();
  }, []);

  const getClassrooms = async () => {
    const res = await axios.get("/api/classrooms");
    if (res.status === 200) {
      setClassroomDetails(res.data.data);
      // console.log(classroomDetails);
    }
  }

  return (
    <>
      <label
        htmlFor="classroom"
        className="block text-sm font-medium text-gray-700"
      >
        Classroom
      </label>
      {classroomDetails.length > 0 ? ( 
              <select
              id="classroom"
              name="classroom"
              value={value}
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Classroom</option>
              {classroomDetails.map((classroom) => (
                <option key={classroom._id} value={classroom._id}>{classroom.classroomName}</option>
              ))}
            </select>
       ) : (
        <p>Loading classroom...</p>
      )}
      <div className="mt-2 text-sm text-red-600 dark:text-red-500">{formErrors.classroom}</div>
    </>
  );
};

ClassroomDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  formErrors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default ClassroomDropdown;
