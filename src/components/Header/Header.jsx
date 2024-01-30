import React from 'react'
import {Logo, Container, Logout} from '../index.js'
import { Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
function Header() {
  // checking state autheneticate or not by default i set it false
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate();
  // slug means url kha wo jaa rha hai 
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: !authStatus,
    },
    {
      name: 'Add post',
      slug: '/add-post',
      active: !authStatus,
    },
  ];
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav>
          {/* logo */}
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {/* nav list items */}
          <ul className='flex ml-auto'>
              {/* if active first nahi to second wala */}
              {navItems.map((item)=> item.active?(
                <li key={item.name}>
                  <button
                  onClick={()=> navigate(item.slug)}
                  className='inline-block px-6 py-2 duration-200 hover: bg-orange-400 rounded-full'
                  >{item.name}</button>
                </li>
              ):null
            )}
            {/* if first condition true tabhi dusra show hoga  */}
            {authStatus && (
              // logout button if authenticate
              <li>
                <Logout />
              </li> 
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header