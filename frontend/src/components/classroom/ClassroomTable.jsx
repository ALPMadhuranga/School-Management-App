import { FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

const ClassroomTable = ({
  classroomDetails,
  getOneClassroom,
  deleteClassroom,
}) => {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-5 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-600 border-b-2">Classroom Details</h2>
      <table className="w-full border-collapse border border-blue-500 mx-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 text-left">Classroom Name</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
        {classroomDetails.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-4 text-red-400">No Data Available!</td>
            </tr> 
          ) : (
          classroomDetails.map((row) => (
            <tr className="bg-white border-b border-blue-500">
            <td className="py-2 px-4">{row.classroomName}</td>
            <td className="py-2 px-4">
              <button onClick={() => getOneClassroom(row._id)} className="text-green-500 hover:text-green-700 text-lg py-2 px-4">
                <FaEdit />
              </button>
              <button onClick={() => deleteClassroom(row._id)} className="text-red-500 hover:text-red-700 text-lg py-2 px-4">
                <FaTrash />
              </button>
            </td>
          </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

ClassroomTable.propTypes = {
  classroomDetails: PropTypes.array.isRequired,
  getOneClassroom: PropTypes.func.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
}

export default ClassroomTable;
