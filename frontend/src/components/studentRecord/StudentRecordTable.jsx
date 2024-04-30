import PropTypes from "prop-types";

const StudentRecordTable = ({ teacherAndSubjectDetails }) => {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-5 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-600 border-b-2">Teacher & Subject Details</h2>
      <table className="w-full border-collapse border border-blue-500 mx-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 text-left">Subject</th>
            <th className="py-2 px-4 text-left">Teacher</th>
          </tr>
        </thead>
        <tbody>
          {teacherAndSubjectDetails.length > 0 ? (
            teacherAndSubjectDetails.map((details, index) => (
            <tr key={index} className="bg-white border-b border-blue-500">
              <td className="py-2 px-4"> {details.subject && details.subject.subjectName ? (
                `${details.subject.subjectName}`
              ) : (
                <span className="text-red-500">No data available</span>
              )} 
              </td>
              <td className="py-2 px-4">
                {details.teacher && details.teacher.firstName && details.teacher.lastName ? (
                  `${details.teacher.firstName} ${details.teacher.lastName}` ) : (
                    <span className="text-red-500">No data available</span>
                )}
              </td>
            </tr>
            ))
          ): (
            <tr>
              <td>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

StudentRecordTable.propTypes = {
  teacherAndSubjectDetails: PropTypes.array.isRequired,
};

export default StudentRecordTable;