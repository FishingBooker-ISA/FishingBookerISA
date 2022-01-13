INSERT INTO role (name) VALUES ('ROLE_CLIENT');
INSERT INTO role (name) VALUES ('ROLE_ADMIN');
INSERT INTO role (name) VALUES ('ROLE_ESTATE_OWNER');
INSERT INTO role (name) VALUES ('ROLE_SHIP_OWNER');
INSERT INTO role (name) VALUES ('ROLE_INSTRUCTOR');

INSERT INTO address (street, number, city, country, postcode, longitude, latitude) VALUES ('Dunavska', 22, 'Novi Sad', 'Serbia', 21000, 2.1, 3.6);

INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id) VALUES ('User', 1, 'Petra', 'Jovic', 'admin@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 2, 1);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, num_of_penalties, points, role_id, address_id) VALUES ('CLIENT', 2, 'Ivan', 'Maric', 'andjela.ra28@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 0, 0, 1, 1);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id) VALUES ('User', 3, 'Andjela', 'Djuric', 'andjela@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 3, 1);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id) VALUES ('User', 4, 'Ana', 'Grahovac', 'ana@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 4, 1);
INSERT INTO users (type, id, first_name, last_name, email, phone_number, password, is_deleted, is_verified, role_id, address_id) VALUES ('User', 5, 'Milan', 'Savic', 'pexandjana@gmail.com', '0661234567', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', false, true, 5, 1);

INSERT INTO adventure (
    id, additional_equipment, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (1, 'baits', 10, 'Fun fishing experience for beginners', false, 'Beginners Class', 0, 20, 'bla bla', 2, 1, 5, 'Something about instructor');
INSERT INTO adventure (
    id, additional_equipment, capacity, description, is_percentage_taken_from_canceled_reservations, name, percentage_to_take, price_per_day, terms_of_use, type, address_id, owner_id, instructor_bio)
VALUES (2, 'baits', 10, 'Fun fishing experience for beginners', false, 'Professional Class', 0, 20, 'bla bla', 2, 1, 5, 'Something about instructor');

INSERT INTO rating (
    id, description, given_mark, is_approved, is_reviewed, service_id, user_id)
VALUES (1, 'Great service. See you again soon. :)', 5, false, false, 1, 1);

INSERT INTO rating (
    id, description, given_mark, is_approved, is_reviewed, service_id, user_id)
VALUES (2, 'Great service. See you again soon. :)', 5, true, false, 1, 1);

INSERT INTO complaint (id, is_complaint_on_owner, is_reviewed, reason, client_id, owner_id)
VALUES (1, true, false, 'He was never on time.', 5, 5);