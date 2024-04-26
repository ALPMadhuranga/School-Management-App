import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import SubjectForm from "../components/subject/SubjectForm";
import SubjectTable from "../components/subject/SubjectTable";
import { validateSubjectForm } from "../validation/subjectFormValidation";

const Subject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [formErrors, setFormErrors] = useState({
    subjectName: "",
  });
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [subjectId, setSubjectId] = useState(null);

  const getAllSubject = () => {
    axios
      .get("/api/subjects/")
      .then((res) => {
        if (res.status === 200) {
          setSubjectDetails(res.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
      });
  };

  const getOneSubject = async (id) => {
    onClickReset();
    axios
      .get(`/api/subjects/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const subjectData = res.data;
          setSubjectName(subjectData.subjectName);
          setIsEditing(true);
          setSubjectId(id);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const addSubject = async (data) => {
    axios
      .post("/api/subjects/", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Recoed added successfully");
          onClickReset();
          getAllSubject();
        }
      })
      .catch((error) => {
        console.error("Error adding subject:", error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const updateSubject = async (data) => {
    axios
      .put(`/api/subjects/${subjectId}`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Recoed updated successfully");
          onClickReset();
          getAllSubject();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Something went wrong, try again!"
        );
      });
  };

  const deleteSubject = async (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            axios.delete(`/api/subjects/${id}`).then((res) => {
              if (res.status === 200) {
                toast.success("Recoed deleted successfully");
                getAllSubject();
              }
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
    getAllSubject();
  }, []);

  const onSubmit =(e) => {
    e.preventDefault();
    const errors = validateSubjectForm(subjectName)
    if (Object.keys(errors).length === 0) {
      if (isEditing) {
        updateSubject({subjectName});
      } else {
        addSubject({subjectName});
      }
    } else {
      setFormErrors(errors);
    }
  }

  const onClickReset = () => {
    setSubjectName("");
    setSubjectId(null);
    setIsEditing(false);
    setFormErrors({
      subjectName: "",
    })
  }

  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <SubjectForm 
        isEditing={isEditing}
        onSubmit={onSubmit}
        value={subjectName}
        setSubjectName={setSubjectName}
        onClickReset={onClickReset}
        formErrors={formErrors} />

      <SubjectTable 
        subjectDetails={subjectDetails}
        getOneSubject={getOneSubject}
        deleteSubject={deleteSubject} />
    </div>
  );
};

export default Subject;
