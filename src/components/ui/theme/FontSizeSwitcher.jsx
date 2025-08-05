import React from 'react';
import { useFontSize } from '../../../contexts/FontSizeContext';

const FontSizeSwitcher = () => {
  const { fontSize, setFontSize } = useFontSize();

  const fontSizes = [
    { label: '작게', value: 'sm' },
    { label: '보통', value: 'base' },
    { label: '크게', value: 'lg' },
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg w-full">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-300">글자 크기</p>
        <p className="font-semibold text-gray-800 dark:text-gray-100">{fontSizes.find(fs => fs.value === fontSize)?.label}</p>
      </div>
      <div className="flex space-x-2">
        {fontSizes.map((fs) => (
          <button
            key={fs.value}
            onClick={() => setFontSize(fs.value)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
              ${fontSize === fs.value
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
              }`}
          >
            {fs.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontSizeSwitcher;
