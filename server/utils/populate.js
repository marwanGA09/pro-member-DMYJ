`
-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  first_name VARCHAR(50) ,
  middle_name VARCHAR(50 ,
  last_name VARCHAR(50) ,
  date_of_birth DATE,
  email VARCHAR(100),
  sector VARCHAR(100),
  password VARCHAR(100),
  phonenumber VARCHAR(20),
  role VARCHAR(50)
);

-- Insert 5 example records into the users table
INSERT INTO users (username, first_name, middle_name, last_name, date_of_birth, email, sector, password, phonenumber, role)
VALUES
  ('jdoe', 'John', 'Michael', 'Doe', '1985-06-15', 'jdoe@example.com', 'Engineering', 'password123', '123-456-7890', 'admin'),
  ('asmith', 'Anna', NULL, 'Smith', '1990-02-20', 'asmith@example.com', 'Marketing', 'password456', '234-567-8901', 'user'),
  ('bwilliams', 'Ben', 'A.', 'Williams', '1978-11-05', 'bwilliams@example.com', 'Finance', 'password789', '345-678-9012', 'manager'),
  ('clarkson', 'Chloe', NULL, 'Clarkson', '1992-04-10', 'clarkson@example.com', 'IT', 'password101', '456-789-0123', 'user'),
  ('djones', 'Diana', 'Marie', 'Jones', '1988-09-25', 'djones@example.com', 'HR', 'password202', '567-890-1234', 'supervisor');
`;
