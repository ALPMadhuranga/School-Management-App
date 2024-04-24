import React from "react";

const TeacherDropdown = () => {
  return (
    <>
      <label
        htmlFor="teacher"
        className="block text-sm font-medium text-gray-700"
      >
        Teacher
      </label>
      <select
        //   value={teacher}
        //   onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select Teacher</option>
        <option value="teacher1">Teacher 1</option>
        <option value="teacher2">Teacher 2</option>
        <option value="teacher3">Teacher 3</option>
      </select>
    </>
  );
};

export default TeacherDropdown;
