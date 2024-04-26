import TeacherDropdown from "../dropdowns/TeacherDropdown";
import SubjectDropdown from "../dropdowns/SubjectDropdown";
import PropTypes from "prop-types";

const AllocateSubjectForm = ({ onSubmit, onChange, formData, formErrors }) => {
  const { teacher, subject } = formData;

  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-md lg:max-w-6xl md:max-w-lg mt-20">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-left text-3xl font-bold mb-6 border-b-2 border-gray-300">
          Allocate Subject
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="sm:grid sm:grid-cols-2 sm:gap-x-6">
            <div className="mb-3">
              <TeacherDropdown 
                value={teacher}
                onChange={onChange}
                formErrors={formErrors}
              />
            </div>

            <div className="mb-3">
              <SubjectDropdown 
                value={subject}
                onChange={onChange}
                formErrors={formErrors}
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
          </div>
        </form>
      </div>
    </div>
  );
};

AllocateSubjectForm.propTypes = {
  formData: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AllocateSubjectForm;
