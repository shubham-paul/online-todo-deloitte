DROP TABLE IF EXISTS User_tbl;
CREATE TABLE IF NOT EXISTS User_tbl (
  userId INT NOT NULL,
  userName VARCHAR(100) NOT NULL,
  password VARCHAR (100) NOT NULL,
  CONSTRAINT PK_User_tbl PRIMARY KEY ( userId )
);

DROP TABLE IF EXISTS Task_tbl;
CREATE TABLE IF NOT EXISTS Task_tbl (
  taskId INT NOT NULL,
  userId INT NOT NULL,
  taskName VARCHAR (100) NOT NULL,
  description VARCHAR (500) NULL ,
  lastUpdated DATE NULL,
  taskStatus BIT NOT NULL,
  CONSTRAINT PK_Task_tbl PRIMARY KEY ( taskId )
);



