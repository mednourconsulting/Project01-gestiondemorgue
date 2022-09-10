
INSERT INTO user (id, first_name, last_name, user_name, email, password_hash, is_deleted) VALUES
-- Hashed "password"
  (1, 'Admin', 'Admin', 'admin', 'admin@admin.com', '$2a$10$ZUw7TUg/cKEJw4XlSS/6Wu0Pp05yi5kUO3cBYs5ewInpKXOW/US6G', false),
-- Hashed "password1"
  (2, 'User', 'User', 'user', 'user@user.com', '$2a$10$6IDH7YBMlz3B2W9GiHdEI.sm6tlVRDYGmA9eWzUDucYYnqQVvmR66', false);

INSERT INTO role (id, name, is_default) VALUES
    (1, 'ADMIN', 0),(2, 'USER', 1) ;

INSERT INTO user_role (user_id, role_id) VALUES
  (1, 1), (1, 2), (2, 2);

