const mysql = require('mysql');

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'your-mysql-host',
  user: 'your-mysql-user',
  password: 'your-mysql-password',
  database: 'your-mysql-database',
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// 소켓 이벤트 처리
socket.on('userMarks', ({ userMarks, userId }) => {
  console.log('받아온 값 : ', userMarks, userId);

  // MySQL에서 해당 사용자의 현재 순위와 점수 가져오기
  const getUserRankQuery = `SELECT user_id, user_marks, RANK() OVER (ORDER BY user_marks DESC) as user_rank FROM user_ranking WHERE user_id = ?`;

  connection.query(getUserRankQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user rank from MySQL: ', err);
      return;
    }

    const userRankData = results[0];

    // 사용자의 현재 순위와 점수
    const currentUserRank = userRankData.user_rank;
    const currentUserMarks = userRankData.user_marks;

    // MySQL에서 상위 10명의 순위와 점수 가져오기
    const getTop10UsersQuery = `SELECT user_id, user_marks, RANK() OVER (ORDER BY user_marks DESC) as user_rank FROM user_ranking LIMIT 10`;

    connection.query(getTop10UsersQuery, (err, top10Results) => {
      if (err) {
        console.error('Error fetching top 10 users from MySQL: ', err);
        return;
      }

      // 사용자보다 점수가 높거나 같은 첫 번째 사람 찾기
      let nextHigherUserIndex = top10Results.findIndex(
        (user) => user.user_marks >= userMarks
      );

      // 만약 찾지 못하면 마지막 순위로 설정
      if (nextHigherUserIndex === -1) {
        nextHigherUserIndex = top10Results.length;
      }

      // 사용자를 top10Results에 삽입
      top10Results.splice(nextHigherUserIndex, 0, {
        user_id: userId,
        user_marks: userMarks,
        user_rank: currentUserRank,
      });

      // 상위 10명만 유지
      top10Results = top10Results.slice(0, 10);

      // MySQL에서 사용자와 상위 10명을 업데이트
      const updateTop10UsersQuery = `INSERT INTO user_ranking (user_id, user_marks) VALUES (?, ?) ON DUPLICATE KEY UPDATE user_marks = VALUES(user_marks)`;

      connection.query(
        updateTop10UsersQuery,
        top10Results.map((user) => [user.user_id, user.user_marks]),
        (err) => {
          if (err) {
            console.error('Error updating top 10 users in MySQL: ', err);
            return;
          }

          console.log('Top 10 users updated successfully');
        }
      );
    });
  });
});

// MySQL 연결 종료
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});
