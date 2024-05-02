import PropTypes from "prop-types";
import StudentDropdown from "../dropdowns/StudentDropdown";

const StudentRecordForm = ({
  handleStudentChange,
  formData,
  resetForm,
  setFormData,
}) => {
  const { studentName, classroom, contactPerson, email, contactNo, birthDate } =
    formData;
    
  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-md lg:max-w-6xl md:max-w-lg mt-20">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-left text-3xl font-bold mb-6 border-b-2 border-gray-300">
          Student Record
        </h2>
        <form className="space-y-6">
          <div className="sm:grid sm:grid-cols-2 sm:gap-x-6">
            <div className="mb-3">
              <StudentDropdown
                value={studentName}
                handleStudentChange={handleStudentChange}
                resetForm={resetForm}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="classroom"
                className="block text-sm font-medium text-gray-700"
              >
                Classroom
              </label>
              <input
                type="text"
                id="classroom"
                name="classroom"
                value={classroom}
                onChange={(e) => setFormData(e.target.value)}
                placeholder="Classroom"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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
                onChange={(e) => setFormData(e.target.value)}
                placeholder="Contact Person"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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
                onChange={(e) => setFormData(e.target.value)}
                placeholder="Email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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
                onChange={(e) => setFormData(e.target.value)}
                placeholder="Contact Number"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="text"
                id="birthDate"
                name="birthDate"
                placeholder="Birthday"
                value={birthDate}
                onChange={(e) => setFormData(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

StudentRecordForm.propTypes = {
  handleStudentChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default StudentRecordForm;
