show databases;
select * from user;
select user_name from user where user_id = 'l6suZ01TkXiTrDnu_V85CiF2nhKJZgOemWxxmUfwr44';

CREATE TABLE user_ranking (
  user_rank INT NOT NULL,
  user_id VARCHAR(50),
  PRIMARY KEY (user_rank),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE user_ranking (
  user_rank INT NOT NULL,
  user_name VARCHAR(50),
  PRIMARY KEY (user_rank)
);

select * from user_ranking;

ALTER TABLE user_ranking
ADD COLUMN user_id varchar(50);

SELECT * FROM user_ranking;

# user_id를 user_rank 뒤로 붙이기(위치변경)
# ALTER TABLE user_ranking MODIFY COLUMN user_id VARCHAR(50) AFTER user_rank;

INSERT INTO user (user_id, user_name, user_email)
VALUES 
('eksooho', '김수호', 'eksooho12@naver.com'),
('hansoo12', '김한수', 'hansoo12@naver.com'),
('rlaskawn_12', '김남주', 'skawn@naver.com'),
('bnyux', '김유빈', 'bnyux@naver.com'),
('honni', '궁훈', 'wjsgmldud@naver.com'),
('eriksen_denmark', '에릭센', 'fifaEasports@naver.com'),
('junsuu', '정준수', 'junnn@naver.com'),
('gnlEnfnakEnfn', '이휘근', 'gnlEnfnakXnfn@naver.com'),
('youngjae', '장영재', 'gudwo@naver.com');

# user_ranking의 컬럼 user_id를 user의 user_id를 외래키로 둔다.
ALTER TABLE user_ranking
ADD FOREIGN KEY (user_id) REFERENCES user(user_id);

ALTER TABLE user_ranking
ADD COLUMN user_picture VARCHAR(50);

drop table user_ranking;

CREATE TABLE user_ranking (
  user_rank INT NOT NULL,
  user_id VARCHAR(50),
  user_name varchar(10),
  user_score int,
  user_picture varchar(100),
  PRIMARY KEY (user_rank),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

ALTER TABLE user_ranking MODIFY COLUMN user_picture VARCHAR(100) AFTER user_score;

ALTER table user_ranking drop column user_rank;

select * from user_ranking order by user_score DESC