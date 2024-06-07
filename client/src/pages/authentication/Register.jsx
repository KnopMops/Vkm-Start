import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import { uploadFileToCloud } from '../../helpers/uploadFile'

const Register = () => {
  const [data, setData] = useState({
    name : '',
    email : '',
    password : '',
    profile_pic : ''
  });

  const [uploadPhoto, setUploadPhoto] = useState('');
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

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFileToCloud(file);
    setUploadPhoto(file)

    setData((prev) => {
      return {
        ...prev,
        profile_pic : uploadPhoto?.url
      }
    });
  };

  const handleClearPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadPhoto(null);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/register', data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name : '',
          email : '',
          password : '',
          profile_pic : ''
        });

        navigate('/auth/email');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-sm rounded overflow-hidden p-4 md:mx-auto'>
        <h3 className='text-primary'>Добро пожаловать в Вместе с Км</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Имя :</label>
            <input 
              type='text'
              id='name'
              name='name'
              placeholder='имя...'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

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

          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>
              Аватар : 
              <div className='h-14 bg-slate-200 flex justify-center items-center rounded border hover:border-primary pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {
                    uploadPhoto?.name ? uploadPhoto?.name : 'Загрузить изображение профиля'
                  }
                </p>
                {
                  uploadPhoto?.name && (
                    <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearPhoto}>
                      <IoClose />
                    </button>
                  )
                }
              </div>
            </label>

            <input 
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
              onChange={handleUploadPhoto}
            />
          </div>

          <button
            className='bg-primary text-lg text-white px-4 py-1 hover:bg-secondary rounded mt-2 font-bold leading-relaxed tracking-wide'
          >
            Зарегистрироваться
          </button>
        </form>

        <p className='my-3 text-center'>Уже есть аккаунт ? <Link to={'/auth/email'} className='font-semibold text-primary hover:underline'>Войти</Link></p>
      </div>
    </div>
  )
}

export default Register
