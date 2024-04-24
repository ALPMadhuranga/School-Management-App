import React from 'react'
import AllocateClassroomForm from '../components/allocateClassroom/AllocateClassroomForm'
import AllocateClassroomTable from '../components/allocateClassroom/AllocateClassroomTable'

const AllocateClassroom = () => {
  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <AllocateClassroomForm />
      <AllocateClassroomTable />
    </div>
  )
}

export default AllocateClassroom