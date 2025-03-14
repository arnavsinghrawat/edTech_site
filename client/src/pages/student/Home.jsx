import React from 'react'
import Hero from '../../components/student/Hero';
import Companies from '../../components/student/Companies';

const Home = () => {
  console.log("home page is rendered");
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <Companies/>
    </div>
  )
}

export default Home
