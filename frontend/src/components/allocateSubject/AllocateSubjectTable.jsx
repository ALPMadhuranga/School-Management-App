import PropTypes from "prop-types";

const AllocateSubjectTable = ({
  allocateSubject,
  deleteAllocateSubject,
}) => {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-5 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-600 border-b-2">Allocate Subject Details</h2>
      <table className="w-full border-collapse border border-blue-500 mx-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 text-center">Teacher</th>
            <th className="py-2 px-4 text-center">Subject</th>
            <th className="py-2 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {allocateSubject.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-red-400">No Data Available!</td>
            </tr> 
          ) : (
          allocateSubject.map((row) => (
            <tr key={row._id} className="bg-white border-b border-blue-500">
            <td className="py-2 px-4 text-center"> {row.teacher ? (
              `${row.teacher.firstName} ${row.teacher.lastName}` 
            ) : (
              <span className="text-red-500">Please add this record again!</span>
            )} </td>
            <td className="py-2 px-4 text-center"> {row.subject ? (
              row.subject.subjectName 
            ) : ( 
              <span className="text-red-500">Please add this record again!</span>
            )} </td>
            <td className="py-2 px-4 text-center">
              <button onClick={() => deleteAllocateSubject(row._id)} className="text-red-500 hover:text-white hover:bg-red-500 text-sm py-2 px-2 border border-red-500 rounded-md">
                Deallocate
              </button>
            </td>
          </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

AllocateSubjectTable.propTypes = {
  allocateSubject: PropTypes.array.isRequired,
  deleteAllocateSubject: PropTypes.func.isRequired,
};

export default AllocateSubjectTable;