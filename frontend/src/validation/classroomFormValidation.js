export const validateClassroomForm = (className) => {
  const errors = {};

  if (!className.trim()) {
    errors.className = "First name is required";
  } else if (!isValidClassroom(className)) {
    errors.className =
      "Invalid format. The accepted format should be similar to 'Grade 1A'.";
  }

  return errors;
};

const isValidClassroom = (className) => {
  const ClassroomRegex = /^(Grade\s\d+[A-Za-z])$/;
  return ClassroomRegex.test(className);
};
