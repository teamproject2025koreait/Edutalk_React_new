import { useRef } from 'react';
import ChatHeader from '../ui/chat/Header';
import ChatMessage from '../ui/chat/Message';
import ChatInput from '../ui/chat/Input';
import { chat } from '../../styles/chat';
import { useChat } from '../../hooks/useChat.jsx';
import { useOutletContext } from 'react-router-dom';

import { useChat as useChatContext } from '../../contexts/ChatContext.jsx';

// Chat 컴포넌트는 이제 채팅 UI의 전체적인 레이아웃과 구조를 담당합니다。
// 모든 상태와 로직은 useChat 훅에서 관리됩니다。
const Chat = () => {
  const { user } = useOutletContext();
  const { selectedChatUser } = useChatContext();
  const token = localStorage.getItem('authToken'); // localStorage에서 토큰 직접 가져오기
  const {
    currentChatUser,
    messages,
    newMessage,
    isLoading,
    isOpponentTyping,
    setNewMessage,
    handleSendMessage,
    handleTyping,
    handleAttachment
  } = useChat(user, selectedChatUser, token);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  return (
    <div ref={chatContainerRef} className={chat.container}>
      {/* 주석: selectedChatUser가 있을 때만 채팅창을 보여줍니다. */}
      {selectedChatUser ? (
        <div className={chat.layout}>
          {/* 채팅 헤더 */}
          <div className={chat.section.header}>
            <ChatHeader 
              user={currentChatUser}
              isOpponentTyping={isOpponentTyping}
            />
          </div>
          {/* 메시지 목록 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ChatMessage 
              messages={messages}
              messagesEndRef={messagesEndRef}
            />
          </div>
          {/* 메시지 입력창 */}
          <div className={chat.section.input}>
            <ChatInput 
              message={newMessage}
              setMessage={setNewMessage}
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              onAttachment={handleAttachment}
              disabled={isLoading}
              chatId={currentChatUser.chatId}
            />
          </div>
        </div>
      ) : (
        // 주석: 선택된 채팅이 없는 경우 안내 메시지를 보여줍니다.
        <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 bg-neutral-50/50">
            <div className="p-8 border-2 border-dashed border-neutral-200 rounded-2xl bg-white">
                <svg className="w-16 h-16 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <h2 className="mt-4 text-lg font-semibold text-neutral-700">대화를 시작해보세요</h2>
                <p className="mt-1 text-sm text-neutral-500">왼쪽 목록에서 대화 상대를 선택하거나<br/>새로운 대화를 시작하여 소통을 시작하세요.</p>
            </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
