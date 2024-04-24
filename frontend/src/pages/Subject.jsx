import React from 'react'
import SubjectForm from '../components/subject/SubjectForm'
import SubjectTable from '../components/subject/SubjectTable'

const Subject = () => {
  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <SubjectForm />
      <SubjectTable />
    </div>
  )
}

export default Subject