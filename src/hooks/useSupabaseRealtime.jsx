import { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

let supabase = null;
if (typeof window !== 'undefined') {
  if (SUPABASE_URL && SUPABASE_KEY) {
    supabase = createClient(String(SUPABASE_URL), String(SUPABASE_KEY));
  } else {
    console.error('Supabase URL or Key is not defined in client environment. Supabase client will not be initialized.');
  }
}

// 2. Supabase 실시간 통신을 관리하는 커스텀 훅
export const useSupabaseRealtime = (user, chatRoomId, onNewMessage, onTyping) => {
  const channel = useRef(null);
  const typingTimeoutRef = useRef(null);
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);

  useEffect(() => {
    // Supabase 클라이언트 또는 유저 ID가 없으면 아무 작업도 하지 않습니다.
    if (!supabase || !user?.id) { // chatRoomId 조건 제거
      return;
    }

    const userId = user.id;
    // UX 개선: 사용자가 어떤 채팅방을 보고 있든 실시간 업데이트를 받도록
    // 'user-{userId}' 채널을 구독하여 자신에게 온 모든 메시지를 수신합니다.
    channel.current = supabase.channel(`user-${userId}`, {
      config: {
        presence: { key: String(userId) },
      },
    });

    // "message" 이벤트를 구독합니다.
    const messageSubscription = channel.current.on("broadcast", { event: "message" }, (payload) => {
      const message = payload.payload;
      // 내가 보낸 메시지가 아닐 경우에만 onNewMessage 콜백을 호출합니다。
      if (message && message.uid && message.senderId !== userId) {
        onNewMessage(message);
      }
    });

    // "typing" 이벤트를 구독합니다.
    const typingSubscription = channel.current.on("broadcast", { event: "typing" }, ({ payload }) => {
      if (payload.userId !== userId) {
        setIsOpponentTyping(true);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        // 1.5초 후에 타이핑 상태를 false로 변경합니다.
        typingTimeoutRef.current = setTimeout(() => {
          setIsOpponentTyping(false);
        }, 1500);
        // onTyping 콜백을 호출하여 외부 상태를 업데이트 할 수도 있습니다.
        if(onTyping) onTyping(true); 
      }
    });

    // 채널 구독을 시작합니다.
    channel.current.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        // 구독이 성공하면 현재 사용자의 접속 상태를 트래킹합니다.
        channel.current.track({ online_at: new Date().toISOString(), userId, userName: user.name });
      }
    });

    // 컴포넌트가 언마운트될 때 정리 함수를 실행합니다.
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      // 채널 구독을 해제합니다.
      channel.current?.unsubscribe();
    };
    // 주석: 의존성 배열은 Remix 코드의 원본을 따릅니다。
  }, [user?.id, user?.name, onNewMessage, onTyping]);

  // 타이핑 이벤트를 Supabase 채널로 전송하는 함수
  const sendTypingEvent = () => {
    if (channel.current) {
      channel.current.send({
        type: 'broadcast',
        event: 'typing',
        payload: { userId: user?.id },
      });
    }
  };

  return { isOpponentTyping, sendTypingEvent };
};