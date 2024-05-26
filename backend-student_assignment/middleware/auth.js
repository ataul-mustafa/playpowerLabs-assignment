const jwt = require('jsonwebtoken');
const Assignment = require('../models/Assignment');
const connection = require('../database/db');

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key'; // use a more secure key in production

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Please provide a token in header authorization.' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });

      req.userId = decoded.username;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const teacherAuth = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Please provide a token in header authorization.' });

    let username;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });
      username = decoded.username;
    });

    const query = 'SELECT * FROM assignments WHERE teacher_id = ?';
    connection.query(query, [username], (err, results)=>{
      if(err) return res.status(500).json({ message: err.sqlMessage });
      if(!results[0]) return res.status(500).json({ message: "You are not authorized to make this action" });
      next();

    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  verifyToken,
  teacherAuth
};
