import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../components/Avatar'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../redux/slices/userSlice';

import axios from 'axios';

const CheckPassword = () => {
  const [data, setData] = useState({
    password : '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) navigate('/auth/email');
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name] : value
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await axios({
        method : 'post',
        url : 'http://localhost:8080/api/v1/password',
        data : {
          userId : location?.state?._id,
          password : data.password
        },
        withCredentials : true
      });
      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem('token', response?.data?.token);

        setData({
          password : '',
        });

        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-sm rounded overflow-hidden p-4 md:mx-auto'>
        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
        </div>

        <h3 className='text-primary'>Пожалуйста, укажите пароль, чтобы вы могли войти в свой аккаунт</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Пароль :</label>
            <input 
              type='password'
              id='password'
              name='password'
              placeholder='пароль...'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-primary text-lg text-white px-4 py-1 hover:bg-secondary rounded mt-2 font-bold leading-relaxed tracking-wide'
          >
            Войти
          </button>

          <p className='my-3 text-center'>Забыли пароль ? <Link to={'/auth/forgot-password'} className='font-semibold text-primary hover:underline'>Сбросить его</Link></p>
        </form>
      </div>
    </div>
  )
}

export default CheckPassword
