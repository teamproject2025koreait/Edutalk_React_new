import { chat } from "../../../styles/chat";
import { useEffect } from "react";
import MessageItem from "./MessageItem";

const ChatMessage =({ 
  messages, 
  messagesEndRef,
  autoScroll = true 
})=>{
    useEffect(() => {
        console.log('ChatMessage - messages prop updated:', messages);
        if (autoScroll && messagesEndRef?.current) {
        // requestAnimationFrame으로 DOM 업데이트 완료 후 스크롤
        requestAnimationFrame(() => {
            if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
            }
        });
        }
    }, [messages, autoScroll, messagesEndRef]);

    return(
    <div className="h-full flex flex-col overflow-hidden">
      {/* 스크롤 가능한 메시지 컨테이너 - 고정 높이 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className={chat.messages.container}>
          {/* 실제 메시지 */}
          {messages.map((message, index) => (
            <MessageItem key={message.id || `msg-${index}`} message={message} />
          ))}
          {/* 스크롤 앵커 */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
    )
}


export default ChatMessage;