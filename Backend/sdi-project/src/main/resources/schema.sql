create table TICKET(
                        ID int not null AUTO_INCREMENT,
                        EVENT_NAME VARCHAR(255) NOT NULL,
                        EVENT_DATE VARCHAR(255) NOT NULL,
                        PURCHASE_DATE VARCHAR(255) NOT NULL,
                        TYPE VARCHAR(50) NOT NULL,
                        TICKET_PRIORITY_LEVEL INT NOT NULL,
                        PRIMARY KEY ( ID )
);