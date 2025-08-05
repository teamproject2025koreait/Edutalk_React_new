import { useState, useEffect, useCallback } from "react";
import { apiAxios } from '../utils/axios';

export const useChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 채팅 업데이트 이벤트 핸들러를 useCallback으로 감싸 안정적인 참조를 유지
  const handleChatUpdate = useCallback((event) => {
    console.log('useChatList - handleChatUpdate received event:', event.detail);
    const { chatUser, lastChat, unreadCount } = event.detail;
    setChats(prev => {
      console.log('useChatList - setChats called. Previous chats:', prev);
      const updatedChats = prev.map(chat => {
        
        if (chat.uid === chatUser) {
          return {
            ...chat,
            lastChat: lastChat,
            updateTime: new Date().toISOString(),
            unreadCount: chat.unreadCount + (typeof unreadCount === 'number' ? unreadCount : 0)
          };
        }
        return chat;
      });

      // 업데이트된 채팅을 맨 위로 이동
      const chatToMove = updatedChats.find(chat => chat.uid === chatUser);
      if (chatToMove) {
        const filteredChats = updatedChats.filter(chat => chat.uid !== chatUser);
        return [chatToMove, ...filteredChats];
      }
      return updatedChats;
    });
  }, [setChats]);

  // 채팅 업데이트 이벤트 리스너
  useEffect(() => {
    console.log('useChatList: Adding chatUpdated event listener.');
    window.addEventListener('chatUpdated', handleChatUpdate);
    return () => {
      console.log('useChatList: Removing chatUpdated event listener.');
      window.removeEventListener('chatUpdated', handleChatUpdate);
    };
  }, [handleChatUpdate]); // handleChatUpdate가 변경될 때만 리스너를 다시 등록

  const fetchChats = useCallback(async () => {
    console.log('useChatList - fetchChats is being called.');
    try {
      setLoading(true);
      const response = await apiAxios.get('/api/chats');
      
      setChats(response.data.chats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "방금 전";
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  return {
    chats,
    loading,
    error,
    formatTime
  };
};
