import React from 'react'
import AllocateSubjectForm from '../components/allocateSubject/AllocateSubjectForm'
import AllocateSubjectTable from '../components/allocateSubject/AllocateSubjectTable'

const AllocateSubject = () => {
  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <AllocateSubjectForm />
      <AllocateSubjectTable />
    </div>
  )
}

export default AllocateSubject