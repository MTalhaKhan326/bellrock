import React, { useState } from 'react'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ProfileSettings from '../component/ProfileSettings/ProfileSettings.'
import EditIcon from '../assets/editIcon.png';


const About = () => {
  const [editSetting, seteditSetting] = useState(false)
  return (
    <div className='mb-20'>
      {
        editSetting ? <div className='dashboard'> <ProfileSettings seteditSetting={seteditSetting} /> </div> : <div className='dashboard'>
          <div>
            <div>
              <button onClick={() => seteditSetting(true)} className='button-edit'><img src={EditIcon} alt='EditIcon' /> Edit Profile</button>
            </div>
            <img src="https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg" alt="img" width={130} height={130} className='profile-setting-image'/>
            <h6 className='user-name'>Thomas Shelby</h6>

            <div className='user-info'>
              <p className='label'>Email</p>
              <h6 className='info'>abc@zxy.com</h6>

            </div>
            <div className='user-info'>
              <p className='label'>Phone</p>
              <h6 className='info'>abc@zxy.com</h6>

            </div>
            <div className='user-info'>
              <p className='label'>Address</p>
              <h6 className='info'>abc@zxy.com</h6>

            </div>
            <div className='user-info'>
              <p className='label'>City</p>
              <h6 className='info'>abc@zxy.com</h6>

            </div>
            <div className='user-info'>
              <p className='label'>Province</p>
              <h6 className='info'>Province</h6>
            </div>

            <div className='user-info'>
              <p className='label'>Postal Code</p>
              <h6 className='info'>Postal Code</h6>

            </div>
            <div className='user-info'>
              <p className='label'>Date of Birth</p>
              <h6 className='info'>DD/MM/YYYY</h6>
            </div>
          </div>
        </div>
      }



    </div>
  )
}

export default About
