import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../../../styles/auth";
import AuthHeroSide from './Hero';
import Login from './Login';
import Register from './Register';
import Find from './Find';
import AuthFormSide from './Form';

const Auth =()=>{
    return (
    <div className={auth.layout.background}>
      <div className={auth.layout.mainContainer}>
        <AuthHeroSide />
        <AuthFormSide>
            <Routes>
              <Route index element={<Navigate to="login" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="find" element={<Find />} />
            </Routes>
        </AuthFormSide>
    </div>
  </div>
    );
}

export default Auth;
