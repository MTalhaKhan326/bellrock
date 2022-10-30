import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex flex-row justify-between header' >
      <div>
        <h2 className='site-title'>Welcome Bellrock!</h2>
        <p className='page-name'>Here is your dashboard </p>
      </div>
      <div>
        <img src="https://image.shutterstock.com/image-photo/profile-picture-smiling-millennial-asian-260nw-1836020740.jpg" height={46} width={46} alt="" className='rounded-full profile-image block' />
      </div>
    </div>
  )
}

export default Header
