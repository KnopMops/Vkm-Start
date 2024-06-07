import React, { useState } from 'react'
import { IoChatbubbleEllipses } from 'react-icons/io5'
import { FaUserPlus } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import Avatar from './Avatar'
import EditUserDetails from './EditUserDetails'
import { FiArrowUpLeft } from 'react-icons/fi'
import SearchUser from './SearchUser'

const SIdebar = () => {
  const user = useSelector(state => state?.user);
  const [ editUserOpen, setEditUserOpen ] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
      <div className="bg-slate-800 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-400 flex flex-col justify-between">
        <div>
          <NavLink to='/' title='chat' className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-900 rounded ${isActive && 'bg-slate-900'}`}>
            <IoChatbubbleEllipses size={20} />
          </NavLink>

          <div title='add friend' onClick={() => setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-900 rounded'>
            <FaUserPlus size={20} />
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <button className='mx-auto' title={user?.name} onClick={() => setEditUserOpen(true)}>
            <Avatar 
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
            />
          </button>

          <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-900 rounded'>
            <span className='-ml-2'>
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className='w-full'>
        <div className='h-16 flex items-center'>
          <h2 className='text-xl font-bold p-2 text-slate-800'>Контакты</h2>
        </div>
        <div className='bg-slate-200 p-[0.5px]'></div>

        <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-scroll scrollbar'>
          {
            allUser.length === 0 && (
              <div className='mt-5'>
                <div className='flex justify-center items-center my-4 text-slate-500'>
                  <FiArrowUpLeft
                    size={50}
                  />
                </div>
                <p className='text-lg text-center text-slate-400'>Выберите пользователя и начните общение с ним.</p>
              </div>
            )
          }
        </div>
      </div>

      {
        editUserOpen && (
          <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
        )
      }

      {
        openSearchUser && (
          <SearchUser onClose={() => setOpenSearchUser(false)} />
        )
      }
    </div>
  )
}

export default SIdebar
