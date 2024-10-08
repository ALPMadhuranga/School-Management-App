import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import StudentRecord from "./pages/StudentRecord";
import Student from "./pages/Student";
import Classroom from "./pages/Classroom";
import Teacher from "./pages/Teacher";
import Subject from "./pages/Subject";
import AllocateClassroom from "./pages/AllocateClassroom";
import AllocateSubject from "./pages/AllocateSubject";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='' element={<PrivateRoutes />}>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<StudentRecord />} />
        <Route path="/student" element={<Student />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/teacher" element={<Teacher />}/>
        <Route path="/subject" element={<Subject />}/>
        <Route path="/allocate-subject" element={<AllocateSubject />}/>
        <Route path="/allocate-classroom" element={<AllocateClassroom />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      </>
    )
  );

  return (
  <>
  <RouterProvider router={router} />
  <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
  </>

)
}

export default App;
