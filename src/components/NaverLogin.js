// components/NaverLogin.js

import React from 'react';
import NaverLogin from 'react-naver-login';
import '../styles/Login.css';

const NaverLoginButton = () => {
  const NaverClientId = 'vwTn9B_7NMCCeNpv4BxU';

  // 1. 로그인 성공 후의 동작
  const responseNaver = (response) => {
    var result = response;
    console.log(result);
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