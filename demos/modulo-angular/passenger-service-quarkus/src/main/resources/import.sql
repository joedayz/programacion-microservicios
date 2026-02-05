INSERT INTO passengers (id, fullname, checkedIn, checkInDate) VALUES (1, 'Jens Alejos', true, 1490742000000);
INSERT INTO passengers (id, fullname, checkedIn, checkInDate) VALUES (2, 'Rose Namajunas', false, NULL);
INSERT INTO passengers (id, fullname, checkedIn, checkInDate) VALUES (3, 'James', true, 1491606000000);
INSERT INTO passengers (id, fullname, checkedIn, checkInDate) VALUES (4, 'Louise', true, 1488412800000);
INSERT INTO passengers (id, fullname, checkedIn, checkInDate) VALUES (5, 'Tina', false, NULL);

INSERT INTO children (id, name, age, passenger_id) VALUES (1, 'Ted', 12, 2);
INSERT INTO children (id, name, age, passenger_id) VALUES (2, 'Chloe', 7, 2);
INSERT INTO children (id, name, age, passenger_id) VALUES (3, 'Jessica', 1, 4);
-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;