import { FaTrash, FaEdit } from "react-icons/fa";

const TeacherTable = () => {
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
          <tr className="bg-white border-b border-blue-500">
            <td className="py-2 px-4">John Doe</td>
            <td className="py-2 px-4">0705695321</td>
            <td className="py-2 px-4">john@testmail.com</td>
            <td className="py-2 px-4">
              <button className="text-green-500 hover:text-green-700 text-lg py-2 px-4">
                <FaEdit />
              </button>
              <button className="text-red-500 hover:text-red-700 text-lg py-2 px-4">
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
