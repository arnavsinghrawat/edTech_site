import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';

const MyCourses = () => {

  const {currency, allCourse} = useContext(AppContext)
  
  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    setCourses(allCourse)
  }

  useEffect(() => {
    fetchEducatorCourses(),
    []
  })


  return (
    <div>
      <h1>Educator Courses</h1>
    </div>
  );
}

export default MyCourses
