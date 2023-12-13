import React, { useState } from 'react';
import { io } from 'socket.io-client';

function SignUp() {
    const socket = io('http://192.168.0.19:3001');

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    console.log("1111111111111111111111111111",userId, userName, userEmail)
    const [enteredCode, setEnteredCode] = useState(''); // 사용자가 입력하는 인증번호
    const [serverCode, setServerCode] = useState('');   // 서버에서 받은 인증번호

    const requestVerification = () => {
        socket.emit('userEmail', userEmail);
        alert("인증번호를 전송했습니다.");
        socket.on('userEmail', number => { 
            console.log("받아온 인증번호 값 : ", number);
            setServerCode(number); // 서버에서 받은 인증번호 저장
        });
    };

    const handleCodeChange = (e) => {
        setEnteredCode(e.target.value); // 사용자 입력 인증번호 저장
    };

    const verifyEmail = () => {
        console.log("enteredCode : ", enteredCode);
        console.log("serverCode : ", serverCode);
        if (enteredCode == serverCode) {
            console.log('Email verified successfully.');
            // 세션 등록
            sessionStorage.setItem('userId', userId);
            socket.emit('verifyUser', {userId, userName, userEmail});
            alert(""+userName+"님, 가입을 환영합니다.")
            window.location.href='/getLogin';
        } else {
            alert("인증에 실패하였습니다.");
            console.log('Incorrect verification code.');
            return;
            // 인증 실패 처리 로직
        }
    };

    return (
        <div>
            <input type="email" value={userEmail} readOnly/>
            <button onClick={requestVerification}>인증번호 발송</button>

            <input type="text" value={enteredCode} onChange={handleCodeChange} placeholder="인증번호를 입력하시오." />
            <button onClick={verifyEmail}>인증번호 확인</button>
        </div>
    );
}

export default SignUp;
