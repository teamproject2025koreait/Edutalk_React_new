import React from 'react';
import { auth } from '../../../styles/auth';

const AuthNavigate = ({ text, link, linkText }) => {
  return (
    <div className={auth.navigation.container}>
      <div className={auth.navigation.textContainer}>
        {text}{" "}
        <a href={link} className={auth.link.primary}>
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default AuthNavigate;
