CREATE DATABASE student_assignments;
USE student_assignments;

CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  due_date DATE,
  teacher_id VARCHAR(255)
  
);

CREATE TABLE submitted_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  response TEXT NOT NULL,
  assignment_id INT NOT NULL,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id)
);