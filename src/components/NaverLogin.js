// components/NaverLogin.js

import React from 'react';
import NaverLogin from 'react-naver-login';
import '../styles/NaverLogin.css';
import { io } from 'socket.io-client';

const NaverLoginButton = () => {
  const socket = io('http://192.168.0.19:3001');
  const NaverClientId = 'vwTn9B_7NMCCeNpv4BxU';

  // 1. 로그인 성공 후의 동작
  const responseNaver = (response) => {
    var result = response;
    console.log("네이버 로그인 완료, 이제 기존 가입 회원인지 확인한다.");
    console.log(result);
    socket.emit('naverLogin', result); // result 값 보내기 
    console.log("다시 리액트로 돌아옴.");

    socket.on('userRegister', (userId, userName, userEmail, isUserExist) => {
      console.log("불러온 값 : ", userId, isUserExist); // 성공적으로 수행...

      if(isUserExist === 1){ // 존재하는 아이디라면...

        sessionStorage.setItem('userId', userId);
        console.log("Session Storage에 저장된 아이디 : ", userId);
        window.location.href='/getLogin';

      } else{
        console.log("사용자가 존재하지 않음, 이메일 인증 페이지로 이동");
        // 값 저장
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userEmail', userEmail);

        console.log('userId, userName, userEmail', userId, userName, userEmail);
        // 페이지 이동
        alert("처음 가입하시면 이메일 인증이 필요합니다.")
        window.location.href = '/signUp';
      }
    });
  };
  const error = (error) => {
    console.log(error);
  }

  return (
    <div className='centered'>
      <div className="App">
        <header className="App-header">
          MELODY GAME
        </header>
      <NaverLogin
        clientId={NaverClientId}
        callbackUrl="http://192.168.0.57:3000/"
        render={(props) => (
          <button className='naver-login-button' onClick={props.onClick}>
            네이버로 로그인
          </button>
        )}
        onSuccess={responseNaver}
        onFailure={error}
      />
      </div>
    </div>
  );
};

export default NaverLoginButton;