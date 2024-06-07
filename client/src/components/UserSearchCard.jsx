import React from 'react'
import Avatar from './Avatar'

const UserSearchCard = ({ user }) => {
  return (
    <div className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-t-slate-200 hover:border rounded hover:border-primary cursor-pointer'>
      <div>
        <Avatar 
          width={50}
          height={50}
          name={user?.name}
        />
      </div>

      <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
          {user?.name}
        </div>
        <p>{user?.email}</p>
      </div>
    </div>
  )
}

export default UserSearchCard
