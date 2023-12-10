// components/NaverLogin.js

import React from 'react';
import NaverLogin from 'react-naver-login';
import '../styles/NaverLogin.css';
import { io } from 'socket.io-client';

const NaverLoginButton = () => {
  const NaverClientId = 'vwTn9B_7NMCCeNpv4BxU';

  const socket = io('http://192.168.55.130:3001');

  // 1. 로그인 성공 후의 동작
  const responseNaver = (response) => {
    var result = response;
    // alert("로그인 완료, 이제 기존 가입 회원인지 확인한다.");
    console.log(result);
    socket.emit('naverLogin', result);
    console.log("다시 리액트로 돌아옴.");

    socket.on('message', (data) => {
      console.log("불러온 값 : ", data);
    })
  };

  const error = (error) => {
    console.log(error);
  }

  return (
    <div className='centered'>
      <NaverLogin
        clientId={NaverClientId}
        callbackUrl="http://localhost:3000/LoginSuccess"
        render={(props) => (
          <button className='naver-login-button' onClick={props.onClick}>
            네이버로 로그인
          </button>
        )}
        onSuccess={responseNaver}
        onFailure={error}
      />
    </div>
  );
};

export default NaverLoginButton;