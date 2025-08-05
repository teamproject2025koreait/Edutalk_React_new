import { useNavigate } from "react-router-dom";
import { useChatList } from '../../../hooks/useChatList.jsx';
import { dashboard } from "../../../styles/dashboard.js";
import { useChat } from '../../../contexts/ChatContext.jsx';
import { apiAxios } from '../../../utils/axios';

// 채팅 목록 컨텐츠 컴포넌트
const ChatsContent = ({ setIsSidebarOpen, user }) => {
  const navigate = useNavigate();
  const { chats, loading, error, formatTime, setChats } = useChatList();
  const { setSelectedChatUser } = useChat();

  const getPartnerName = (chat) => {
    if (!user) return '';
    const name = user.userType === 'student' ? chat.instructorName : chat.studentName;
    return name;
  };

  const handleChatClick = async (chat) => {
    setSelectedChatUser(chat);
    navigate(`/dashboard/chats?chatId=${chat.uid}`);
    if (setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }

    // 메시지를 읽음으로 표시하는 API 호출
    if (chat.unreadCount > 0) {
      try {
        await apiAxios.post('/api/chat/mark-read', { chatRoomId: chat.uid });
        // API 호출 성공 시, UI에서도 unreadCount를 0으로 업데이트
        // useChatList 훅의 setChats를 직접 호출하여 상태 업데이트
        setChats(prevChats => prevChats.map(c => 
          c.uid === chat.uid ? { ...c, unreadCount: 0 } : c
        ));
      } catch (error) {
        console.error('메시지 읽음 처리 실패:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className={dashboard.sidebar.section.container}>
        <h4 className={dashboard.sidebar.section.title}>최근 채팅</h4>
        <div className="text-center py-4">
          <div className="text-sm text-gray-500 dark:text-neutral-400">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={dashboard.sidebar.section.container}>
        <h4 className={dashboard.sidebar.section.title}>최근 채팅</h4>
        <div className="text-center py-4">
          <div className="text-sm text-red-500 dark:text-red-400">오류: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={dashboard.sidebar.section.container}>
      <div className={dashboard.sidebar.section.header}>
        <h4 className={dashboard.sidebar.section.title}>최근 채팅</h4>
        <button
          onClick={() => navigate(`/dashboard/chats`)}
          className={dashboard.sidebar.section.action}
        >
          전체보기
        </button>
      </div>
      {chats.length === 0 ? (
        <div className="text-center py-4">
          <div className="text-sm text-gray-500 dark:text-neutral-400">채팅이 없습니다</div>
        </div>
      ) : (
        chats.map((chat) => {
          const partnerName = getPartnerName(chat);
          return (
            <button
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className={dashboard.sidebar.chat.button}
            >
              <img
                src={chat.avatar}
                alt={partnerName}
                className={dashboard.sidebar.chat.avatar}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div
                className="w-10 h-10 bg-blue-500 dark:bg-blue-700 rounded-xl flex items-center justify-center"
                style={{ display: 'none' }}
              >
                <span className="text-white dark:text-neutral-200 font-medium text-sm">
                  {partnerName?.[0] || '?'}
                </span>
              </div>
              <div className={dashboard.sidebar.chat.content}>
                <div className={dashboard.sidebar.chat.headerRow}>
                  <p className={dashboard.sidebar.chat.name}>
                    {partnerName}
                  </p>
                  <span className={dashboard.sidebar.chat.time}>
                    {formatTime(chat.updateTime)}
                  </span>
                </div>
                <div className={dashboard.sidebar.chat.messageRow}>
                  <p className={dashboard.sidebar.chat.message}>
                    {chat.lastChat}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className={dashboard.sidebar.chat.unreadBadge}>
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })
      )}
    </div>
  );
};

export default ChatsContent;
