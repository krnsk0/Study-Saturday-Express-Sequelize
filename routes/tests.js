const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    let tests = await Test.findAll();
    res.send(tests);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let test = await Test.findById(req.params.id);
    res.send(test);
  } catch (error) {
    next(error);
  }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    let newTest = await Test.create({
      subject: req.body.subject,
      grade: Number(req.body.grade),
      studentId: req.params.studentId
    });
    res.status(201).send(newTest);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Test.destroy({
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
