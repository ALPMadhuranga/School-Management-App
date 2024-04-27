import PropTypes from "prop-types";

const AllocateClassroomTable = ({
  allocateClassroom,
  deleteAllocateClassroom,
}) => {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-5 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-600 border-b-2">Allocate Classroom Details</h2>
      <table className="w-full border-collapse border border-blue-500 mx-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 text-left">Teacher</th>
            <th className="py-2 px-4 text-left">Classroom</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {allocateClassroom.map((row)=> (
          <tr key={row._id} className="bg-white border-b border-blue-500">
            <td className="py-2 px-4"> {row.teacher ? (
              `${row.teacher.firstName} ${row.teacher.lastName}`
            ) : ( 
              <span className="text-red-500">Please add this record again!</span>
             )
              } </td>
            <td className="py-2 px-4"> {row.classroom ? ( 
              row.classroom.classroomName
             ) : (
              <span className="text-red-500">Please add this record again!</span>
             ) } </td>
            <td className="py-2 px-4">
              <button onClick={() => deleteAllocateClassroom(row._id)} className="text-red-500 hover:text-white hover:bg-red-500 text-sm py-2 px-2 border border-red-500 rounded-md">
                Deallocate
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

AllocateClassroomTable.propTypes = {
  allocateClassroom: PropTypes.array.isRequired,
  deleteAllocateClassroom: PropTypes.func.isRequired,
};

export default AllocateClassroomTable;