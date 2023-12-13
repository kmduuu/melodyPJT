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


