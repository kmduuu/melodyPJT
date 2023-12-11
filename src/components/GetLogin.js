// components/GetLogin.js
import React, { useContext, useState, useEffect } from 'react';
import DataContext from '../context/dataContext';
import { io } from 'socket.io-client';
import '../App.css';

const GetLogin = () => {
  const userId = sessionStorage.getItem('userId');
  const [userName, setUserName] = useState('');
  const { startQuiz, showStart } = useContext(DataContext);
  const [userRankings, setUserRankings] = useState([]);

  // console.log("가져온 userId 값: ", userId);

  useEffect(() => {
    const socket = io('http://192.168.0.19:3001');

    if (userId) {
      socket.emit('whatIsUserName', userId);

      socket.on('gotUserName', (receivedUserName) => {
        setUserName(receivedUserName); // 상태 업데이트 함수를 사용해 userName을 설정합니다.
      });
    }

    // socket.io로 ranking 가져오기
    socket.emit('requestRankings');
    socket.on('rankingData', (userRankings) => {
      console.log("가져온 랭킹 : ", userRankings);
      console.log("212222222222222222222222222222")
      setUserRankings(userRankings);
    });

    return () => {
      socket.off('gotUserName');
      socket.off('rankingData');
      socket.close();
    };
  }, [userId], []);

  return (
    <section className='text-center' style={{ display: `${showStart ? 'block' : 'none'}` }}>
      <div>
        <h2 className='userNameIntroduce'>{userName}님, 환영합니다.</h2>
        {/* 추가 컨텐츠 */}
      </div>
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <h1 className='fw-bold mb-4'>멜로디 퀴즈</h1>
            <button onClick={startQuiz}>시작하기</button>
            <div className='RankView'>
              <h3>실시간 등수</h3>
              <table className='rank-table'>
                <thead>
                  <tr>
                    <th>등수</th>
                    <th>이름</th>
                    <th>점수</th>
                  </tr>
                </thead>
                <tbody>
                  {userRankings.map((ranking) => (
                    <tr key={ranking.user_rank}>
                      <td>{ranking.user_rank} 등</td>
                      <td className='output-content'>{ranking.user_name}</td>
                      <td className='output-content'>{ranking.user_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetLogin;
