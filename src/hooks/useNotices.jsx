import { useState, useEffect } from "react";
import { apiAxios } from '../utils/axios';

export const useNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      // 실제 API 호출 대신 더미 데이터 사용
      // const response = await fetch(`/api/search`); 
      // if (!response.ok) {
      //   throw new Error('Failed to fetch notices');
      // }
      // const data = await response.json();
      const response = await apiAxios.get('/api/notices');
      
      setNotices(response.data.notices);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const isExpired = (expirationTime) => {
    if (!expirationTime) return false;
    return new Date(expirationTime) < new Date();
  };

  return {
    notices,
    loading,
    error,
    formatDate,
    isExpired,
    fetchNotices
  };
};
