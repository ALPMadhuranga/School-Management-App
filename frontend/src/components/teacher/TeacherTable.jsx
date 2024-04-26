import { FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

const TeacherTable = ({ teacherDetails, getSingleTeacher, deleteTeacher }) => {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-5 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-600 border-b-2">Teacher List</h2>
      <table className="w-full border-collapse border border-blue-500 mx-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Contact No</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {teacherDetails.map((row) => (
          <tr key={row._id} className="bg-white border-b border-blue-500">
            <td className="py-2 px-4">{row.firstName + ' ' + row.lastName}</td>
            <td className="py-2 px-4">{row.contactNo}</td>
            <td className="py-2 px-4">{row.email}</td>
            <td className="py-2 px-4">
              <button onClick={() => getSingleTeacher(row._id)} className="text-green-500 hover:text-green-700 text-lg py-2 px-4">
                <FaEdit />
              </button>
              <button onClick={() => deleteTeacher(row._id)} className="text-red-500 hover:text-red-700 text-lg py-2 px-4">
                <FaTrash />
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TeacherTable.propTypes = {
  teacherDetails: PropTypes.array.isRequired,
  getSingleTeacher: PropTypes.func.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
};

export default TeacherTable;