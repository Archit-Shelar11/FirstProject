
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import SignUp from './pages/Signup'
import Login from './pages/login'
import { ToastContainer } from 'react-toastify'
import useGetCurrentUser from './customHooks/getCurrentUser'



export const serverUrl="http://localhost:8000"
function App() {
  useGetCurrentUser();
  return (
    <>
    <ToastContainer />
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App