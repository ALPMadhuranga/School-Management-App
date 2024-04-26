import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import ClassroomForm from "../components/classroom/ClassroomForm";
import ClassroomTable from "../components/classroom/ClassroomTable";
import { validateClassroomForm } from "../validation/classroomFormValidation";

const Classroom = () => {
  const [classroomName, setClassroomName] = useState("");
  const [formErrors, setFormErrors] = useState({
    classroomName: "",
  });
  const [classroomDetails, setClassroomDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [classroomId, setClassroomId] = useState(null);

  const getAllClassrooms = () => {
    axios
      .get("/api/classrooms/")
      .then((res) => {
        if (res.status === 200) {
          setClassroomDetails(res.data.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching classrooms: ", error);
      });
  };

  const getOneClassroom = async (id) => {
    onClickReset();
    axios
      .get(`/api/classrooms/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const classroomDetails = res.data;
          setClassroomName(classroomDetails.classroomName);
          setIsEditing(true);
          setClassroomId(id);
        }
      })
      .catch((error) => {
        console.log("Error fetching classroom: ", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const onClickReset = () => {
    setClassroomName("");
    setClassroomId(null);
    setIsEditing(false);
    setFormErrors({
      classroomName: "",
    });
  };

  const addClassroom = async (data) => {
    axios
      .post("/api/classrooms/", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Record added successfully!");
          onClickReset(); // Reset form fields
          getAllClassrooms(); // Update data table with latest data
        }
      })
      .catch((error) => {
        console.log("Error adding classroom: ", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };
  

  const updateClassroom = async (data) => {
    axios
      .put(`/api/classrooms/${classroomId}`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Record updated successfully!");
          onClickReset();
          getAllClassrooms();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const deleteClassroom = async (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios
              .delete(`/api/classrooms/${id}`)
              .then((res) => {
                if (res.status === 200) {
                  toast.success("Record deleted successfully!");
                  getAllClassrooms();
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
    getAllClassrooms();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateClassroomForm(classroomName);
    if (Object.keys(errors).length === 0) {
      if (isEditing) {
        updateClassroom({ classroomName });
      } else {
        addClassroom({ classroomName });
      }
    } else {
      setFormErrors(errors);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <ClassroomForm 
      isEditing = {isEditing}
      onSubmit={onSubmit}
      value={classroomName}
      setClassroomName={setClassroomName}
      onClickReset={onClickReset}
      formErrors={formErrors} />

      <ClassroomTable 
      classroomDetails = {classroomDetails}
      getOneClassroom = {getOneClassroom}
      deleteClassroom = {deleteClassroom} />
    </div>
  );
};

export default Classroom;
