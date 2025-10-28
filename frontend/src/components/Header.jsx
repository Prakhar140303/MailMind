import React from 'react'
import LoginLogoutButton from './LoginLogoutButton';
function Header() {

  return (
    <div className=' w-full  flex  p-4 text-2xl'>
        <h2>MailMind</h2>
        <LoginLogoutButton />
          
    </div>
  )
}

export default Header