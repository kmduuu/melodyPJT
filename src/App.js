// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GetLogin from './components/GetLogin';
import NaverLoginButton from './components/NaverLogin';
import Start from './components/Start';
import Quiz from './components/Quiz';
import { DataProvider } from './context/dataContext';

function App() {
  return (
    <DataProvider>
    <Router>
        <Routes>
          <Route path="/" element={<NaverLoginButton />} />
          <Route path="/getLogin" element={<GetLogin />} />
          <Route path="/getStart" element={<Start/>}/>
          <Route path="/getQuiz" element={<Quiz/>}/>
          {/* 기타 경로 */}
        </Routes>
    </Router>
    </DataProvider>
  );
}

export default App;
