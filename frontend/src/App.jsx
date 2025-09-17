
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import NavigatePage from './Pages/NavigatePage';
import HostPanel from './Pages/HostPanel';



const App = () => {
  return (
   

      <Routes>
       
        
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/navigatepage' element={<NavigatePage/>} />
        <Route path='/hostpanel' element={<HostPanel/>} />
        
      </Routes>
   
  );
}

export default App;

