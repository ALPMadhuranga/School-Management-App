import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const SubjectDropdown = ({ value, onChange, formErrors = {} }) => {

  const [subjectDetails, setSubjectDetails] = useState([]);

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    const res = await axios.get("/api/subjects/");
    if (res.status === 200) {
      setSubjectDetails(res.data.data);
      // console.log(subjectDetails);
    }
  };

  return (
    <>
      <label
        htmlFor="subject"
        className="block text-sm font-medium text-gray-700"
      >
        Subject
      </label>
      {subjectDetails.length > 0 ? ( 
        <select
        id="subject"
        name="subject"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select Subject</option>
        {subjectDetails.map((subject) => (
            <option key={subject._id} value={subject._id}>{subject.subjectName}</option>
          ))}
      </select>
       ) : (
        <p>Loading subject...</p>
      )}
      <div className="mt-2 text-sm text-red-600 dark:text-red-500">{formErrors.subject}</div>
    </>
  );
};

SubjectDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  formErrors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default SubjectDropdown;
