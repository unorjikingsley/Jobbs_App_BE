import Job from '../models/JobModel.js';

import { nanoid } from 'nanoid'

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
]

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs })
};

export const createJob = async (req, res) => {
  // const { company, position } = req.body;
  // const job = await Job.create({ company, position });

  // try {
  //     const job = await Job.create(req.body)
  //     res.status(200).json({ job })
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ msg: 'server error' });
  // }

  // we can find async error this manually by using try and catch block which can be
  // stressful. instead we can use the express-async error handler

  const job = await Job.create(req.body)
  res.status(200).json({ job })
}

export const getJob = async (req, res) => {
  const { id } = req.params
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(201).json({ job })
}

export const updateJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ msg: 'Provide a position or company' })
  }
  const { id } = req.params
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
}

export const deleteJob = async  (req, res) => {
  const { id } = req.params
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'job deleted', job })
}
