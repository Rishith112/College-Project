import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home/Home'
import Login from './Login/Login'
import ProtectedRouting from './ProtectedRouting/ProtectedRouting'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  )}

export default App
