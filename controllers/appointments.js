const Appointment = require('../models/appointment');

//Create Appointment
exports.postAddAppointment = (req, res, next) => {
    const { username, email, phone } = req.body;
    console.log("Adding Appointment:", { username, email, phone });
    Appointment.create({
        username: username,
        email: email,
        phone: phone,
    })
    .then(() => res.redirect('/user/appointments'))
    .catch((err) => console.log(err));
};

// Get all appointment
exports.getAppointments = (req, res, next) => {
    Appointment.findAll()
    .then((appointments) => {
    console.log("Retrieved Appointments:", JSON.stringify(appointments, null, 2)); // Log appointments
        res.render('user/appointments', {
            appointments: appointments,
            pageTitle: 'Appointments',
            path: '/user/appointments',
        });
    })
    .catch((err) => console.log(err));
};

// Delecte Appointment
exports.postDeleteAppointment = (req, res, next) => {
    const appointmentId = req.body.appointmentId;
    console.log("Deleting Appointment ID:", appointmentId); // Log the ID being deleted
    Appointment.destroy({ where: { id: appointmentId } })
    .then(() => res.redirect('/user/appointments'))
    .catch((err) => console.log(err));
};

//get edit appointment form
exports.getEditAppointment = (req, res, next) => {
    const appointmentId = req.query.appointmentId;
    console.log("Editing Appointment ID:", appointmentId); // Log the ID being edited
    Appointment.findByPk(appointmentId)
    .then(appointment => {
        if (!appointment) {
            return res.redirect('/user/appointments');
        }
        console.log("Retrieved Appointment for Editing:", JSON.stringify(appointment, null, 2)); // Log the appointment data
        res.render('user/edit', {
            appointment: appointment,
            pageTitle: 'Edit Appointment',
            path: '/user/edit-appointment'
        });
    })
    .catch(err => console.log(err));
};

//post updated appointment
exports.postEditAppointment = (req, res, next) => {
    const { id, username, email, phone } = req.body;
    console.log("Updating Appointment:", { id, username, email, phone }); // Log the data being updated
    Appointment.update({ username, email, phone }, { where: { id: id } })
    .then(() => res.redirect('/user/appointments'))
    .catch(err => console.log(err));
};