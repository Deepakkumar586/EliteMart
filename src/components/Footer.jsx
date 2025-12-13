import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#0d1b2a] text-gray-300 py-8 text-center ">
      <p className="text-md tracking-[1px]">
        © {currentYear} EliteMart. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
