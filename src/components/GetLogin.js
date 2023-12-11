// components/GetLogin.js
import React from 'react';

const GetLogin = () => {
  const userId = sessionStorage.getItem('userId');
  console.log("userId 존재 : ", userId);
  if (!userId) {
    window.location.href='/';
    return <div>Redirecting to login...</div>;
  }

  return (
    <div>
      <h2>Welcome to GetLogin Page</h2>
      <p>User ID: {userId}</p>
      {/* 추가 컨텐츠 */}
    </div>
  );
};

export default GetLogin;
