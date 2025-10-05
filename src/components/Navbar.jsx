import { Link } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";

import avatarImg from "../assets/avatar.png"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
    {name: "Dashboard", href:"/dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
        
    
]

const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems);
    
    const {currentUser, logout} = useAuth()

    const handleLogOut = () => {
        logout()
    }


    // console.log(isDropdownOpen)
    

  return (
    <header className="max-w-screen-2x1 mx-auto px-14 py-6">
        <nav className="flex justify-between items-center"> 

            {/* left side */}
            <div className='flex items-center md:gap-16 gap-8'>
                <Link to="/">
                <FaBarsStaggered className="w-6 h-6" />
                </Link>

                {/* search inout */}
                <div className='relative sm:w-72 w-40 space-x-2 '> 

                <IoMdSearch className='absolute inline-vlock left-3 inset-y-2'/>

                <input type="text" placeholder='search here' 
                className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md
                focus:outline-none' 
                /> 
                </div>
            </div>
 

            {/* right side */}
            <div className='relative flex items-center md:space-x-3 sp-x-2'>
                <div>
                    {
                        currentUser ? <>
                        <button onClick={() => setIsDropdownOpen (!isDropdownOpen)}>
                            <img src={avatarImg} alt="avatar icon" className={"size-7 rounded-full $ {currentUser ? 'ring-2 ring-blue-500' : ''}"} />
                        </button>
                        {/* show dropdown */}
                        {
                            isDropdownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                    <ul className='py-2'>
                                        {
                                            navigation.map((item) =>(
                                                <li key={item.name} onClick={() =>  
                                                setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className="block"
                                                    px-4 py-2 text-sm hover:bg-gray-100 >
                                                        {item.name}
                                                    </Link>

                                                </li>
                                            ))       
                                        }
                                        <li>
                                            <button 
                                            onClick={handleLogOut}
                                            classname="block
                                                    px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }

                        </> : <Link to="/login"><FaRegUser className='size-6'/></Link>
                    }
                </div>
                
                <button className='hidden sm:block'>
                    <FaRegHeart className='size-6' />
                </button>  

                <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center'>
                    <FaCartArrowDown className=''/>
                    {
                        cartItems.length > 0 ? <span className='text-sm font-semibold sm:m1=1'>{cartItems.length}</span> :  <span className='text-sm font-semibold sm:m1-1'>0</span>
                    }
                   

                </Link>
            </div>   
        </nav>

    </header>
  )
}

export default Navbar;