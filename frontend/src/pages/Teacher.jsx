import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import TeacherForm from "../components/teacher/TeacherForm";
import TeacherTable from "../components/teacher/TeacherTable";
import { teacherFormValidation } from "../validation/teacherFormValidation";

const Teacher = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
  });

  const [teacherDetails, setTeacherDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      contactNo: "",
      email: "",
    });

    setFormErrors({
      firstName: "",
      lastName: "",
      contactNo: "",
      email: "",
    });
  };

  const getAllTeachers = () => {
    axios
      .get("/api/teachers/")
      .then((res) => {
        if (res.status === 200) {
          setTeacherDetails(res.data.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching teacher: ", error);
        toast.error("Something went wrong, reload again!");
      });
  };

  const getSingleTeacher = (id) => {
    resetForm();
    axios
      .get(`/api/teachers/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const teacherData = res.data;
          setFormData({
            firstName: teacherData.firstName,
            lastName: teacherData.lastName,
            contactNo: teacherData.contactNo,
            email: teacherData.email,
          });
          setIsEditing(true);
          setEditingTeacherId(id);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const addTeacher = async (data) => {
    axios
      .post("/api/teachers/", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Teacher added successfully");
          resetForm();
          getAllTeachers();
        }
      })
      .catch((error) => {
        console.log("Error adding teacher: ", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };
  
  const updateTeacher = async (formData) => {
    axios
      .put(`/api/teachers/${editingTeacherId}`, formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Teacher updated successfully");
          resetForm();
          setIsEditing(false);
          setEditingTeacherId(null);
          getAllTeachers();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const deleteTeacher = async (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message:
        "Deleting this teacher will result in the loss of allocate subject and classroom details. Are you sure",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios
              .delete(`/api/teachers/${id}`)
              .then((res) => {
                if (res.status === 200) {
                  toast.success("Teacher deleted successfully");
                  getAllTeachers();
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error(
                  error.response.data.message ||
                    "Something went wrong, try again!"
                );
              });
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
    getAllTeachers();
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = teacherFormValidation(formData);

    if (Object.keys(errors).length === 0) {
      if (isEditing) {
        updateTeacher(formData);
      } else {
        addTeacher(formData);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const onClickReset = () => {
    resetForm();
    setIsEditing(false);
    setEditingTeacherId(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <TeacherForm
        formData={formData}
        isEditing={isEditing}
        onChange={onChange}
        onSubmit={onSubmit}
        onClickReset={onClickReset}
        formErrors={formErrors}
      />
      <TeacherTable
        teacherDetails={teacherDetails}
        getSingleTeacher={getSingleTeacher}
        deleteTeacher={deleteTeacher}
      />
    </div>
  );
};

export default Teacher;
