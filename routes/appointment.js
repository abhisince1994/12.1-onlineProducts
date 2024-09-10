const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointments');


// get all appointments
router.get('/appointments', appointmentController.getAppointments);

// Post add appointment
router.post('/add-appointment', appointmentController.postAddAppointment);

// post delete Appointments
router.post('/delete-appointment', appointmentController.postDeleteAppointment);

//get edit appointment form
router.get('/edit-appointment', appointmentController.getEditAppointment);

//post updated appointment
router.post('/edit-appointment', appointmentController.postEditAppointment);

module.exports = router;