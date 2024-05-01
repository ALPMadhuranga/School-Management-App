import { FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { format } from "date-fns";

const StudentTable = ({ studentDetails, getOneStudent, deleteStudent }) => {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-5 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-600 border-b-2">Student List</h2>
      <table className="w-full border-collapse border border-blue-500 mx-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Contact Person</th>
            <th className="py-2 px-4 text-left">Contact No</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Birthday</th>
            <th className="py-2 px-4 text-left">Age</th>
            <th className="py-2 px-4 text-left">Classroom</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentDetails.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-red-400">No Data Available!</td>
            </tr> 
          ) : (
          studentDetails.map((row) => (
            <tr key={row._id} className="bg-white border-b border-blue-500">
            <td className="py-2 px-4">{row.firstName + ' ' + row.lastName}</td>
            <td className="py-2 px-4">{row.contactPerson}</td>
            <td className="py-2 px-4">{row.contactNo}</td>
            <td className="py-2 px-4">{row.email}</td>
            <td className="py-2 px-4">{format(new Date(row.birthDate), "dd/MM/yyyy")}</td>
            <td className="py-2 px-4">{row.age}</td>
            <td className="py-2 px-4"> {row.classroomDetails ? ( 
              row.classroomDetails.classroomName
             ) : (
              <span className="text-red-500">Please add this record again!</span>
             ) } </td>
            <td className="py-2 px-4">
              <button onClick={() => getOneStudent(row._id)} className="text-green-500 hover:text-green-700 text-lg py-2 px-4">
                <FaEdit />
              </button>
              <button onClick={() => deleteStudent(row._id)} className="text-red-500 hover:text-red-700 text-lg py-2 px-4">
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

StudentTable.propTypes = {
  studentDetails: PropTypes.array.isRequired,
  getOneStudent: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
}

export default StudentTable;
