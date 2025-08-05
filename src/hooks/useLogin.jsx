import { useState, useCallback, useEffect, useContext } from 'react';
import { apiAxios } from '../utils/axios.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

export const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState("");
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // AuthContext에서 login 함수 가져오기

  // URL에서 회원가입 관련 파라미터 확인
  const [registrationInfo, setRegistrationInfo] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isRegistered = urlParams.get('registered') === 'true';
    if (isRegistered) {
      setRegistrationInfo({
        email: urlParams.get('email'),
        message: urlParams.get('message') || '회원가입이 완료되었습니다.',
      });
      // 로그인 성공 또는 실패 시 URL에서 파라미터 제거
      // navigate('/auth/login', { replace: true });
    }
  }, [navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      

      // 실제 백엔드 API 호출 예시 (주석 해제 후 사용)
      const response = await apiAxios.post('/api/auth/login', JSON.stringify(formData), {
        headers: { 'Accept': 'application/json' },
        withCredentials: true, // 세션/쿠키 기반 인증 시 필요
      });

      console.log('서버 응답 전체:', response);
      console.log('서버 응답 데이터:', response.data);
      console.log('데이타토큰:', response.data.token);
      console.log('데이타데이타토큰:', response.data.data.token);

      alert('로그인이 성공적으로 완료되었습니다!');

      // [백엔드 연동 가이드]
      // 백엔드에서 토큰을 반환하는 경우, 아래와 같이 localStorage에 저장할 수 있습니다.
      if (!response.data || !response.data.data || !response.data.data.token) {
        setError('로그인에 실패했습니다: 토큰을 받지 못했습니다. 서버 응답 구조를 확인해주세요.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('authToken', response.data.data.token);
      
      const tokenPayload = JSON.parse(atob(response.data.data.token.split('.')[1]));
      const userData = {
        id: tokenPayload.sub, // 'id' 대신 'sub' 필드 사용
        email: tokenPayload.email,
        identy: tokenPayload.identy,
        userType: tokenPayload.type, // 'type'을 'userType'으로 매핑
        name: tokenPayload.name || tokenPayload.email, // 이름이 없으면 이메일 사용
        // 필요한 다른 정보도 추가
      };
      
      login(userData); // AuthContext의 login 함수 호출 (사용자 정보 전달)

      // 성공 시 대시보드로 리다이렉트
      navigate('/dashboard'); 

    } catch (err) {
      console.error('로그인 실패:', err);
      if (err.response) {
        // 서버가 응답을 반환했지만, 성공 상태 코드가 아닌 경우
        const { status, data } = err.response;
        if (status === 401) {
          setError(data.message || '아이디 또는 비밀번호가 일치하지 않습니다.');
        } else if (status >= 500) {
          setError('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError(data.message || '로그인 중 오류가 발생했습니다.');
        }
      } else if (err.request) {
        // 요청이 이루어졌으나 응답을 받지 못한 경우 (네트워크 문제 등)
        setError('서버로부터 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요.');
      } else {
        // 요청을 설정하는 중에 에러가 발생한 경우
        setError('로그인 요청 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    focusedField,
    registrationInfo,
    setFocusedField,
    handleInputChange,
    handleSubmit,
  };
};
