import React, { useContext } from 'react'
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { SignIn, useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const {navigate,isEducator,setIsEducator,backendUrl,getToken} = useContext(AppContext)
  const isCourseListPage = location.pathname.includes('/course-list');

  const clerk = useClerk();
  console.log('Clerk object:', clerk);

  
  const {openSignIn} = useClerk(); // this function is to
  // use clerk to sign in we are using destructuring to 
  // obtain opensignin from the many things useClerk() gives
  const {user} = useUser();

  const becomeEducator = async () => {
    try {
      if(isEducator)
      {
        navigate('/educator')
        return;
      }
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/update-role',
        {headers: {Authorization: `Bearer ${token}`}}
      )

      if(data.success)
      {
        setIsEducator(true)
        toast.success(data.message)
      }else
      {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14
    lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>

      <img src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' onClick={()=> navigate('/')}/>

      <div className='hidden md:flex items-centre gap-5
       text-gray-500'>

        <div className='flex items-center gap-5'>

          {user && 
          <>
          <button onClick={becomeEducator}>{isEducator ? 'Educator DashBoard' : 'Become Educator'}</button>
          | <Link to='/my-enrollments'>My Enrollments</Link>
          </>}
          {/* reason for <> is as react component must return a single component */}
        </div>

        {/* if the user is already signed in then show user button that we have
        imported from clerk other sho for sign up button */}
         
        {user ? <UserButton/> :      
        <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-5 py-2 
        rounded-full'>Create Account</button>}

        {/* the openSignIn function pops ups the clerk sign in window */}

      </div>

      {/* for phone screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
        {user && 
          <>
          <button onClick={becomeEducator}>{isEducator ? 'Educator DashBoard' : 'Become Educator'}</button>
          | <Link to='/my-enrollments'>My Enrollments</Link>
          </>}
        </div>
        {
          user ? <UserButton/> : <button onClick={() => openSignIn()}><img src={assets.user_icon} alt="user logo" /></button>
        }
        
      </div> 
    </div>
  );
}

export default Navbar
