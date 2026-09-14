import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SplitScreen from './screens/SplitScreen';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#e8e8ec] flex items-center justify-center">
        {/* 모든 라우트 공통 375×812 프레임 */}
        <div style={{ position: 'relative', width: '375px', height: '812px', overflow: 'hidden', flexShrink: 0 }}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/split" element={<SplitScreen />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
