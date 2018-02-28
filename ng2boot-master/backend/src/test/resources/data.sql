delete from User_tbl;
INSERT INTO User_tbl(userId,userName, password) VALUES(1,'John', 'John123');
INSERT INTO User_tbl(userId,userName, password) VALUES(2,'Lisa', 'Lisa123');

DELETE from Task_tbl;
INSERT INTO Task_tbl(taskId, userId, taskName, description, lastUpdated, taskStatus) VALUES(1,1, 'Test', 'Test', '2018-06-06', 1);
INSERT INTO Task_tbl(taskId, userId, taskName, description, lastUpdated, taskStatus) VALUES(2,1, 'Test', 'Test', '2018-06-06', 1);
