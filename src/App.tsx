import { BrowserRouter } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#e8e8ec] flex items-center justify-center">
        <HomeScreen />
      </div>
    </BrowserRouter>
  );
}
