import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import { format } from "date-fns";
import StudentForm from "../components/student/StudentForm";
import StudentTable from "../components/student/StudentTable";
import { validateStudentForm } from "../validation/studentFormValidation";

const Student = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactPerson: "",
    contactNo: "",
    email: "",
    birthDate: "",
    age: "",
    classroom: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    contactPerson: "",
    contactNo: "",
    email: "",
    birthDate: "",
    age: "",
    classroom: "",
  });

  const [studentDetails, setStudentDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [studentId, setStudentId] = useState(null);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      contactPerson: "",
      contactNo: "",
      email: "",
      birthDate: "",
      age: "",
      classroom: "",
    });

    setFormErrors({
      firstName: "",
      lastName: "",
      contactPerson: "",
      contactNo: "",
      email: "",
      birthDate: "",
      age: "",
      classroom: "",
    });
  };

  const getAllStudents = useCallback(async () => {
    axios
      .get("/api/students")
      .then((res) => {
        if (res.status === 200) {
          const studentWithAge = res.data.map((student) => {
            const age = calculateAge(new Date(student.birthDate));
            return { ...student, age: age.toString() };
          });
          setStudentDetails(studentWithAge);
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        toast.error("Something went wrong, reload again!");
      });
  }, [setStudentDetails]);

  const getOneStudent = (id) => {
    resetForm();
    axios
      .get(`/api/students/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const studentData = res.data;
          setFormData({
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            contactPerson: studentData.contactPerson,
            contactNo: studentData.contactNo,
            email: studentData.email,
            birthDate: format(new Date(studentData.birthDate), "yyyy-MM-dd"),
            age: calculateAge(studentData.birthDate).toString(),
            classroom: studentData.classroom,
          });
          setIsEditing(true);
          setStudentId(id);
        } else {
          console.error("No data found for student with ID:", id);
          toast.error("Student details not found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
        toast.error("Something went wrong, try again!");
      });
  };

  const addStudent = (data) => {
    axios
      .post("/api/students/", data)
      .then((res) => {
        if (res.status === 201) {
          // Changed status check to 201 for created
          toast.success("Student added successfully!");
          resetForm();
          getAllStudents(); // Fetch updated student list
        }
      })
      .catch((error) => {
        console.error("Error adding student:", error);
        toast.error(
          error.response.data.message || "Something went wrong, reload again!"
        );
      });
  };

  const updateStudent = async (data) => {
    try {
      const res = await axios.put(`/api/students/${studentId}`, formData);
      if (res.status === 200) {
        toast.success("Student updated successfully!");
        resetForm();
        setIsEditing(false);
        setStudentId(null);
        getAllStudents();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };

  const deleteStudent = async (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this student?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await axios.delete(`/api/students/${id}`);
              if (response.status === 200) {
                toast.success("Student deleted successfully!");
                getAllStudents();
              }
            } catch (error) {
              console.log(error);
              toast.error("Something went wrong, try again!");
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing if user clicks "No"
          },
        },
      ],
    });
  };

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  // Calculate age when fetch data function
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const onChange = (e) => {
    let value = e.target.value;

    // If the field being updated is 'birthDay', calculate the age
    if (e.target.name === "birthDate") {
      const today = new Date();

      // Check if the selected date is valid
      if (value) {
        const birthDay = new Date(value);
        const age = today.getFullYear() - birthDay.getFullYear();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: value,
          age: age.toString(),
        }));
      } else {
        // If the selected date is empty or invalid, set age to an empty string
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: value,
          age: "",
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateStudentForm(formData);
    if (Object.keys(errors).length === 0) {
      if (isEditing) {
        updateStudent();
      } else {
        addStudent(formData);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const onClickReset = () => {
    resetForm();
    setIsEditing(false);
    setStudentId(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <StudentForm
        formData={formData}
        isEditing={isEditing}
        onChange={onChange}
        onSubmit={onSubmit}
        onClickReset={onClickReset}
        formErrors={formErrors}
      />

      <StudentTable
        studentDetails={studentDetails}
        getOneStudent={getOneStudent}
        deleteStudent={deleteStudent}
      />
    </div>
  );
};

export default Student;
