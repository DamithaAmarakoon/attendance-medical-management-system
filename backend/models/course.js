const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    match: /^(CSC|MAT|FSC|AMT|PHY)[a-zA-Z0-9]{3}([0-9]|α|β|δ)$/
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  schedule: {
    day: { type: Number, min: 0, max: 6 },
    startTime: { type: Number, min: 0, max: 23 },
    duration: { type: Number, min: 1, max: 5 }
  },
  lecturer: {
    type: String,
    ref: 'User'
  },
  password: {
    type: String,
    minlength: 10
  },
  dates: [{
    date: String,
    lecture: String
  }]
});

const Course = mongoose.model('Course', schema);

const validate = course => {
  const schema = Joi.object({
    code: Joi.string().required().regex(/^(CSC|MAT|FSC|AMT|PHY)[a-zA-Z0-9]{3}([0-9]|α|β|δ)$/),
    name: Joi.string().required().min(5).max(50),
    schedule: Joi.object({
      day: Joi.number().min(1).max(7),
      startTime: Joi.number().min(0).max(23),
      duration: Joi.number().min(1).max(5)
    }),
    lecturer: Joi.string(),
  });

  return schema.validate(course);
};

const validatePasswordAndLecture = course => {
  const schema = Joi.object({
    password: Joi.string().min(7).max(13).required(),
    lecture: Joi.string().min(5).max(50).required()
  });
  return schema.validate(course);
};

module.exports = { Course, validate, validatePasswordAndLecture };