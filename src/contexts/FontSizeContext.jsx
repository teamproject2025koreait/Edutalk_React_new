import React, { createContext, useState, useEffect, useContext } from 'react';

const FontSizeContext = createContext();

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize || 'base'; // 기본값은 'base'
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // 기존 폰트 크기 클래스 제거
    root.classList.remove('text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl');
    // 새로운 폰트 크기 클래스 추가
    root.classList.add(`text-${fontSize}`);

    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const value = { fontSize, setFontSize };

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
};
