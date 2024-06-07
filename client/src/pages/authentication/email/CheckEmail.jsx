import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { PiUserCircle } from 'react-icons/pi'

import axios from 'axios';

const CheckEmail = () => {
  const [data, setData] = useState({
    email : '',
  });
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:8080/api/v1/email', data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          email : '',
        });

        navigate('/auth/password', {
          state : response?.data?.data
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-sm rounded overflow-hidden p-4 md:mx-auto'>
        <div className='w-fit mx-auto mb-2'>
          <PiUserCircle
            width={80}
            height={80}
          />
        </div>

        <h3 className='text-primary'>Пожалуйста, укажите почту, чтобы вы могли войти в свой аккаунт</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Почта :</label>
            <input 
              type='email'
              id='email'
              name='email'
              placeholder='почта...'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-primary text-lg text-white px-4 py-1 hover:bg-secondary rounded mt-2 font-bold leading-relaxed tracking-wide'
          >
            Продолжить
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckEmail
