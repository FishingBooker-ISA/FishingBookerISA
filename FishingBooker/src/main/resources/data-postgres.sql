INSERT INTO role (name) VALUES ('ROLE_CLIENT');
INSERT INTO role (name) VALUES ('ROLE_ADMIN');
INSERT INTO role (name) VALUES ('ROLE_ESTATE_OWNER');
INSERT INTO role (name) VALUES ('ROLE_SHIP_OWNER');
INSERT INTO role (name) VALUES ('ROLE_INSTRUCTOR');
--address
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Maksima Gorkog', 22, 'Novi Sad', 'Serbia', 21000, 19.84885562646173, 45.25066280867332);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Dunavska', 5, 'Novi Sad', 'Serbia', 21000, 19.76868508413171, 45.24536714122308);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Leptirova', 42, 'Veternik', 'Serbia', 21203, 19.7603227976264, 45.24252726140071);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Balkanska', 38, 'Beograd', 'Serbia', 11000, 20.458517712952233, 44.80905504784909);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Dr Sime Milosevica', 10, 'Novi Sad', 'Serbia', 21000, 19.84963092646159, 45.2454698181676);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Nemanjina', 15, 'Beograd', 'Serbia', 11000, 20.462532297612004, 44.80542107105509);

--users
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 1, 'Petra', 'Jovic', 'admin@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 2, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, num_of_penalties, role_id, address_id, points, first_time) VALUES ('CLIENT', 2, 'Ivan', 'Maric', 'andjela.ra28@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 0, 1, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, num_of_penalties, role_id, address_id, points, first_time) VALUES ('CLIENT', 3, 'John', 'Doe', 'a@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 0, 1, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 4, 'Andjela', 'Djuric', 'jovic.petra99@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 3, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 5, 'Ana', 'Grahovac', 'grahovac.ana99@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 4, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 6, 'Milan', 'Savic', 'pexandjana@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 5, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 7, 'Luka', 'Tanasijevic', 'luka@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 5, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 8, 'Jelena', 'Djokic', 'jelena@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 3, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 9, 'Zarko', 'Nedeljkov', 'zarko@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 4, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 10, 'Djordje', 'Damjanovic', 'djordje@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, false, 4, 1, 0, false);



--adventures
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (1, 5, 'Fun fishing experience for beginners', false, 'Beginners Class', 0, 20, 'Rules', 2, 1, 6, 'Something about instructor');
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (2, 2, 'Improve your fishing skills guided by the best', false, 'Professional Class', 0, 40, 'Many rules', 2, 2, 6, 'Something about instructor');
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (3, 10, 'Fun fishing experience for larger groups', false, 'Group Class', 0, 10, 'MANY rules', 2, 3, 6, 'Something about instructor');
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (4, 15, 'Adventure!', false, 'All day adventure', 0, 50, 'No rules! Only fun!', 2, 4, 7, 'Something about instructor');
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (5, 10, 'Fishing adventure', false, 'Fishing adventure', 0, 35, 'Safety rules.', 2, 6, 7, 'Something about instructor');
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (6, 1, 'Fishing adventure', false, 'Individual class', 0, 35, 'Safety rules.', 2, 6, 7, 'Something about instructor');

--estates
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (7, 3, 'Comfortable and modern villa with a view.', false, 'Villa Aurora', 0, 40, 'No smoking indoors.', 0, 2, 4, 3, 2);
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (8, 10, 'Spacious villa suitable for groups.', false, 'Villa Safari', 0, 60, 'Terms of use.', 0, 3, 4, 11, 6);
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (9, 4, 'Family cottage you will fall in love with.', false, 'Lakeview cottage', 0, 30, 'Pets are allowed.', 0, 4, 4, 4, 2);
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (10, 5, 'Spacious villa on the edge of the woods.', false, 'Green palace', 0, 60, 'Terms of use.', 0, 5, 8, 5, 3);
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (11, 2, 'Lovely cottage for two.', false, 'Coast house', 0, 20, 'Terms of use.', 0, 6, 8, 1, 1);

--ships
INSERT INTO ship (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, length, max_speed, num_of_engines, power_of_engines, ship_type)
VALUES (12, 8, 'Mauris cursus mattis molestie a iaculis. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Ornare quam viverra orci sagittis eu volutpat odio facilisis.', false, 'Skye', 0, 40, 'Terms of use.', 1, 2, 5, 5, 50, 3, 100, 0);
INSERT INTO ship (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, length, max_speed, num_of_engines, power_of_engines, ship_type)
VALUES (13, 10, 'Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Feugiat in fermentum posuere urna nec.', false, 'Poseidon', 0, 60, 'Terms of use.', 1, 3, 5, 3, 50, 3, 100, 1);
INSERT INTO ship (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, length, max_speed, num_of_engines, power_of_engines, ship_type)
VALUES (14, 4, 'Morbi tincidunt augue interdum velit. Erat velit scelerisque in dictum. Sodales neque sodales ut etiam sit amet. Tortor consequat id porta nibh venenatis.', false, 'Wavemaster', 0, 30, 'Terms of use.', 1, 4, 5, 3, 50, 3, 100, 1);
INSERT INTO ship (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, length, max_speed, num_of_engines, power_of_engines, ship_type)
VALUES (15, 15, 'Lacus sed viverra tellus in hac habitasse. Nunc congue nisi vitae suscipit tellus mauris.', false, 'Compass', 0, 60, 'Terms of use.', 1, 5, 9, 3, 50, 3, 100, 0);
INSERT INTO ship (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, length, max_speed, num_of_engines, power_of_engines, ship_type)
VALUES (16, 6, 'Aliquam purus sit amet luctus venenatis lectus magna fringilla urna.', false, 'Cruiser', 0, 20, 'Terms of use.', 1, 6, 9, 3, 50, 3, 100, 1);

--resevations
INSERT INTO reservation (additional_equipment, is_canceled, is_promo, price, reservation_start, reservation_end, reserved_date, service_id, user_id)
    VALUES ('service1, service2, service3', false, false, 100, DATE '2021-12-17', DATE '2021-12-27', DATE '2021-11-13', 7, 2);
INSERT INTO reservation (additional_equipment, is_canceled, is_promo, price, reservation_start, reservation_end, reserved_date, service_id, user_id)
    VALUES ('service1', true, false, 80, DATE '2021-11-22', DATE '2021-11-25', DATE '2021-11-10', 7, 2);
INSERT INTO reservation (additional_equipment, is_canceled, is_promo, price, reservation_start, reservation_end, reserved_date, service_id, user_id)
VALUES ('service1, service2, service3', false, false, 125, DATE '2022-01-24', DATE '2022-03-01', DATE '2022-01-14', 1, 2);
INSERT INTO reservation (additional_equipment, is_canceled, is_promo, price, reservation_start, reservation_end, reserved_date, service_id, user_id)
VALUES ('service1, service2, service3', false, false, 125, DATE '2022-03-07', DATE '2022-03-08', DATE '2022-01-14', 1, 2);
INSERT INTO reservation (additional_equipment, is_canceled, is_promo, price, reservation_start, reservation_end, reserved_date, service_id, user_id)
    VALUES ('service1, service2, service3, service 4', false, false, 125, DATE '2021-06-04', DATE '2021-06-12', DATE '2021-05-23',13, 2);
INSERT INTO reservation (
    additional_equipment, is_canceled, is_promo, price, reservation_end, reservation_start, reserved_date, ship_owner_role, service_id, user_id)
VALUES ('bla bla', false, false, 200.0, DATE '2022-01-30', DATE '2022-01-15', DATE '2021-12-17', 0, 6, 2);

--rating
INSERT INTO rating (description, given_mark, is_approved, is_reviewed, service_id, user_id)
VALUES ('Great service. See you again soon. :)', 5, true, false, 1, 2);
INSERT INTO rating (description, given_mark, is_approved, is_reviewed, service_id, user_id)
VALUES ('Amazing instructor!!', 5, true, false, 9, 2);
INSERT INTO rating (description, given_mark, is_approved, is_reviewed, service_id, user_id)
VALUES ('Not impressed.', 3, true, false, 15, 3);

---complaints
INSERT INTO complaint (created_date, is_complaint_on_owner, is_reviewed, reason, client_id, owner_id, version)
    VALUES (DATE '2021-12-17', true, false, 'He was never on time.', 2, 9, 0);
INSERT INTO complaint (created_date, is_complaint_on_owner, is_reviewed, reason, client_id, owner_id, version)
    VALUES (DATE '2021-11-10', false, false, 'Place was too dirty.', 3, 4, 0);

--loyality program
INSERT INTO loyalty_program ( percent_for_bronze, percent_for_gold, percent_for_silver, points_for_bronze, points_for_gold, points_for_silver, points_for_user, points_for_owner, percentage_for_app)
VALUES (10.0, 30.0, 20.0, 100.0, 300.0, 200.0, 10.0, 10.0, 5.0);


--additional services
INSERT INTO additional_service ( name, price, service_id)
VALUES  ('Fishing stick', 10, 1), ('Fishing stick', 10, 2), ('Fishing stick', 10, 3), ('Fishing stick', 10, 4), ('Fishing stick', 10, 5), ('Fishing stick', 10, 6),
        ('Baits', 15, 1), ('Baits', 15, 2), ('Baits', 15, 3), ('Baits', 15, 4), ('Baits', 15, 5), ('Baits', 15, 6),
       ('WiFi', 0, 7), ('Iron', 10, 7), ('Air Conditioning', 0, 7), ('TV', 10, 7), ('Parking', 10, 7),
        ('WiFi', 0, 8), ('Iron', 10, 8), ('Air Conditioning', 0, 8), ('TV', 10, 8), ('Parking', 10, 8),
        ('WiFi', 0, 9), ('Iron', 10, 9), ('Air Conditioning', 0, 9), ('TV', 10, 9),  ('Parking', 10, 9),
        ('Mini Bar', 0, 10), ('WiFi', 10, 10), ('Air Conditioning', 0, 10), ('TV', 10, 10), ('Parking', 10, 10),
        ('WiFi', 0, 11), ('Iron', 10, 11), ('Air Conditioning', 0, 11), ('TV', 10, 11), ('Parking', 10, 11),
        ('WiFi', 0, 11), ('Iron', 10, 11), ('Air Conditioning', 0, 11), ('TV', 10, 11), ('Parking', 10, 11),
        ('Mini Bar', 20, 12), ('WiFi', 10, 12),  ('Mini Bar', 20, 13), ('WiFi', 10, 13 ),  ('Mini Bar', 20, 14 ), ('WiFi', 10, 14),
        ('Mini Bar', 20, 15), ('WiFi', 10, 15),  ('Mini Bar', 20, 16), ('WiFi', 10, 16);


--unavailable periods
INSERT INTO unavailable_period(end_date, start_date, service_id)
VALUES (DATE '2022-03-01', '2022-02-27', 1);
INSERT INTO unavailable_period(end_date, start_date, service_id)
VALUES (DATE '2022-02-06', '2022-02-02', 7);
INSERT INTO unavailable_period(end_date, start_date, service_id)
VALUES (DATE '2022-02-28', '2022-02-20', 12);

--promo actions
INSERT INTO promo_action(
    additional, capacity, duration_in_days, end_date, is_taken, price_per_day, start_date, service_id)
VALUES ('Wifi, Air Conditioning', 5, 10, DATE '2022-02-20', false, 20, DATE '2022-02-15', 7);
INSERT INTO promo_action(
    additional, capacity, duration_in_days, end_date, is_taken, price_per_day, start_date, service_id)
VALUES ('Baits', 10, 1, DATE '2022-02-10', false, 30, DATE '2022-02-09', 1);
INSERT INTO promo_action(
    additional, capacity, duration_in_days, end_date, is_taken, price_per_day, start_date, service_id)
VALUES ('MiniBar, WiFI', 5, 10, DATE '2022-02-10', false, 100, DATE '2022-02-01', 12);

--reports
INSERT INTO report (
    client_didnt_show_up, created_on, is_reviewed, sanction_client, text, reservation_id)
VALUES (false, DATE '2021-12-17', false, true, 'Left a huge mess.', 1);
INSERT INTO report (
    client_didnt_show_up, created_on, is_reviewed, sanction_client, text, reservation_id)
VALUES (false, DATE '2021-12-22', false, true, 'Bad behavior', 4);

--ship navigation tool
INSERT into ship_navigation_tool (
     name, description, ship_id)
VALUES ('Radar', 'Aliquam purus sit amet', 12), ('Fluxgate compass', 'Aliquam purus sit amet compass', 12), ('Radar', 'Aliquam purus sit amet', 13), ('Fluxgate compass', 'Aliquam purus sit amet', 13),
        ('Radar', 'Aliquam purus sit amet', 14), ('Aliquam purus sit amet', 'Aliquam purus sit amet', 14),('Radar', 'Aliquam purus sit amet', 15), ('Fluxgate compass', 'Fluxgate compass', 15),
        ('Radar', 'Aliquam purus sit amet', 16), ('Aliquam purus sit amet', 'Aliquam purus sit amet', 16);

INSERT INTO account_deletion_request (
    denial_reason, is_denied, is_reviewed, reason, requested_date, version, user_id)
VALUES ('', false, false, 'I dont need it anymore.', DATE '2021-12-22', 0, 9), ('', false, false, 'I sold my house.', DATE '2022-01-22', 0, 8);

INSERT INTO account_request (
     denial_reason, is_denied, is_reviewed, reason, version, user_id)
VALUES ('', false, false, 'I want to use my ship.', 0, 10);