import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './Onboarding/login';
import Home from './Home';
import Layout from './Layout';
import History from './history';
import Settings from './settings';
import Voicechat from './Voicechat'; 

function App() {
  return (
    <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/" element={<Layout />}>
          <Route index path="home" element={<Home />} />
          <Route path="voice-chat" element={<Voicechat />} /> 
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
  );
}

export default App;
