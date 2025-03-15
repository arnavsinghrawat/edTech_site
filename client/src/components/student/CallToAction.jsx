import React from 'react'
import { assets } from '../../assets/assets';

const CallToAction = () => {
  return (
    <div>
      <h1 className=''>Learn anything anytime anywhere</h1>
      <p className="text-lg text-gray-600 mb-3">
        Take your learning journey to the next level with our comprehensive online courses
      </p>
      <p className="text-gray-500 max-w-2xl mx-auto">
        Join thousands of students worldwide and gain access to expert-led courses, 
        hands-on projects, and a supportive learning community.
      </p>
      <div>
        <button>Get Started</button>
        <button>Learn more <img src={assets.arrow_icon} alt="arrow icon" /></button>
      </div>
    </div>
  );
}

export default CallToAction
