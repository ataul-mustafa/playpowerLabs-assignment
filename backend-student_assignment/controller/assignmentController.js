const Assignment = require('../models/Assignment');

//controller function to create an assignment
const createAssignment = (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const teacher_id = req.userId;

    Assignment.create(title, description, due_date, teacher_id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creating assignment', error: err.sqlMessage });
      res.status(201).json({ id: result.insertId, message: 'Assignment created successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//controller function to get all assignments
const getAssignments = (req, res) => {
  try {
    const teacher_id = req.userId;

    Assignment.findAllByTeacherId(teacher_id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching assignments', error: err.sqlMessage });
      res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//controller function to get an assignments by id
const getOneById = (req, res) => {
  try {
    const { id } = req.params;

    const teacher_id = req.userId;

    Assignment.findOneById(id, teacher_id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error while getting assignment', error: err.sqlMessage });

      if (!result[0]) return res.status(500).json({ message: 'Invalid assignment id' });

      res.status(200).json(result[0]);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//controller function to update an assignment by id
const updateAssignment = (req, res) => {
  try {

    //checking if assignment id is missing
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: 'Assignment id missing' });

    //checking if is there any updatable field available
    const { title, description, due_date } = req.body;
    if (!title && !description && !due_date) return res.status(500).json({ message: 'Enter any field to update' });

    const teacher_id = req.userId;

    Assignment.updateById(id, title, description, due_date, teacher_id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error updating assignment', error: err.sqlMessage });
      res.status(200).json({ message: 'Assignment updated successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//controller function to delete an assignment by id
const deleteAllAssignments = (req, res) => {
  try {

    const teacher_id = req.userId;

    Assignment.deleteAllByTeacherId(teacher_id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error while deleting assignments', error: err.sqlMessage });

      if (result.affectedRows == 0) return res.status(400).json({ message: 'You dont have any assignment' });

      res.status(200).json({ message: 'All Assignments deleted successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

};


//controller function to delete an assignment by id
const deleteOneAssignment = (req, res) => {
  try {
    //checking if assignment id is missing
    const { id } = req.params;
    if (!id) return res.status(500).json({ message: 'Assignment id missing' });

    const teacher_id = req.userId;

    Assignment.deleteById(id, teacher_id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error deleting assignment', error: err.sqlMessage });

      if (result.affectedRows == 0) return res.status(400).json({ message: 'Invalid assignment id' });

      res.status(200).json({ message: 'Assignment deleted successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//controller function to submit an assignment
const submitAssignment = (req, res) => {
  try {
    const { response } = req.body;

    //checking if assignment assignment id or response is missing
    const { id } = req.params;
    if (!id || !response) return res.status(500).json({ message: 'Assignment id or responese missing' });

    const username = req.userId;

    Assignment.submit(response, username, id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error while submitting assignment', error: err.sqlMessage });
      res.status(201).json({ id: result.insertId, message: 'Assignment submitted successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createAssignment,
  submitAssignment,
  getAssignments,
  getOneById,
  updateAssignment,
  deleteAllAssignments,
  deleteOneAssignment
};
