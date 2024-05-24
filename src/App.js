import "./App.css";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {Route,Routes,useNavigate} from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import VerfiyEmail from "./pages/VerfiyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import { ACCOUNT_TYPE } from "./utils/constant";
import AddCourse from "./components/core/Dashboard/AddCourse"
import Settings from "./components/core/Dashboard/Settings";
import MyCourses from "./components/core/Dashboard/MyCourses"
import EditCourse from "./components/core/Dashboard/EditCourse"
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails";
import Cart from "./components/core/Dashboard/Cart"
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import { getUserDetails } from "./services/operations/profileAPI"
import Footer from "./components/common/Footer"


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} =useSelector((state) =>state.profile)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route path="courses/:courseId" element={<CourseDetails/>} />
    


      <Route path="/signup"
      element={
     //   <OpenRoute>
        <Signup/>
   //   </OpenRoute>
    }
  />
<Route
    path="/login"
    element={
      //
        <Login />
      //</OpenRoute>
    }
  />
  <Route path="/about"
  element={
    <About/>
  }
  />
  <Route path="/contact"
  element={
    <Contact/>
  }
  />
  <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        /> 
        <Route path="verify-email"
element={
  <VerfiyEmail/>

}
    />
     <Route 
      element={
      //  <PrivateRoute>
          <Dashboard />
       // </PrivateRoute>
      }
      >
        <Route path="dashboard/my-profile" element={<MyProfile />} />
      <Route path="dashboard/Settings" element={<Settings />} />



       
       {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
      <Route path="dashboard/cart" element={<Cart />} />

               <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
         
          </>
        )
      }
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />


  {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/add-course" element={<AddCourse />} />
          
          </>
        )
      }
          </Route>

<Route element={<ViewCourse/>}>
{user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )} 
</Route>

    


  
</Routes>
<Footer/>
   </div>
  );
}

export default App;
