import React from 'react'
import StudentForm from '../components/student/StudentForm'
import StudentTable from '../components/student/StudentTable'

const Student = () => {
  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <StudentForm />
      <StudentTable />
    </div>
  )
}

export default Student