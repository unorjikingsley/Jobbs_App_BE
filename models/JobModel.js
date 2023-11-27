import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../utils/contants.js";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.pending,
    },
    jobTypes: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: 'NYC',
    },
  },
  { timestamps: true }
)

export default mongoose.model('job', JobSchema);

