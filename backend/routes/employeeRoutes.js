const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// Order is important!
router.get('/search', protect, searchEmployees);
router.route('/').post(protect, addEmployee).get(protect, getEmployees);
router.route('/:id').put(protect, updateEmployee).delete(protect, deleteEmployee);

module.exports = router;
