'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Student.beforeCreate(student => {
  let fname = student.firstName;
  student.firstName = fname[0].toUpperCase() + fname.slice(1);
  let lname = student.lastName;
  student.lastName = lname[0].toUpperCase() + lname.slice(1);
});

module.exports = Student;
