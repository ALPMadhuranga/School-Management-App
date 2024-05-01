import { FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

const SubjectTable = ({ subjectDetails, getOneSubject, deleteSubject }) => {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-5 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-600 border-b-2">Subject Details</h2>
      <table className="w-full border-collapse border border-blue-500 mx-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 text-left">Subject Name</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
        {subjectDetails.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-4 text-red-400">No Data Available!</td>
            </tr> 
          ) : (
          subjectDetails.map((row) => 
          <tr className="bg-white border-b border-blue-500">
          <td className="py-2 px-4"> {row.subjectName} </td>
          <td className="py-2 px-4">
            <button onClick={() => getOneSubject(row._id)} className="text-green-500 hover:text-green-700 text-lg py-2 px-4">
              <FaEdit />
            </button>
            <button onClick={() => deleteSubject(row._id)} className="text-red-500 hover:text-red-700 text-lg py-2 px-4">
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

SubjectTable.propTypes = {
  subjectDetails: PropTypes.array.isRequired,
  getOneSubject: PropTypes.func.isRequired,
  deleteSubject: PropTypes.func.isRequired,
};

export default SubjectTable;
