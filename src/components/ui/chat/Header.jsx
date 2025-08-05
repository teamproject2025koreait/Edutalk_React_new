import { chat } from "../../../styles/chat";

const ChatHeader =({ user, isOpponentTyping })=>{

    return(
 <div className={chat.header.container}>
      <div className={chat.header.leftSection}>
        <div className={chat.header.avatar.container}>
          <img 
            src={user.avatar} 
            alt={user.name}
            className={chat.header.avatar.picture}
          />
          {user.status === "online" ? 
            <div className={chat.header.avatar.status.online}></div>
          :
            <div className={chat.header.avatar.status.offline}></div>
          }
        </div>
        <div className={chat.header.user.info}>
          <h3 className={chat.header.user.name}>{user.name}</h3>
          <p className={`${chat.header.user.status} ${isOpponentTyping ? "text-blue-600" : user.status === "online" ? "text-success-600" : "text-neutral-500"}`}>
            {isOpponentTyping ? "상대방이 입력 중..." : (user.status === "online" ? "온라인" : "오프라인")}
          </p>

        </div>
      </div>
    </div>
    )
}


export default ChatHeader;