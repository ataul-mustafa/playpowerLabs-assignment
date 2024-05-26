const connection = require('../database/db');

const Assignment = {
  create: (title, description, due_date, teacher_id, callback) => {
    const query = 'INSERT INTO assignments (title, description, due_date, teacher_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [title, description, due_date, teacher_id], callback);
  },

  findAllByTeacherId: (teacher_id, callback) => {
    const query = 'SELECT * FROM assignments WHERE teacher_id = ?';
    connection.query(query, [teacher_id], callback);
  },

  findOneById: (id, teacher_id, callback) => {
    const query = 'SELECT * FROM assignments WHERE id = ? AND teacher_id = ?';
    connection.query(query, [id, teacher_id], callback);
  },

  updateById: (id, title, description, due_date, teacher_id, callback) => {
    const query = 'UPDATE assignments SET title = ?, description = ?, due_date = ? WHERE id = ? AND teacher_id = ?';
    connection.query(query, [title, description, due_date, id, teacher_id], callback);
  },

  deleteById: (id, teacher_id, callback) => {
    const query = 'DELETE FROM assignments WHERE id = ? AND teacher_id = ?';
    connection.query(query, [id, teacher_id], callback);
  },

  deleteAllByTeacherId: (teacher_id, callback) => {
    const query = 'DELETE FROM assignments WHERE teacher_id = ?';
    connection.query(query, [teacher_id], callback);
  },

  submit: (response, username, assignment_id, callback) => {
    const query = 'INSERT INTO submitted_assignments (response, user_name, assignment_id) VALUES (?, ?, ?)';
    connection.query(query, [response, username, assignment_id], callback);
  },
};

module.exports = Assignment;
