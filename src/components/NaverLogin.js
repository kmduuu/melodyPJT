// components/NaverLogin.js

import React from 'react';
import NaverLogin from 'react-naver-login';
import '../styles/Login.css';
import { io } from 'socket.io-client';

const NaverLoginButton = () => {
  const NaverClientId = 'vwTn9B_7NMCCeNpv4BxU';

  const socket = io('http://192.168.55.20:3001');

  // 1. 로그인 성공 후의 동작
  const responseNaver = (response) => {
    var result = response;
    console.log(result);
    alert("로그인 완료, 이제 기존 가입 회원인지 확인한다.");
    socket.emit('naverLogin', result);
    socket.on('message', (data) => {
      // data 값은 0과 1로 구성하기
      console.log('Received message from server : ', data);
      //if문으로 확인 후... 맞으면
      
    })
  };

  const error = (error) => {
    console.log(error);
  }


  return (
    <div className='centered'>
      <NaverLogin
        clientId={NaverClientId}
        callbackUrl="http://localhost:3000/"
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