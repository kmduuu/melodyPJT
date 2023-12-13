// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GetLogin from './components/GetLogin';
import NaverLoginButton from './components/NaverLogin';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { DataProvider } from './context/dataContext';
import SignUp from './components/SignUp';

function App() {
  return (
    <DataProvider>
    <Result/>
    <Quiz/>
    <Router>
        <Routes>
          <Route path="/" element={<NaverLoginButton />} />
          <Route path="/getLogin" element={<GetLogin />} />
          <Route path="/signUp" element={<SignUp />}/>
          {/* 기타 경로 */}
        </Routes>
    </Router>
    </DataProvider>
  );
}

export default App;
