import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import UserSearchCard from './UserSearchCard'
import toast from 'react-hot-toast'
import Loading from './Loading'
import axios from 'axios'

const SearchUser = () => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchUser = async() => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/search-user', {
        search: search
      });
      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2'>
      <div className='w-full max-w-lg mx-auto mt-10 '>
        <div className='bg-white rounded h-14 overflow-hidden flex'>
          <input 
            type='text'
            placeholder='Поиск пользователей по имени или почте....'
            className='w-full outline-none py-1 h-full px-4'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className='h-14 w-14 flex justify-center items-center'>
            <IoSearchOutline size={25} />
          </div>
        </div>

        <div className="bg-white mt-2 w-full p-4 rounded">
          {
            searchUser.length === 0 && !loading && (
              <p className='text-center text-slate-500'>Мы не нашли пользователей по вашему запросу.</p>
            )
          }

          {
            loading && (
              <p>
                <Loading />
              </p>
            )
          }

          {
            searchUser.length !== 0 && !loading && (
              searchUser.map((user, index) => {
                return (
                  <UserSearchCard key={user._id} user={user} />
                )
              })
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SearchUser
