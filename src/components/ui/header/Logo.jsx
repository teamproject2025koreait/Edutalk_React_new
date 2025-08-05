import React from 'react';
import { motion } from 'framer-motion';

import { dashboard } from '../../../styles/dashboard';

const HeaderLogo = () => {

  return (
    <motion.div 
      className={`${dashboard.header.logo.container} cursor-pointer`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      // onClick={() => navigate('/')}
    >
      <motion.div 
        className={dashboard.header.logo.icon}
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </motion.div>
      <div>
        <h1 className={dashboard.header.logo.title}>EduTalk</h1>
        <p className={dashboard.header.logo.subtitle}>Education Platform</p>
      </div>
    </motion.div>
  );
};

export default HeaderLogo;
