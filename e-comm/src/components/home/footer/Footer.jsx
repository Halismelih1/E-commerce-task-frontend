import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 bottom-0 left-0 w-full">
      <div className="container mx-auto text-center ">
        <p>&copy; {new Date().getFullYear()} Halismelih ABAK, All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
