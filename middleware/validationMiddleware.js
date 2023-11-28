import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/CustomError.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/contants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('Job not')) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ]
}

export const validateJobInput = withValidationErrors([
  body('company')
    .notEmpty()
    .withMessage('company is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters')
    .trim(),

  body('position')
    .notEmpty()
    .withMessage('company is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('company must be between 3 and 50 characters')
    .trim(),

  body('jobLocation')
    .notEmpty()
    .withMessage('job location/country is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('job location must be between 3 and 50 characters')
    .trim(),

  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid status value'),

  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid status value'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if(!isValidId) throw new BadRequestError('invalid MongoDB id');
    const job = await Job.findById(value);

    if (!job) throw new NotFoundError(`Job not found with id: ${value}`);
  })
]);
