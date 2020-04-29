const express = require('express');

const ProjectCtrl = require('../controllers/project-ctrl');

const router = express.Router();

router.post('/projects', ProjectCtrl.createProject);
router.put('/projects/:id', ProjectCtrl.updateProject);
router.delete('/projects/:id', ProjectCtrl.deleteProject);
router.get('/projects/:id', ProjectCtrl.getProjectById);
router.get('/projects', ProjectCtrl.getProjects);

module.exports = router;
