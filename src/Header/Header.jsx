import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    document.cookie = "jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    navigate('/', { replace: true });
  }

  return (
    <header className="w-full flex items-center justify-between px-10 py-4 bg-[#f8fafc] border-b border-[#ececec]">
      <div className="flex items-center">
        <img
          src="https://res.cloudinary.com/dbwnoheep/image/upload/v1750759230/Frame_274_gavlyp.png"
          alt="logo"
          className="w-10 h-10 mr-2"
        />
        <span className="text-xl font-semibold italic text-[#f59e0b]">Tasty Kitchens</span>
      </div>
      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className="text-[#f59e0b] font-medium text-base hover:underline"
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="text-[#1e293b] font-medium text-base hover:underline"
        >
          Cart
        </Link>
        <button
          className="ml-2 bg-[#f59e0b] text-white px-4 py-1.5 rounded-md font-medium text-base hover:bg-[#d97706] transition-colors" onClick={handleLogOut}
        >
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Header
