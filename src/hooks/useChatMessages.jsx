import { useState, useCallback, useMemo } from 'react';
import { apiAxios } from '../utils/axios'; // apiAxios 임포트

// 1. 메시지 상태와 관련된 로직을 관리하는 커스텀 훅
export const useChatMessages = (currentChatUser, token) => {
  // messagesHistory는 채팅방 별 메시지 목록을 저장하는 객체입니다。
  // { [chatKey]: [message1, message2, ...] }
  const [messagesHistory, setMessagesHistory] = useState({});

  // 현재 채팅방의 메시지 목록을 가져옵니다.
  // 정렬 및 타이핑 인디케이터 로직도 포함됩니다.
  const currentMessages = useMemo(() => {
    const chatKey = currentChatUser.chatId;
    // messagesHistory[chatKey]가 없으면 빈 배열을 반환하여 다른 채팅방의 메시지가 표시되지 않도록 합니다.
    const msgs = messagesHistory[chatKey] || [];
    // 메시지를 시간순으로 정렬합니다.
    return [...msgs].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [messagesHistory, currentChatUser.chatId]); // 의존성 배열에 currentChatUser.chatId 추가

  // 채팅방의 메시지를 로드하는 함수 (API 호출)
  const loadChatMessages = useCallback(async (chatRoomId) => {
    if (!chatRoomId) {
      return;
    }
    try {
      // apiAxios를 사용하여 메시지 로드
      const response = await apiAxios.get('/api/chat/messages', {
        params: { chatRoomId: chatRoomId } // chatRoomId에 따라 필터링
      });
      
      // json-server는 쿼리 파라미터로 필터링 가능
      // response.data는 이미 필터링된 메시지 배열일 것임
      setMessagesHistory(prev => ({ ...prev, [chatRoomId]: response.data.messages }));

    } catch (error) {
      console.error('메시지 로드 오류:', error);
    }
  }, []); // 의존성 배열에서 token 제거

  return {
    messagesHistory,
    setMessagesHistory,
    currentMessages,
    loadChatMessages,
  };
};