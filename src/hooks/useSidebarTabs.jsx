import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const useSidebarTabs = () => {
  const location = useLocation();

  // 현재 경로에 따라 활성 탭 설정
  let initialActiveTab = "notices";
  if (location.pathname.includes("/chats")) {
    initialActiveTab = "chats";
  }
  const [sidebarTab, setSidebarTab] = useState(initialActiveTab);

  const tabs = [
    {
      id: "notices",
      label: "공지사항",
      mainTab: "/dashboard/notices",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      id: "chats",
      label: "채팅",
      mainTab: "/dashboard/chats",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ];

  const handleTabClick = useCallback((tab) => {
    setSidebarTab(tab.id);
  }, []);

  return {
    sidebarTab,
    setSidebarTab,
    tabs,
    handleTabClick
  };
};
