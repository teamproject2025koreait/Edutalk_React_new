export const dummyNotices = [
  {
    uid: 'notice-1',
    title: '새로운 강의 개설 안내',
    context: '2025년 가을학기 새로운 강의들이 개설되었습니다. 자세한 내용은 공지사항 게시판을 확인해주세요.',
    createTime: new Date(Date.now() - 60000 * 60 * 24 * 7).toISOString(), // 7일 전
    expirationTime: new Date(Date.now() + 60000 * 60 * 24 * 30).toISOString(), // 30일 후 만료
    displayOrder: 1,
  },
  {
    uid: 'notice-2',
    title: '시스템 점검 안내',
    context: '안정적인 서비스 제공을 위해 시스템 점검이 예정되어 있습니다. 점검 시간 동안 서비스 이용이 제한될 수 있습니다.',
    createTime: new Date(Date.now() - 60000 * 60 * 24 * 3).toISOString(), // 3일 전
    expirationTime: null, // 만료일 없음
    displayOrder: 0,
  },
  {
    uid: 'notice-3',
    title: '장학금 신청 기간 연장',
    context: '2025년 1학기 장학금 신청 기간이 8월 31일까지 연장되었습니다. 많은 신청 바랍니다.',
    createTime: new Date(Date.now() - 60000 * 60 * 24 * 10).toISOString(), // 10일 전
    expirationTime: new Date(Date.now() - 60000 * 60 * 24 * 1).toISOString(), // 어제 만료
    displayOrder: 2,
  },
  {
    uid: 'notice-4',
    title: '온라인 학습 자료 업데이트',
    context: '각 과목별 온라인 학습 자료가 최신 버전으로 업데이트되었습니다. 학습에 참고하시기 바랍니다.',
    createTime: new Date(Date.now() - 60000 * 60 * 24 * 2).toISOString(), // 2일 전
    expirationTime: null,
    displayOrder: 0,
  },
];