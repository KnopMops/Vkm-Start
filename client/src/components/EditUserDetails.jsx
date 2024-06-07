import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import { uploadFileToCloud } from '../helpers/uploadFile'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/userSlice'

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name : user?.user,
    profile_pic : user?.profile_pic
  });

  const uploadPhotoRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        ...user
      };
    });
  }, [user]);

  const handleChange = (e) => {
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

    setData((prev) => {
      return {
        ...prev,
        profile_pic : uploadPhoto?.url
      }
    });
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await axios({
        method : 'post',
        url : 'http://localhost:8080/api/v1/update-user',
        data : data,
        withCredentials : true
      });
      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
      <div className='bg-white p-4 py-5 m-1 rounded w-full max-w-sm'>
        <h2 className='font-semibold'>Данные</h2>
        
        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Имя</label>
            <input 
              type='text'
              name='name'
              id='name'
              value={data.name}
              onChange={handleChange}
              className='w-full py-1 px-2 focus:outline-primary border-0.5'
            />
          </div>

          <div>
              <div>Фото :</div>
              <div className='my-1 flex items-center gap-3'>
                <Avatar
                  width={40}
                  height={40}
                  imageUrl={data?.profile_pic}
                  name={data?.name}
                />

                <label htmlFor='profile_pic'>
                  <button className='font-semibold' onClick={handleOpenUploadPhoto}>Изменить фотографию</button>
                  <input
                    type='file'
                    id='profile_pic'
                    className='hidden'
                    onChange={handleUploadPhoto}
                    ref={uploadPhotoRef}
                  />
                </label>
              </div>
          </div>

          <div className='flex gap-2 w-fit ml-auto'>
            <button onClick={onClose} className='border border-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white'>Выйти</button>
            <button onClick={handleSubmit} className='border border-green-500 px-4 py-1 rounded hover:bg-green-500 hover:text-white'>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(EditUserDetails)
