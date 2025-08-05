import './App.css'
import RoutePage from './components/pages/main'
import { BrowserRouter
  ,Routes ,Route
 } from 'react-router-dom'
 import Auth from './components/pages/auth'
 import Dashboard from './components/pages/dashboard'
import ApiDashboard from './components/pages/api/Dashboard'
import ApiDocs from './components/pages/api/Docs'
import ApiKey from './components/pages/api/Key'
import Header from './components/layout/Header'
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ChatProvider } from './contexts/ChatContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { FontSizeProvider } from './contexts/FontSizeContext.jsx'; // FontSizeProvider 임포트 // ThemeProvider 임포트

function App() {
  return (
    <>
    <BrowserRouter>
      <ThemeProvider>
        <FontSizeProvider> {/* FontSizeProvider 추가 */}
          <AuthProvider>
            <ChatProvider>
              <Header/>
              <Routes>
                <Route path="/" element={<RoutePage/>} />
                <Route path="/auth/*" element={<Auth/>}/>
                <Route path="/dashboard/*" element={<Dashboard/>}/>
                <Route path="/api/dashboard" element={<ApiDashboard/>} />
                <Route path="/api/docs" element={<ApiDocs/>} />
                <Route path="/api/key" element={<ApiKey/>} />
              </Routes>
            </ChatProvider>
          </AuthProvider>
        </FontSizeProvider> {/* FontSizeProvider 추가 */}
      </ThemeProvider>
    </BrowserRouter>
      </>
  )
}

export default App
