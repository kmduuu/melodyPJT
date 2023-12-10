// App.js

import React from 'react';
import './App.css'; // CSS 파일 임포트
import NaverLoginButton from './components/NaverLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        MELODY GAME
      </header>
      <div> {/* 'body' 대신 'div' 사용 */}
        <NaverLoginButton />
      </div>
    </div>
  );
}

export default App;