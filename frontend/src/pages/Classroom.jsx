import React from 'react'
import ClassroomForm from '../components/classroom/ClassroomForm'
import ClassroomTable from '../components/classroom/ClassroomTable'

const Classroom = () => {
  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <ClassroomForm />
      <ClassroomTable />
    </div>
  )
}

export default Classroom