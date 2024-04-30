import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ClassroomDropdown from "../dropdowns/ClassroomDropdown";
import PropTypes from "prop-types";

const StudentForm = ({
  formData,
  isEditing,
  onChange,
  onSubmit,
  onClickReset,
  formErrors,
}) => {
  const {
    firstName,
    lastName,
    contactPerson,
    contactNo,
    email,
    birthDate,
    age,
    classroom,
  } = formData;

  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-md lg:max-w-6xl md:max-w-lg mt-20">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-left text-3xl font-bold mb-6 border-b-2 border-gray-300">
          {isEditing ? "Edit Student" : "Add Student"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="sm:grid sm:grid-cols-2 sm:gap-x-6">
            <div className="mb-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={onChange}
                placeholder="First Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formErrors.firstName}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={onChange}
                placeholder="Last Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formErrors.lastName}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="contactPerson"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={contactPerson}
                onChange={onChange}
                placeholder="Contact Person"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formErrors.contactPerson}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNo"
                name="contactNo"
                value={contactNo}
                onChange={onChange}
                placeholder="Contact Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formErrors.contactNo}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formErrors.email}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={birthDate}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formErrors.birthDate}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={onChange}
                placeholder="Age"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formErrors.age}
              </div>
            </div>

            <div className="mb-3">
              <ClassroomDropdown
                value={classroom}
                onChange={onChange}
                formErrors={formErrors}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isEditing ? "Update" : "Save"}
            </button>
            {isEditing && (
              <button
                onClick={onClickReset}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

StudentForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
};

export default StudentForm;
