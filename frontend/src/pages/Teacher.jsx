import React from "react";
import TeacherForm from "../components/teacher/TeacherForm";
import TeacherTable from "../components/teacher/TeacherTable";

const Teacher = () => {
  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <TeacherForm />
      <TeacherTable />
    </div>
  );
};

export default Teacher;
