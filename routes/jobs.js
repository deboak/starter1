const express = require('express');
const router = express.Router();
const {register} = require('../controllers/auth');
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;