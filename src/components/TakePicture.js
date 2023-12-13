import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const TakePicture = () => {
  const [userId, setUserId] = useState("yourUserId");
  const [userName, setUserName] = useState("yourUserName");
  const socket = io('http://192.168.0.19:3001');
  const navigate = useNavigate();

  // 컴포넌트가 처음 렌더링될 때 localStorage에서 값을 가져와 설정
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');

    if (storedUserId) {
      setUserId(storedUserId);
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const sendDataToNodeServer = () => {
    // localStorage에 userId와 userName 저장
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    // 소켓 통신으로 데이터 전송
    socket.emit('pictureCamera', { userId, userName });
    // 절대 경로로 페이지 이동
    window.location.href = 'http://192.168.0.19:8000/index.html';
  };

  return (
    <div>
      <button style={{ marginTop: '200px' }} onClick={sendDataToNodeServer}>
        사진찍기
      </button>
    </div>
  );
};

export default TakePicture;
