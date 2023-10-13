import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

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

  return !isloading && <div className='min-h-screen flex flex-wrap content-between bg-orange-700 text-white text-3xl'>
    <div className='w-full block'>
      <Header />
      <main>
        {/* <Outlet /> */}
      </main>
      <Footer />
    </div>
  </div>
}

export default App
