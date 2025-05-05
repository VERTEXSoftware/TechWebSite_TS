import React from 'react';

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-[20%] bg-gray-800 text-white">
      <div className='flex w-[70%] pl-8 py-4'>
        <div className='flex flex-col mr-8'>
          <span className='text-2xl font-medium'>Page</span>
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/about" className="hover:text-gray-400">About</a>
          <a href="/contacts" className="hover:text-gray-400">Contacts</a>
        </div>

        <div className='flex flex-col'>
          <span className='text-2xl font-medium'>Info</span>
          <a href="/privacy-policy" className="hover:text-gray-400">Private policy</a>
          <a href="/terms-of-services" className="hover:text-gray-400">Terms of services</a>
        </div>
      </div>
      <p className="text-left pl-8 text-sm py-2">&copy; VERTEX Software 2025. All rights reserved.</p>
    </div>
  );
};

export default Footer;