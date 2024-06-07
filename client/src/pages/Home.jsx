import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../redux/slices/userSlice'
import SIdebar from '../components/Sidebar'
import axios from 'axios';
import logo from '../assets/favicon.ico'

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const fetchUserDetails = async() => {
    try {
      const response = await axios({
        url : 'http://localhost:8080/api/v1/user-details',
        withCredentials : true
      });

      dispatch(setUser(response.data.data))

      if (response.data.data.logout) {
        dispatch(logout());
        navigate('/auth/email');
      }
    } catch (error) {
      toast.error('Не удалось получить данные о пользователе');
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const basePath = location.pathname === '/'

  return (
    <div className='grid grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <SIdebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div className='lg:flex justify-center items-center flex-col gap-2 hidden'>
        <div>
          <img 
            src={logo}
            alt='logo'
            width={60}
            height={60}
          />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Выбери пользователя с которым ты хочешь начать общение</p>
      </div>
    </div>
  )
}

export default Home
