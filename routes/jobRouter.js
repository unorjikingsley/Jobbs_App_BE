import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob 
} from "../controllers/jobscontroller.js";

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
