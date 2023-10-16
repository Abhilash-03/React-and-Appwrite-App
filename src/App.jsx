import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';

function App() {
  const [isloading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
      authService.getCurrentUser()
       .then((userData) => {
        if(userData){
          dispatch(login({userData}));
        } else{
          dispatch(logout());
        }
       })
       .finally(()=> setIsLoading(false))
  }, [])

  return !isloading && <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main className='py-8'>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
}

export default App
