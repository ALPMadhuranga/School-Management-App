import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import AllocateClassroomForm from '../components/allocateClassroom/AllocateClassroomForm'
import AllocateClassroomTable from '../components/allocateClassroom/AllocateClassroomTable'
import { validateAllocateClassroomForm } from '../validation/allocateClassroomFormValidation'

const AllocateClassroom = () => {
  const [formData, setFormData] = useState({
    teacher: "",
    classroom: "",
  });
  const [formErrors, setFormErrors] = useState({
    teacher: "",
    classroom: "",
  });
  const [allocateClassroom, setAllocateClassroom] = useState([]);

  const getAllAllocateClassroom = () => {
    axios
      .get("/api/allocate-classrooms/")
      .then((res) => {
        if (res.status === 200) {
          setAllocateClassroom(res.data);
          console.log(allocateClassroom);
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        toast.error("Something went wrong, try again!");
      });
  };

  const addAllocateClassroom = async (data) => {
    axios
      .post("/api/allocate-classrooms/", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Record added successfully");
          resetForm();
          getAllAllocateClassroom();
        }
      })
      .catch((error) => {
        console.error("Error adding teachers:", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const deleteAllocateClassroom = async (id) => {
    confirmAlert({
      title: "Confirm to Deactivate",
      message: "Are you sure you want to deactivate that record?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios
              .delete(`/api/allocate-classrooms/${id}`)
              .then((res) => {
                if (res.status === 200) {
                  toast.success("Record deactivated successfully");
                  getAllAllocateClassroom();
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
    getAllAllocateClassroom();
  }, []);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateAllocateClassroomForm(formData);
    if (Object.keys(errors).length === 0) {
      addAllocateClassroom(formData);
    } else {
      setFormErrors(errors);
    }
  };

  const resetForm = () => {
    setFormData({
      teacher: "",
      classroom: "",
    });
    setFormErrors({
      teacher: "",
      classroom: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <AllocateClassroomForm 
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        formErrors={formErrors}
      />

      <AllocateClassroomTable 
        allocateClassroom={allocateClassroom}
        deleteAllocateClassroom={deleteAllocateClassroom}
      />
    </div>
  )
}

export default AllocateClassroom