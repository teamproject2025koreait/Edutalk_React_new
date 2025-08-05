import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NoticesContent from '../ui/sidebar/Notices.jsx';
import ChatsContent from '../ui/sidebar/Chats.jsx';
import { useSidebarTabs } from '../../hooks/useSidebarTabs.jsx';
import { dashboard } from '../../styles/dashboard'; // dashboard 스타일 임포트



export function SidebarPanel({
  setIsSidebarOpen,
  user,
  isMobile,
}) {
  const navigate = useNavigate();
  const { sidebarTab, tabs, handleTabClick } = useSidebarTabs();
  const token= localStorage.getItem('authToken');
  return (
    <motion.div
      className={dashboard.sidebar.panel}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Tab Header */}
      <div className={dashboard.sidebar.tab.header}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              handleTabClick(tab);
              if (!isMobile) {
                navigate(`${tab.mainTab}?token=${token}`);
                if (setIsSidebarOpen) {
                  setIsSidebarOpen(false);
                }
              }
            }}
            className={`${dashboard.sidebar.tab.button} ${
              sidebarTab === tab.id
                ? dashboard.sidebar.tab.buttonActive
                : dashboard.sidebar.tab.buttonInactive
            }`}
          >
            {tab.icon}
            <span className={dashboard.sidebar.tab.label}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-neutral-900">
        <div className="p-3 sm:p-4">
          {sidebarTab === "notices" && <NoticesContent />}
          {sidebarTab === "chats" && (
            <ChatsContent
              user={user}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

const Sidebar=({ user })=> {
  const { sidebarTab: activeTab } = useSidebarTabs();

    return (
      <div className={dashboard.sidebar.desktop}>
        <SidebarPanel
          user={user}
          sidebarTab={activeTab}
        />
      </div>
    );
  }

export default Sidebar;