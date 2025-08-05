import axios from 'axios';


// apiAxios/요청 주소로 적는다.
// 실제 백엔드 API (Spring Boot)를 위한 인스턴스
const apiAxios = axios.create({
  baseURL: 'http://localhost:8081', // 실제 백엔드 API URL
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 더미 데이터 서버 (json-server)를 위한 인스턴스
const mockAxios = axios.create({
  baseURL: 'http://localhost:3001', // json-server API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (예: 토큰 추가 - apiAxios에만 적용될 수 있음)
apiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (예: 에러 처리 - 두 인스턴스 모두에 적용 가능)
apiAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API 호출 에러 (apiAxios):', error);
    return Promise.reject(error);
  }
);

mockAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API 호출 에러 (mockAxios):', error);
    return Promise.reject(error);
  }
);

export { apiAxios, mockAxios };