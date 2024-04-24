import React from "react";

const StudentDropdown = () => {
  return (
    <>
      <label
        htmlFor="student"
        className="block text-sm font-medium text-gray-700"
      >
        Student
      </label>
      <select
        //   value={student}
        //   onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select Student</option>
        <option value="student1">Student 1</option>
        <option value="student2">Student 2</option>
        <option value="student3">Student 3</option>
      </select>
    </>
  );
};

export default StudentDropdown;
