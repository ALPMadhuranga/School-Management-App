import React from 'react'

const SubjectForm = () => {

    // const { classroom } = formData;

  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-md lg:max-w-6xl md:max-w-lg mt-20">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 className="text-left text-3xl font-bold mb-6 border-b-2 border-gray-300">
        Add Subject
      </h2>
      <form className="space-y-6">
        <div className="sm:grid sm:grid-cols-2 sm:gap-x-6">
          <div className="mb-2">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
            //   value={subject}
            //   onChange={onChange}
              placeholder="Enter subject"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
          {/* <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2' >Cancel</button> */}
        </div>
      </form>
    </div>
  </div>
  )
}

export default SubjectForm