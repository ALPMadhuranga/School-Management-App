import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import AllocateSubjectForm from "../components/allocateSubject/AllocateSubjectForm";
import AllocateSubjectTable from "../components/allocateSubject/AllocateSubjectTable";
import { validateAllocateSubjectForm } from "../validation/allocateSubjectFormValidation";

const AllocateSubject = () => {
  const [formData, setFormData] = useState({
    teacher: "",
    subject: "",
  });
  const [formErrors, setFormErrors] = useState({
    teacher: "",
    subject: "",
  });
  const [allocateSubject, setAllocateSubject] = useState([]);

  const getAllAllocateSubjects = () => {
    axios
      .get("/api/allocate-subjects/")
      .then((res) => {
        if (res.status === 200) {
          setAllocateSubject(res.data);
          // console.log(allocateSubject);
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        toast.error("Something went wrong, try again!");
      });
  };

  const addAllocateSubject = async (data) => {
    axios
      .post("/api/allocate-subjects/", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Record added successfully");
          resetForm();
          getAllAllocateSubjects();
        }
      })
      .catch((error) => {
        console.error("Error adding teachers:", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const deleteAllocateSubject = async (id) => {
    confirmAlert({
      title: "Confirm to Deactivate",
      message: "Are you sure you want to deactivate that record?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios
              .delete(`/api/allocate-subjects/${id}`)
              .then((res) => {
                if (res.status === 200) {
                  toast.success("Record deleted successfully");
                  getAllAllocateSubjects();
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
    getAllAllocateSubjects();
  }, []);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateAllocateSubjectForm(formData);
    if (Object.keys(errors).length === 0) {
      addAllocateSubject(formData);
    } else {
      setFormErrors(errors);
    }
  };

  const resetForm = () => {
    setFormData({
      teacher: "",
      subject: "",
    });
    setFormErrors({
      teacher: "",
      subject: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <AllocateSubjectForm
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        formErrors={formErrors}
      />

      {allocateSubject && allocateSubject.length > 0 && (
        <AllocateSubjectTable
          allocateSubject={allocateSubject}
          deleteAllocateSubject={deleteAllocateSubject}
        />
      )}
    </div>
  );
};

export default AllocateSubject;
