import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Home from './Home'
function App() {
  return (
  
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App