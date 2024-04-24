import React from "react";

const SubjectDropdown = () => {
  return (
    <>
      <label
        htmlFor="subject"
        className="block text-sm font-medium text-gray-700"
      >
        Subject
      </label>
      <select
        //   value={subject}
        //   onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select Subject</option>
        <option value="subject1">Subject 1</option>
        <option value="subject2">Subject 2</option>
        <option value="subject3">Subject 3</option>
      </select>
    </>
  );
};

export default SubjectDropdown;
