export const dummyChatHistories = {
  'chat-room-1': [
    {
      id: 'msg-1-1',
      sender: '이영희 선생님',
      message: '안녕하세요, 김철수 학생. 숙제에 대해 궁금한 점이 있으신가요?',
      timestamp: new Date(Date.now() - 60000 * 5),
      isOwn: false,
      type: 'text',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'delivered'
    },
    {
      id: 'msg-1-2',
      sender: '나',
      message: '네, 선생님. 3단원 문제 5번이 잘 이해가 안 됩니다.',
      timestamp: new Date(Date.now() - 60000 * 4),
      isOwn: true,
      type: 'text',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      status: 'delivered'
    },
    {
      id: 'msg-1-3',
      sender: '이영희 선생님',
      message: '아, 그 문제는 개념을 다시 한번 살펴보는 것이 중요해요. 잠시 후에 자세히 설명해 드릴게요.',
      timestamp: new Date(Date.now() - 60000 * 3),
      isOwn: false,
      type: 'text',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'delivered'
    },
  ],
  'chat-room-2': [
    {
      id: 'msg-2-1',
      sender: '최민준 선생님',
      message: '박지민 학생, 지난번 과제 잘 제출했어요. 수고 많았습니다.',
      timestamp: new Date(Date.now() - 60000 * 15),
      isOwn: false,
      type: 'text',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      status: 'delivered'
    },
    {
      id: 'msg-2-2',
      sender: '나',
      message: '감사합니다 선생님! 덕분입니다.',
      timestamp: new Date(Date.now() - 60000 * 14),
      isOwn: true,
      type: 'text',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      status: 'delivered'
    },
  ],
  'chat-room-3': [
    {
      id: 'msg-3-1',
      sender: '김현우 선생님',
      message: '정수아 학생, 다음 주 시험 범위는 1단원부터 4단원까지입니다.',
      timestamp: new Date(Date.now() - 60000 * 60 * 2),
      isOwn: false,
      type: 'text',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      status: 'delivered'
    },
    {
      id: 'msg-3-2',
      sender: '나',
      message: '네, 선생님. 알겠습니다. 감사합니다!',
      timestamp: new Date(Date.now() - 60000 * 60 * 1.5),
      isOwn: true,
      type: 'text',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      status: 'delivered'
    },
  ],
};