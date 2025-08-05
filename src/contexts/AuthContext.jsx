import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // user 상태 추가
  const navigate = useNavigate();

  // 초기 로그인 상태 확인 및 사용자 정보 로드
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    // 사용자 정보도 localStorage에서 로드 (필요하다면)
    const storedUser = localStorage.getItem('user');
    if (loggedIn && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 로그인 함수: 사용자 정보를 인자로 받도록 수정
  const login = useCallback((userData) => { // userData 인자 추가
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // user 정보 localStorage에 저장
    }
  }, []);

  // 로그아웃 함수
  const logout = useCallback(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user'); // user 정보도 제거
    setIsLoggedIn(false);
    setUser(null); // user 상태 초기화
    navigate('/auth/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}> {/* user 추가 */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);