INSERT INTO role (name) VALUES ('ROLE_CLIENT');
INSERT INTO role (name) VALUES ('ROLE_ADMIN');
INSERT INTO role (name) VALUES ('ROLE_ESTATE_OWNER');
INSERT INTO role (name) VALUES ('ROLE_SHIP_OWNER');
INSERT INTO role (name) VALUES ('ROLE_INSTRUCTOR');

--address
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Maksima Gorkog', 22, 'Novi Sad', 'Serbia', 21000, 2.1, 3.6);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Dunavska', 53, 'Novi Sad', 'Serbia', 21000, 2.1, 3.6);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Leptirova', 42, 'Veternik', 'Serbia', 21203, 2.1, 3.6);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Balkanska', 38, 'Beograd', 'Serbia', 11000, 2.1, 3.6);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Dunavska', 6, 'Novi Sad', 'Serbia', 21000, 2.1, 3.6);
INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Knez Mihajlova', 74, 'Beograd', 'Serbia', 11000, 2.1, 3.6);

--users
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 1, 'Petra', 'Jovic', 'admin@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 2, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, num_of_penalties, role_id, address_id, points, first_time) VALUES ('CLIENT', 2, 'Ivan', 'Maric', 'andjela.ra28@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 0, 1, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, num_of_penalties, role_id, address_id, points, first_time) VALUES ('CLIENT', 3, 'John', 'Doe', 'a@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 0, 1, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 4, 'Andjela', 'Djuric', 'andjela@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 3, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 5, 'Ana', 'Grahovac', 'ana@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 4, 1, 0, false);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id, points, first_time) VALUES ('User', 6, 'Milan', 'Savic', 'pexandjana@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 5, 1, 0, false);

--adventures
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (1, 5, 'Fun fishing experience for beginners', false, 'Beginners Class', 0, 20, 'Rules', 2, 1, 6, 'Something about instructor');
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (2, 2, 'Improve your fishing skills guided by the best', false, 'Professional Class', 0, 40, 'Many rules', 2, 2, 6, 'Something about instructor');
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (3, 10, 'Fun fishing experience for larger groups', false, 'Group Class', 0, 10, 'MANY rules', 2, 3, 5, 'Something about instructor');
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (4, 15, 'Adventure!', false, 'All day adventure', 0, 50, 'No rules! Only fun!', 2, 4, 5, 'Something about instructor');
INSERT INTO adventure (
    id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (5, 10, 'Fishing adventure', false, 'Fishing adventure', 0, 35, 'Safety rules.', 2, 5, 5, 'Something about instructor');

--estates
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (6, 3, 'Comfortable and modern villa with a view.', false, 'Villa Aurora', 0, 40, 'No smoking indoors.', 0, 2, 4, 3, 2);
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (7, 10, 'Spacious villa suitable for groups.', false, 'Villa Safari', 0, 60, 'Terms of use.', 0, 3, 4, 11, 6);
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (8, 4, 'Family cottage you will fall in love with.', false, 'Lakeview cottage', 0, 30, 'Pets are allowed.', 0, 4, 4, 4, 2);
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (9, 5, 'Spacious villa on the edge of the woods.', false, 'Green palace', 0, 60, 'Terms of use.', 0, 5, 4, 5, 3);
INSERT INTO estate (id, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, num_of_beds, num_of_rooms)
VALUES (10, 2, 'Lovely cottage for two.', false, 'Coast house', 0, 20, 'Terms of use.', 0, 6, 4, 1, 1);

--ships

--resevations
INSERT INTO reservation (additional_equipment, is_canceled, is_promo, price, reservation_start, reservation_end, reserved_date, service_id, user_id)
    VALUES ('service1, service2, service3', false, false, 100, DATE '2021-12-17', DATE '2021-12-27', DATE '2021-11-13', 3, 2);
INSERT INTO reservation (additional_equipment, is_canceled, is_promo, price, reservation_start, reservation_end, reserved_date, service_id, user_id)
    VALUES ('service1', true, false, 80, DATE '2021-11-22', DATE '2021-11-25', DATE '2021-11-10', 14, 2);
INSERT INTO reservation (additional_equipment, is_canceled, is_promo, price, reservation_start, reservation_end, reserved_date, service_id, user_id)
    VALUES ('service1, service2, service3', false, false, 125, DATE '2022-03-07', DATE '2022-03-08', DATE '2022-01-14', 1, 2);
INSERT INTO reservation (additional_equipment, is_canceled, is_promo, price, reservation_start, reservation_end, reserved_date, service_id, user_id)
    VALUES ('service1, service2, service3, service 4', false, false, 125, DATE '2021-06-04', DATE '2021-06-12', DATE '2021-05-23', 10, 2);

--rating
INSERT INTO rating (description, given_mark, is_approved, is_reviewed, service_id, user_id)
VALUES ('Great service. See you again soon. :)', 5, false, false, 1, 2);
INSERT INTO rating (description, given_mark, is_approved, is_reviewed, service_id, user_id)
VALUES ('Great service. See you again soon. :)', 5, true, true, 2, 3);
INSERT INTO rating (description, given_mark, is_approved, is_reviewed, service_id, user_id)
VALUES ('Not impressed.', 3, false, true, 7, 3);

---complaints
INSERT INTO complaint (created_date, is_complaint_on_owner, is_reviewed, reason, client_id, owner_id)
    VALUES (DATE '2021-12-17', true, false, 'He was never on time.', 2, 5);
INSERT INTO complaint (created_date, is_complaint_on_owner, is_reviewed, reason, client_id, owner_id)
    VALUES (DATE '2021-12-17', true, false, 'He was never on time.', 3, 5);

--loyality program
INSERT INTO loyalty_program ( percent_for_bronze, percent_for_gold, percent_for_silver, points_for_bronze, points_for_gold, points_for_silver, points_for_user, points_for_owner, percentage_for_app)
VALUES (10.0, 30.0, 20.0, 100.0, 300.0, 200.0, 10.0, 10.0, 5.0);

--reservations
INSERT INTO reservation (
     additional_equipment, is_canceled, is_promo, price, reservation_end, reservation_start, reserved_date, ship_owner_role, service_id, user_id)
VALUES ('bla bla', false, false, 200.0, DATE '2022-01-30', DATE '2022-01-15', DATE '2021-12-17', 0, 6, 2);



INSERT INTO additional_service ( name, price, service_id)
VALUES ('WiFi', 0, 6), ('Iron', 10, 6), ('Air Conditioning', 0, 6), ('TV', 10, 6), ('WiFi', 0, 6), ('Parking', 10, 6);
--unavailable periods
INSERT INTO unavailable_period(end_date, start_date, service_id)
VALUES (DATE '2022-02-01', '2022-01-29', 6);
INSERT INTO unavailable_period(end_date, start_date, service_id)
VALUES (DATE '2022-02-06', '2022-02-02', 6);

--promo actions
INSERT INTO promo_action(
    additional, capacity, duration_in_days, end_date, is_taken, price_per_day, start_date, service_id)
VALUES ('nesto', 5, 10, DATE '2022-02-20', false, 20, DATE '2022-02-15', 6);
INSERT INTO promo_action(
    additional, capacity, duration_in_days, end_date, is_taken, price_per_day, start_date, service_id)
VALUES ('nesto', 5, 10, DATE '2022-01-09', false, 20, DATE '2022-01-01', 6);
--reports
INSERT INTO report (
    client_didnt_show_up, created_on, is_reviewed, sanction_client, text, reservation_id)
VALUES (false, DATE '2021-12-17', false, true, 'Left a huge mess.', 1);
