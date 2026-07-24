import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-gray-900 text-white px-4 flex items-center justify-center h-16  ">
      <p>Copyright &copy; {currentYear} Get me a Chai - All rights reserved !</p>
    </div>
  )
}

export default Footer
