import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 전문적인 컬러 시스템
      colors: {
        ...colors,
        // 브랜드 컬러 - 교육에 최적화된 신뢰감 있는 블루
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // 메인 브랜드 컬러
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        // 보조 컬러 - 따뜻한 인디고
        secondary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b'
        },
        // 성공 컬러 - 교육 성취감
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        // 경고 컬러
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        // 에러 컬러
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        // 중성 컬러 - 세련된 그레이
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        }
      }, // Added a comment to force recompile
      
      // 전문적인 타이포그래피
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system", 
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "sans-serif"
        ],
        display: [
          "Pretendard Variable",
          "Pretendard",
          "system-ui",
          "sans-serif"
        ]
      },
      
      // 정교한 간격 시스템 (8pt grid 기반)
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '68': '17rem',    // 272px
        '72': '18rem',    // 288px
        '76': '19rem',    // 304px
        '80': '20rem',    // 320px
        '88': '22rem',    // 352px
        '92': '23rem',    // 368px
        '96': '24rem',    // 384px
        '104': '26rem',   // 416px
        '112': '28rem',   // 448px
        '120': '30rem',   // 480px
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
        '160': '40rem',   // 640px
        '176': '44rem',   // 704px
        '192': '48rem',   // 768px
      },
      
      // 고급 그림자 시스템
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -2px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 40px -4px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'floating': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      
      // 부드러운 애니메이션 (깜빡임 방지)
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'wiggle': 'wiggle 0.8s ease-in-out',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
        'slide-in-left': 'slideInFromLeft 0.6s ease-out',
        'slide-in-right': 'slideInFromRight 0.6s ease-out',
        'slide-in-top': 'slideInFromTop 0.4s ease-out',
        'slide-in-bottom': 'slideInFromBottom 0.4s ease-out',
        'scale-in-center': 'scaleIn 0.5s ease-out',
        'rotate-in': 'rotateIn 0.8s ease-out',
        'shake': 'shake 0.3s ease-in-out',
        'rubber-band': 'rubberBand 0.8s ease-out',
        'morphing': 'morphing 12s ease-in-out infinite',
        'mobile-menu-slide': 'mobileMenuSlide 0.3s ease-out',
        'mobile-menu-fade': 'mobileMenuFade 0.3s ease-out',
      },
      
      // 키프레임 정의
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-2px)' },
          '50%': { transform: 'translateY(2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-180deg)', opacity: '0' },
          '100%': { transform: 'rotate(0deg)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        rubberBand: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, 0.95, 1)' },
          '100%': { transform: 'scale3d(1, 1, 1)' },
        },
        morphing: {
          '0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
        },
        mobileMenuSlide: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        mobileMenuFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      
      // 전문적인 반응형 브레이크포인트 시스템
      screens: {
        'xs': '375px',    // iPhone SE
        'sm': '640px',    // 작은 태블릿
        'md': '768px',    // 태블릿
        'lg': '1024px',   // 작은 데스크톱
        'xl': '1280px',   // 데스크톱
        '2xl': '1536px',  // 큰 데스크톱
        '3xl': '1728px',  // 와이드 모니터
        '4xl': '1920px',  // 4K 모니터
        // 디바이스별 타겟
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
        'wide': {'min': '1728px'},
        // 세밀한 제어
        'touch': {'max': '1023px'},
        'pointer': {'min': '1024px'},
        'landscape': {'raw': '(orientation: landscape)'},
        'portrait': {'raw': '(orientation: portrait)'},
        'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
      },
      
      // 고급 border radius (일관된 스케일)
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',   // 2px
        'DEFAULT': '0.25rem', // 4px
        'md': '0.375rem',   // 6px
        'lg': '0.5rem',     // 8px
        'xl': '0.75rem',    // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
        '4xl': '2rem',      // 32px
        '5xl': '2.5rem',    // 40px
        '6xl': '3rem',      // 48px
        'full': '9999px',
      },
      
      // 전문적인 타이포그래피 스케일
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],    // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],// 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
        '5xl': ['3rem', { lineHeight: '1' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],        // 72px
        '8xl': ['6rem', { lineHeight: '1' }],          // 96px
        '9xl': ['8rem', { lineHeight: '1' }],          // 128px
        // 커스텀 디스플레이 사이즈
        'display-sm': ['2rem', { lineHeight: '2.375rem', letterSpacing: '-0.025em' }], // 32px
        'display-md': ['2.625rem', { lineHeight: '3rem', letterSpacing: '-0.025em' }], // 42px
        'display-lg': ['3.5rem', { lineHeight: '4rem', letterSpacing: '-0.025em' }],   // 56px
        'display-xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.025em' }],   // 72px
      },
      
      // 향상된 글꼴 두께
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      
      // 접근성을 고려한 최소 터치 타겟 크기
      minHeight: {
        'touch': '44px',  // iOS HIG 권장
        'android': '48px', // Material Design 권장
      },
      
      minWidth: {
        'touch': '44px',
        'android': '48px',
      },
    },
  },
  plugins: [],
};
