import { faHome } from '@fortawesome/free-regular-svg-icons'
import { faBook, faGauge, faGear, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <>
    <div className='bg-gray-800 p-4 h-[85vh]'>

        <h1 className="text-3x1 text-center font-bold text-orange-300 p-5">
            Admin dashboard <FontAwesomeIcon icon={faGauge}/>
        </h1>

        <hr />
     <div className=' flex justify-center flex-col  h-100'>
        <ul className=' m-4'>
            <li className='text-center text-amber-500 text-xl'><Link to={'/admin'}>Admin Home <FontAwesomeIcon icon={faHome}/></Link></li>
            <li className='text-center text-amber-500 text-xl mt-5'><Link to={'/admin-books'}>Admin Books/Users <FontAwesomeIcon icon={faBook}/></Link></li>
            <li className='text-center text-amber-500 text-xl mt-5'><Link to={'/admin'}>Admin careers <FontAwesomeIcon icon={faSuitcase}/></Link></li>
            <li className='text-center text-amber-500 text-xl mt-5'><Link to={'/admin-settings'}>Admin Settings <FontAwesomeIcon icon={faGear}/></Link></li>
            
        </ul>

     </div>
       
        
    </div>
    </>
  )
}

export default AdminSideBar