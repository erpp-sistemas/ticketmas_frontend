
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'



import Layout from './pages/Layout'
import Tickets from './pages/Tickets'
import NewTicket from './pages/NewTicket'
import Tostify from './components/global/Tostify'

function App() {
 

  return (
    <Routes>
      
      <Route path='/login' element={<Login/>} />
      <Route  path='/dashboard' element={<Layout/>} >
        <Route index element={<Tickets/>}/>
        <Route path='newticket' element={<NewTicket/>}/>

      </Route>



    </Routes>
  )
}

export default App
