import Sidebar from "../../layout/SideBar";
import { dashboard } from "../../../styles/dashboard";
import { Routes, Route, Outlet } from "react-router-dom";
import Chat from "../../layout/Chat";
import { useChat } from '../../../contexts/ChatContext.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx'; // useAuth 임포트 추가

const Dashboard=()=>{
    // const [user, setUser] = useState(null); // 제거
    // const [loadingUser, setLoadingUser] = useState(true); // 제거
    const { user, isLoggedIn } = useAuth(); // AuthContext에서 user와 isLoggedIn 가져오기
    useChat();

    // useEffect(() => { // dummyUser 설정 로직 제거
    //     const dummyUser = {
    //         id: "user-1",
    //         name: "김철수",
    //         userType: "student",
    //         avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    //     };
    //     setUser(dummyUser);
    //     setLoadingUser(false);
    // }, []);

    // user가 없거나 로그인되지 않았다면 로딩 상태로 간주
    if (!user || !isLoggedIn) {
      return <div className="flex items-center justify-center h-screen text-neutral-500">사용자 정보 로딩 중...</div>;
    }
    return(
        
        <div className={dashboard.layout.mainContent}>
            <Sidebar user={user}/>
            <div className="flex-1 p-4 lg:ml-64 xl:ml-72 2xl:ml-80">
                <Routes>
                    <Route path="/" element={<Outlet context={{ user }} />}>
                    {/* dashboard 페이지에 진입 했을 때, 아무것도 없다면 보여줄 문구 */}
                        <Route index element={(
                            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 bg-neutral-50/50">
                                <div className="p-8 border-2 border-dashed border-neutral-200 rounded-2xl bg-white">
                                    <svg className="w-16 h-16 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                    </svg>
                                    <h2 className="mt-4 text-lg font-semibold text-neutral-700">대화를 시작해보세요</h2>
                                    <p className="mt-1 text-sm text-neutral-500">왼쪽 목록에서 대화 상대를 선택하거나<br/>새로운 대화를 시작하여 소통을 시작하세요.</p>
                                </div>
                            </div>
                        )} />
                        <Route path="chats" element={<Chat />} />
                    </Route>
                </Routes>
            </div>
        </div>

    )
}


export default Dashboard;