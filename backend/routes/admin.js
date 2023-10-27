var express = require('express');
const { verifyAccessToken } = require('../helpers/adminAuthetication');
const { verify } = require('jsonwebtoken');
var router = express.Router();

router.post('/signUp',require('../controllers/admin/signUp'));

router.post('/login',require('../controllers/admin/login'));

router.get('/getAllUser',verifyAccessToken,require('../controllers/admin/getAllUser'));

router.post('/createUser',verifyAccessToken,require('../controllers/admin/createUser'));

router.post('/updateUser',verifyAccessToken,require('../controllers/admin/updateUser'));

router.post('/deleteUser',verifyAccessToken,require('../controllers/admin/deleteUser'));

router.get('/getUser',verifyAccessToken,require('../controllers/admin/getUser'));

router.post('/createRole',verifyAccessToken,require('../controllers/admin/createRole'));

router.post('/updateRole',verifyAccessToken,require('../controllers/admin/updateRole'));

router.get('/getAllRole',verifyAccessToken,require('../controllers/admin/getAllRole'));

router.post('/deleteRole',verifyAccessToken,require('../controllers/admin/deleteRole'));

router.get('/getRole',verifyAccessToken,require('../controllers/admin/getRole'));

router.post('/createLead',verifyAccessToken,require('../controllers/admin/createLead'));

router.get('/getAllLead',verifyAccessToken,require('../controllers/admin/getAllLead'));

router.post('/updateLead',verifyAccessToken,require('../controllers/admin/updateLead'));

router.post('/deleteLead',verifyAccessToken,require('../controllers/admin/deleteLead'));

router.get('/getLead',verifyAccessToken,require('../controllers/admin/getLead'));

router.post('/createClient',verifyAccessToken,require('../controllers/admin/createClient'));

router.post('/updateClient',verifyAccessToken,require('../controllers/admin/updateClient'));

router.post('/deleteClient',verifyAccessToken,require('../controllers/admin/deleteClient'));

router.get('/getAllClient',verifyAccessToken,require('../controllers/admin/getAllClient'));

router.post('/createMeeting',verifyAccessToken,require('../controllers/admin/createMeeting'));

router.get('/getAllMeeting',verifyAccessToken,require('../controllers/admin/getAllMeeting'));

router.post('updateMeeting',verifyAccessToken,require('../controllers/admin/updateMeeting'));

router.post('/createCall',verifyAccessToken,require('../controllers/admin/createCall'));

router.post('/createContact',verifyAccessToken,require('../controllers/admin/createContact'));

router.post('/updateContact',verifyAccessToken,require('../controllers/admin/updateContact'));

router.post('/deleteContact',verifyAccessToken,require('../controllers/admin/deleteContact'));

//router.get('/getAllContact',verifyAccessToken,require('../controllers/admin/getAllContact'));

router.post('/createTask',verifyAccessToken,require('../controllers/admin/createTask'));

router.post('/createProduct',verifyAccessToken,require('../controllers/admin/createProduct'));

router.post('/createProject',verifyAccessToken,require('../controllers/admin/createProject'));

router.post('/updateProject',verifyAccessToken,require('../controllers/admin/updateProject'));

router.post('/deleteProject',verifyAccessToken,require('../controllers/admin/deleteProject'));

router.get('/getAllProject',verifyAccessToken,require('../controllers/admin/getAllProject'));

router.post('/createProjectTask',verifyAccessToken,require('../controllers/admin/createProjectTask'));

router.post('/updateProjectTask',verifyAccessToken,require('../controllers/admin/updateProjectTask'));

router.get('/getAllProjectTask',verifyAccessToken,require('../controllers/admin/getAllProjectTask'));

router.post('/uploadCampagin',verifyAccessToken,require('../controllers/admin/uploadCampaigns'));

router.get('/getPermission',verifyAccessToken,require('../controllers/admin/getPermission'));

router.post('/createNotification',verifyAccessToken,require('../controllers/admin/createNotification'));

router.get('/getAllNotification',verifyAccessToken,require('../controllers/admin/getAllNotification'));

module.exports = router;
