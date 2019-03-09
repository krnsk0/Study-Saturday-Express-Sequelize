const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    let allStudents = await Student.findAll();
    res.send(allStudents);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.id);
    if (student === null) {
      res.status(404).send();
    } else {
      res.send(student);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let createdStudent = await Student.create({
      firstName,
      lastName,
      email
    });

    res.status(201);
    res.send(createdStudent);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await Student.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    let updatedStudent = await Student.findById(req.params.id);
    res.status(200).send(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
