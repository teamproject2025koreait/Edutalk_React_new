import { useState, useCallback, useMemo, useEffect } from 'react';
import { apiAxios } from '../utils/axios';
import { useChatMessages } from './useChatMessages';
import { useSupabaseRealtime } from './useSupabaseRealtime.jsx';

// 3. 채팅 관련 로직을 총괄하는 메인 커스텀 훅
export const useChat = (user, selectedChatUser, token) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 기본 채팅 유저 정보 (선택된 채팅이 없을 때 사용)
  const defaultChatUser = useMemo(() => ({
    name: "새로운 대화",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    status: "online"
  }), []);

  const currentChatUser = useMemo(() => {
    if (!selectedChatUser) {
      return defaultChatUser;
    }
    // 수정: selectedChatUser 객체를 기반으로 현재 채팅 유저 정보를 구성합니다.
    // userType에 따라 상대방의 이름과 ID를 동적으로 설정합니다.
    const opponentName = user?.userType === 'student' ? selectedChatUser.instructorName : selectedChatUser.studentName;
    const opponentId = user?.userType === 'student' ? selectedChatUser.instructorID : selectedChatUser.studentID;

    const chatUser = {
      ...selectedChatUser,
      id: opponentId, // 메시지 전송 시 to 필드에서 사용될 수 있도록 상대방 ID를 설정
      name: opponentName,
      chatId: selectedChatUser.uid, // selectedChatUser.uid를 chatId로 명시적으로 할당
      avatar: selectedChatUser.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      status: "online" // 이 부분은 실제 presence 상태에 따라 동적으로 변경될 수 있습니다.
    };
    return chatUser;
  }, [selectedChatUser, defaultChatUser, user?.userType]);

  // --- 하위 훅 사용 ---
  const {
    setMessagesHistory,
    currentMessages,
    loadChatMessages,
  } = useChatMessages(currentChatUser, token);

  // 실시간 메시지 수신 처리
  const handleNewMessage = useCallback((message) => {
    console.log('React handleNewMessage - Function started.');
    try {
      // 현재 사용자가 보낸 메시지인 경우, handleSendMessage에서 이미 처리되었으므로 무시
      if (user && message.senderId === user.id) {
        console.log('React handleNewMessage - Message sent by current user, ignoring.');
        return;
      }

      console.log('React handleNewMessage - Raw incoming message object:', message);

      const formattedMessage = {
        id: message.uid,
        sender: message.senderName,
        message: message.message,
        timestamp: new Date(message.timestamp),
        isOwn: false, // 다른 사용자가 보낸 메시지이므로 false 유지
        type: message.type || 'text',
        avatar: message.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
        status: 'delivered'
      };
      console.log('React handleNewMessage - formattedMessage created:', formattedMessage);

      setMessagesHistory(prev => ({
        ...prev,
        [message.chatRoomId]: [...(prev[message.chatRoomId] || []), formattedMessage]
      }));
      console.log('React handleNewMessage - setMessagesHistory successful.');

      console.log('React handleNewMessage - About to dispatch chatUpdated event.');
      window.dispatchEvent(new CustomEvent('chatUpdated', {
        detail: {
          chatUser: message.chatRoomId, // Use chatRoomId from the incoming message
          lastChat: message.message,
          unreadCount: (currentChatUser.chatId !== message.chatRoomId) ? 1 : 0 // Only increment if not current chat
        }
      }));
      console.log('Dispatched chatUpdated event detail:', { chatUser: message.chatRoomId, lastChat: message.message, unreadCount: (currentChatUser.chatId !== message.chatRoomId) ? 1 : 0 }); // 추가된 로그
      console.log('React handleNewMessage - Event dispatched.');

    } catch (error) {
      console.error('React handleNewMessage - Uncaught error in handleNewMessage:', error);
    }
  }, [setMessagesHistory, user]);

  // 실시간 타이핑 이벤트 수신 처리 (현재는 useSupabaseRealtime 내부에서만 상태 관리)
  const handleOpponentTyping = useCallback(() => {
      // 이 콜백을 사용하여 추가적인 로직을 구현할 수 있습니다。
  }, []);

  const { isOpponentTyping, sendTypingEvent } = useSupabaseRealtime(
    user,
    currentChatUser.chatId, // chatRoomId 전달
    handleNewMessage,
    handleOpponentTyping
  );
  // ------------------

  // 컴포넌트 마운트 시 또는 채팅 유저 변경 시 메시지 로드
  useEffect(() => {
    // 더미 데이터가 아닌 실제 유저이고, currentChatUser.chatId가 유효할 때 항상 API 호출
    if (currentChatUser.chatId) {
        loadChatMessages(currentChatUser.chatId);
        // 채팅방 진입 시 읽지 않은 메시지 수 0으로 업데이트
        if (currentChatUser.unreadCount > 0) {
          // UI를 먼저 업데이트하기 위해 이벤트 먼저 발생
          window.dispatchEvent(new CustomEvent('chatUpdated', {
            detail: { chatUser: currentChatUser.chatId, message: currentChatUser.lastChat, unreadCount: 0 } // unreadCount도 함께 전달
          }));

          // apiAxios.patch(`/chatUsers/${selectedChatUser.id}`, { unreadCount: 0 }) // selectedChatUser.id 사용
            // .then(response => {
            //   // console.log('읽지 않은 메시지 수 업데이트 성공:', response.data);
            //   // API 성공 시 추가적인 UI 업데이트는 필요 없음 (이미 이벤트로 처리됨)
            // })
            // .catch(error => console.error('읽지 않은 메시지 수 업데이트 실패:', error.response?.data || error.message || error));
        }
    }
  }, [currentChatUser, loadChatMessages, selectedChatUser]); // selectedChatUser를 의존성 배열에 추가

  // 메시지 전송 핸들러
  const handleSendMessage = useCallback(async (messageText) => {
    setIsLoading(true);
    const tempId = Date.now() + Math.random();
    const message = {
      id: tempId,
      sender: user?.name,
      message: messageText,
      timestamp: new Date(),
      isOwn: true,
      type: 'text',
      avatar: user?.avatar,
      status: 'sending'
    };
    

    const chatKey = currentChatUser.chatId; // chatKey를 chatId로 변경
    setMessagesHistory(prev => {
      const newState = { ...prev, [currentChatUser.chatId]: [...(prev[currentChatUser.chatId] || []), message] };
      console.log('useChat - setMessagesHistory (temp message) called. New state for chatKey:', chatKey, newState[chatKey]);
      return newState;
    });
    

    try {
      // const response = await apiAxios.put('/api/chat', {
      //   message: messageText,
      //   to: user.userType === 'teacher' ? currentChatUser.studentID : currentChatUser.instructorID,
      //   to_name: user.userType === 'teacher' ? currentChatUser.studentName : currentChatUser.instructorName
      // });

      // 목업 서버에 메시지 전송
      const response = await apiAxios.put('/api/chat', {
        message: messageText,
        to: user.userType === 'teacher' ? currentChatUser.studentID : currentChatUser.instructorID,
        to_name: user.userType === 'teacher' ? currentChatUser.studentName : currentChatUser.instructorName
      });

      // json-server는 생성된 리소스를 반환하므로, response.data가 바로 메시지 객체
      const responseData = await response.json();
      setMessagesHistory(prev => ({
        ...prev,
        [chatKey]: prev[chatKey].map(msg =>
          msg.id === tempId ? { ...msg, id: responseData.id, timestamp: responseData.timestamp, status: 'delivered' } : msg
        )
      }));

      // 사이드바 채팅 목록 업데이트를 위한 이벤트 발생
      window.dispatchEvent(new CustomEvent('chatUpdated', { 
        detail: { chatUser: chatKey, lastChat: responseData.chat?.lastChat, unreadCount: 0 } 
      }));
      console.log('useChat: chatUpdated event dispatched from handleSendMessage. Detail:', { chatUser: chatKey, lastChat: responseData.message, unreadCount: 0 });
      setNewMessage(''); // 메시지 전송 성공 시에만 입력 필드 비우기
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  }, [user, currentChatUser, setMessagesHistory]);

  // 파일 첨부 핸들러 (현재는 콘솔 로그만 출력)
  const handleAttachment = useCallback(() => {
    // TODO: 파일 첨부 로직 구현
  }, []);

  // 최종적으로 UI 컴포넌트에 전달할 값들을 반환합니다。
  return {
    currentChatUser,
    messages: currentMessages,
    newMessage,
    isLoading,
    isOpponentTyping,
    setNewMessage,
    handleSendMessage,
    handleTyping: sendTypingEvent, // Supabase 훅에서 받은 함수를 그대로 전달
    handleAttachment
  };
};

        