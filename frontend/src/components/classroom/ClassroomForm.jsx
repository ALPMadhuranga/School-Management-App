import PropTypes from 'prop-types';

const ClassroomForm = ({
  isEditing,
  onSubmit,
  value,
  setClassroomName,
  onClickReset,
  formErrors,
}) => {

  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-md lg:max-w-6xl md:max-w-lg mt-20">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 className="text-left text-3xl font-bold mb-6 border-b-2 border-gray-300">
        {isEditing ? 'Edit Classroom' : 'Add Classroom'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="sm:grid sm:grid-cols-2 sm:gap-x-6">
          <div className="mb-2">
            <label
              htmlFor="classroom"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Classroom
            </label>
            <input
              type="text"
              id="classroomName"
              name="classroomName"
              value={value}
              placeholder="Enter classroom"
              required
              onChange={(e) => setClassroomName(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="mt-2 text-sm text-red-600 dark:text-red-500">{formErrors.classroomName}</div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? 'Save' : 'Add'}
          </button>
          {isEditing && (
          <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2' onClick={onClickReset} >Cancel</button>
          )}
        </div>
      </form>
    </div>
  </div>
  )
}

ClassroomForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  setClassroomName: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
}

export default ClassroomForm