import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/student/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/course-list' element={<CoursesList />}/>

        <Route path='/course-list/:input' element={<CoursesList />}/>

        <Route path='/course-list/:id' element={<CoursesDetails />}/>

        <Route path='/my-enrollments' element={<MyEnrollments />}/>

        <Route path='/player/:courseId' element={<Player />}/>

        <Route path='/loading/:path' element={<Loading />}/>

        <Route path='educator' element={<Educator />}>

          <Route path='/educator' element={<DashBoard />}/>

          <Route path='/add-course' element={<DashBoard />}/>


        </Route>

      </Routes>
    </div>
  )
}

export default App
