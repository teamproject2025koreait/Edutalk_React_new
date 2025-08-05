import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg w-full">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-300">테마 설정</p>
        <p className="font-semibold text-gray-800 dark:text-gray-100">{theme === 'light' ? '라이트 모드' : '다크 모드'}</p>
      </div>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        aria-label="테마 전환"
      >
        {theme === 'light' ? '다크로 변경' : '라이트로 변경'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;