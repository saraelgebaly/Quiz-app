import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Modules/SharedModule/Components/AuthLayout";
import NotFound from "./Modules/SharedModule/Components/NotFound";
import Login from "./Modules/Authentication/Components/Login";
import Register from "./Modules/Authentication/Components/Register";
import ForgetPassword from "./Modules/Authentication/Components/ForgetPassword";
import ResetPassword from "./Modules/Authentication/Components/ResetPassword";
import ProtectedRoute from "./Modules/SharedModule/Components/ProtectedRoute";
import MasterLayout from "./Modules/SharedModule/Components/MasterLayout";
import Dashboard from "./Modules/Dashboard/Components/Dashboard";
import Groups from "./Modules/GroupsModule/Components/Groups";
import Questions from "./Modules/QuestionsModule/Components/Questions";
import Quizes from "./Modules/QuizModule/Components/Quizes";
import Students from "./Modules/StudentsModule/Components/Students";
import { ToastContainer } from "react-toastify";
import QuizzesDetails from "./Modules/QuizModule/Components/QuizzesDetails";
import Results from "./Modules/ResultsModule/Components/Results";
import ResultsTutor from "./Modules/ResultsModule/Components/ResultsTutor";
import ResultsDetails from "./Modules/ResultsModule/Components/ResultsDetails";
import ExamQuestions from "./Modules/ExamQuestionsModule.tsx/ExamQuestions";
import InstructorProtectedRoute from "./Modules/SharedModule/Components/InstructorProtectedRoute";
import StudentProtectedRoute from "./Modules/SharedModule/Components/StudentProtectedRoute";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpass", element: <ForgetPassword /> },
        { path: "resetpass", element: <ResetPassword /> },
      ],
    },
    {
      path: "dashboard",

      element: (
        <ProtectedRoute>
          <MasterLayout />,
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: (
            <InstructorProtectedRoute>
              <Dashboard />
            </InstructorProtectedRoute>
          ),
        },
        {
          path: "groups",
          element: (
            <InstructorProtectedRoute>
              <Groups />
            </InstructorProtectedRoute>
          ),
        },
        {
          path: "questions",
          element: (
            <InstructorProtectedRoute>
              <Questions />
            </InstructorProtectedRoute>
          ),
        },
        { path: "quizes", element: <Quizes /> },
        {
          path: "quiz-details/:id",
          element: (
            <InstructorProtectedRoute>
              <QuizzesDetails />
            </InstructorProtectedRoute>
          ),
        },
        {
          path: "exam-questions/:id",
          element: (
            <StudentProtectedRoute>
              <ExamQuestions />
            </StudentProtectedRoute>
          ),
        },
        {
          path: "student",
          element: (
            <InstructorProtectedRoute>
              <Students />
            </InstructorProtectedRoute>
          ),
        },
        {
          path: "results",
          element: <Results />,
          children: [
            {
              path: "",
              element: (
                <InstructorProtectedRoute>
                  <ResultsTutor />
                </InstructorProtectedRoute>
              ),
            },
            {
              path: "results-details",
              element: (
                <InstructorProtectedRoute>
                  <ResultsDetails />
                </InstructorProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <div className="App">
        <ToastContainer theme="dark" />
        <RouterProvider router={routes} />
      </div>
    </>
  );
}

export default App;
