import React from "react";

const ClassroomDropdown = () => {
  return (
    <>
      <label
        htmlFor="classroom"
        className="block text-sm font-medium text-gray-700"
      >
        Classroom
      </label>
      <select
        //   value={classroom}
        //   onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select Classroom</option>
        <option value="classroom1">Classroom 1</option>
        <option value="classroom2">Classroom 2</option>
        <option value="classroom3">Classroom 3</option>
      </select>
    </>
  );
};

export default ClassroomDropdown;
