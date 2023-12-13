// components/GetLogin.js
import React, { useContext, useState, useEffect } from 'react';
import DataContext from '../context/dataContext';
import { io } from 'socket.io-client';
import axios from 'axios';
import '../App.css';

const GetLogin = () => {
  const userId = sessionStorage.getItem('userId');
  const [userName, setUserName] = useState('');
  const { startQuiz, showStart } = useContext(DataContext);
  const [userRankings, setUserRankings] = useState([]);
  // console.log("가져온 userId 값: ", userId);

  const withDraw = async () => {
    // 네이버 로그인 API 토큰 폐기 엔드포인트 URL
    const revokeUrl = 'https://nid.naver.com/oauth2.0/token';

    // 네이버 개발자 애플리케이션 정보
    const clientId = 'vwTn9B_7NMCCeNpv4BxU';
    const clientSecret = 'nPmJeh9jPb';

    // 사용자의 토큰 값
    const accessToken = '사용자_ACCESS_TOKEN';

    try {
      // 토큰 폐기 요청
      const response = await axios.get(revokeUrl, {
        params: {
          grant_type: 'delete',
          client_id: clientId,
          client_secret: clientSecret,
          access_token: accessToken,
        },
      });

      // 응답 확인
      if (response.status === 200) {
        console.log('네이버 로그인 API 토큰 폐기 성공');
        // 여기에 토큰이 성공적으로 폐기되었을 때 수행할 작업을 추가할 수 있습니다.
      } else {
        console.log('네이버 로그인 API 토큰 폐기 실패');
      }
    } catch (error) {
      console.error('네이버 로그인 API 토큰 폐기 중 오류 발생:', error.message);
    }
  };

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
      {/*<button onClick={withDraw}>탈퇴하기</button>*/}
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
                  {userRankings.map((ranking, index) => (
                    <tr key={index + 1}>
                      <td>{index+1} 등</td>
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
