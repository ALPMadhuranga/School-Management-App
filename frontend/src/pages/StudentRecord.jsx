import React from 'react'
import StudentRecordForm from '../components/studentRecord/StudentRecordForm'
import StudentRecordTable from '../components/studentRecord/StudentRecordTable'

const StudentRecord = () => {
  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <StudentRecordForm />
      <StudentRecordTable />
    </div>
  )
}

export default StudentRecord