
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import NavigatePage from './Pages/NavigatePage';



const App = () => {
  return (
   

      <Routes>
       
        
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/navigatepage' element={<NavigatePage/>} />
      </Routes>
   
  );
}

export default App;

