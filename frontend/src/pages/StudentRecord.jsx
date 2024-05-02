import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import StudentRecordForm from "../components/studentRecord/StudentRecordForm";
import StudentRecordTable from "../components/studentRecord/StudentRecordTable";

const StudentRecord = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    classroom: "",
    contactPerson: "",
    contactNo: "",
    email: "",
    birthDate: "",
  });
  const [teacherAndSubjectDetails, setTeacherAndSubjectDetails] = useState([]);

  // const handleStudentChange = async (selectedStudentId) => {
  //   resetForm();
  //   try {
  //     const response = await axios.get(`/api/students/${selectedStudentId}`);
  //     if (response.status === 200) {
  //       const studentData = response.data;
  //       console.log(studentData);
  //       const classroomDetails = studentData.allocatedClassroom
  //         ? studentData.allocatedClassroom
  //         : "";
  //       // console.log(classroomDetails)

  //       setFormData({
  //         classroom: classroomDetails,
  //         contactPerson: studentData.contactPerson,
  //         contactNo: studentData.contactNo,
  //         email: studentData.email,
  //         birthDate: format(new Date(studentData.birthDate), "yyyy-MM-dd"),
  //       });
  //       setTeacherAndSubjectDetails(response.data);
  //       // console.log(teacherAndSubjectDetails)
  //     }
  //   } catch (error) {
  //     console.error("Error fetching student data:", error);
  //   }
  // };

  const handleStudentChange = async (selectedStudentId) => {
    resetForm();
    try {
      const response = await axios.get(`/api/students/${selectedStudentId}`);
      if (response.status === 200) {
        const studentData = response.data[0]; 
        console.log(studentData);
        const classroomDetails = studentData.allocatedClassroom
          ? studentData.allocatedClassroom
          : "";
        console.log(classroomDetails)
  
        setFormData({
          classroom: classroomDetails,
          contactPerson: studentData.contactPerson,
          contactNo: studentData.contactNo,
          email: studentData.email,
          birthDate: format(new Date(studentData.birthDate), "yyyy-MM-dd"),
        });
        
        // Set teacherAndSubjectDetails only if allocatedClassroom is available
        // if (studentData.allocatedClassroom) {
          setTeacherAndSubjectDetails(response.data);
          // console.log(teacherAndSubjectDetails)
        // } else {
        //   setTeacherAndSubjectDetails([]);
        // }
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };  

  const resetForm = () => {
    setFormData({
      classroom: "",
      contactPerson: "",
      email: "",
      contactNo: "",
      birthDate: "",
    });
    setTeacherAndSubjectDetails([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen justify-center py-10 sm:px-6 lg:px-8">
      <StudentRecordForm
        handleStudentChange={handleStudentChange}
        formData={formData}
        resetForm={resetForm}
        setFormData={setFormData}
      />
      <StudentRecordTable teacherAndSubjectDetails={teacherAndSubjectDetails} />
    </div>
  );
};

export default StudentRecord;