import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(StatusCodes.OK).json({ jobs })
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
  res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findById(id);
  // console.log(job);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(200).json({ job })
}

// export const getJob = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ msg: 'Invalid ID format' })
//   }

//   try {
//     console.log('Attempting to find job by ID:', id)
//     const job = await Job.findById(id)

//     if (!job) {
//       console.log('Job not found')
//       return res.status(404).json({ msg: `No job with id ${id}` })
//     }

//     console.log('Found job:', job)
//     res.status(200).json({ job })
//   } catch (error) {
//     console.error('Error in getJob:', error)
//     res.status(500).json({ msg: 'Server error', error: error.message })
//   }
// }

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updateJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateJob) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updateJob });
}

export const deleteJob = async  (req, res) => {
  const { id } = req.params
  const removedJob = await Job.findByIdAndDelete(id);
  
  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob })
}
