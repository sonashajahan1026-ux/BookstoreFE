import React from 'react'

const AdminHeader = () => {
  return (
    <>
      <div className="flex justify-between items-center  p-3 bg-gray-200">
        <div>
          <img
            className="w-25"
            src="https://media.istockphoto.com/id/1153065544/vector/book-logo-delivery-concept-design.jpg?s=612x612&w=0&k=20&c=hR5_Skxc2OWNAT6sYUMLStTEk5VhqcrLd-Zk8dyoj8M="
            alt="logo"
          />
        </div>
        <div className="text-center text-4xl text-bold">
          <h1>Welcome Admin</h1>
        </div>
        <div className="text-center">
          <button className="p-3 bg-black text-white rounded-2xl ">
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminHeader