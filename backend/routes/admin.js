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

router.post('/updatePermission',verifyAccessToken,require('../controllers/admin/updatePermission'));

router.post('/createNotification',verifyAccessToken,require('../controllers/admin/createNotification'));

router.get('/getAllNotification',verifyAccessToken,require('../controllers/admin/getAllNotification'));

router.get('/getNotificationCount',verifyAccessToken,require('../controllers/admin/getNotificationCount'));

router.get('/getAllUserWithoutskip',verifyAccessToken,require('../controllers/admin/getAllUserWithouskip'));

router.get('/getAllRoleWithoutskip',verifyAccessToken,require('../controllers/admin/getAllRoleWithoutskip'));

router.post('/verifyOtp',require('../controllers/admin/verifyOtp'));

router.post('/resendOtp',require('../controllers/admin/resendOtp'));

router.post('/tenantSignup',require('../controllers/admin/tenantSignup'));

router.post('/createTask',require('../controllers/admin/createTask'));

module.exports = router;


//routes

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *          example: DHSASDHJDJHVAJDSVJAVSD
 *        firstName:
 *          type: string
 *          description: User First name
 *          example: John
 *        lastName:
 *          type: string
 *          description: User Last Name
 *          example: Doe
 *        email:
 *          type: string
 *          description: User email address
 *          example: john.doe@example.com
 *        phone:
 *          type: array
 *          description: User phone numbers
 *          items:
 *            type: string
 *          example: ["1234567890", "9876543210"]
 *        password:
 *          type: string
 *          description: User password (hashed)
 *        role:
 *          type: array
 *          description: Role of the user
 *          items:
 *            type: string
 *          example: ["admin"]
 *        managers:
 *          type: array
 *          description: Managers who are above that user
 *          items:
 *            type: string
 *          example: ["manager1", "manager2"]
 *        createdBy:
 *          type: string
 *          description: ID of the user who created this user
 *          example: ABCDEFG12345
 *        updatedBy:
 *          type: string
 *          description: ID of the user who last updated this user
 *          example: XYZ12345678
 *        otp:
 *          type: object
 *          properties:
 *            value:
 *              type: string
 *              description: OTP value
 *              example: "123456"
 *            generatedAt:
 *              type: string
 *              format: date-time
 *              description: Date and time when OTP was generated
 *              example: "2023-01-01T12:00:00Z"
 *        isEmailVerified:
 *          type: boolean
 *          description: Indicates whether the user's email is verified
 *          example: true
 *        isPhoneVerified:
 *          type: boolean
 *          description: Indicates whether the user's phone is verified
 *          example: false
 *        softDelete:
 *          type: boolean
 *          description: Soft delete status of the user
 *          example: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The Auto-generated id of the role collection
 *           example: ABCDEFG12345
 *         name:
 *           type: string
 *           description: Role name
 *           example: admin
 *         description:
 *           type: string
 *           description: Role description
 *           example: Administrator role with full access
 *         permissions:
 *           type: object
 *           description: Role permissions
 *           example: { read: true, write: true }
 *         createdBy:
 *           type: string
 *           description: ID of the user who created this role
 *           example: XYZ12345678
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated this role
 *           example: LMNOPQ98765
 *         softDelete:
 *           type: boolean
 *           description: Soft delete status of the role
 *           example: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The Auto-generated id of the notification collection
 *           example: ABCDEFG12345
 *         title:
 *           type: string
 *           description: Notification title
 *           example: New Task Assigned
 *         content:
 *           type: object
 *           description: Notification content in JSON format
 *           example: { message: "You have a new task", task_id: "123" }
 *         data:
 *           type: string
 *           description: Module type (e.g., Lead, Task)
 *           example: Task
 *         recipients:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who will receive the notification
 *           example: ["user1", "user2"]
 *         room:
 *           type: string
 *           description: Identifier for a chat room (optional)
 *           example: task_room_123
 *         priority:
 *           type: string
 *           description: Priority of the notification (e.g., high, medium, low)
 *           example: high
 *       required:
 *         - title
 *         - content
 *         - data
 *         - recipients
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Lead:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The Auto-generated id of the lead collection
 *           example: ABCDEFG12345
 *         firstName:
 *           type: string
 *           description: Lead's first name
 *           example: John
 *         lastName:
 *           type: string
 *           description: Lead's last name
 *           example: Doe
 *         email:
 *           type: string
 *           description: Lead's email address
 *           example: john.doe@example.com
 *         phone:
 *           type: array
 *           items:
 *             type: string
 *           description: Lead's phone numbers
 *           example: ["1234567890", "9876543210"]
 *         leadSource:
 *           type: string
 *           description: Source of the lead
 *           example: Website
 *         leadStatus:
 *           type: string
 *           description: Status of the lead
 *           example: In Progress
 *         companyName:
 *           type: string
 *           description: Lead's company name
 *           example: ABC Corp
 *         rating:
 *           type: string
 *           description: Lead's rating
 *           example: High
 *         annualRevenue:
 *           type: string
 *           description: Annual revenue of the lead's company
 *           example: $1,000,000
 *         createdBy:
 *           type: string
 *           description: ID of the user who created this lead
 *           example: XYZ12345678
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated this lead
 *           example: LMNOPQ98765
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               description: Lead's street address
 *               example: 123 Main St
 *             state:
 *               type: string
 *               description: Lead's state
 *               example: California
 *             city:
 *               type: string
 *               description: Lead's city
 *               example: San Francisco
 *             country:
 *               type: string
 *               description: Lead's country
 *               example: USA
 *             zipCode:
 *               type: string
 *               description: Lead's ZIP code
 *               example: 94105
 *         description:
 *           type: string
 *           description: Additional description about the lead
 *           example: Interested in product X
 *         softDelete:
 *           type: boolean
 *           description: Soft delete status of the lead
 *           example: false
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The Auto-generated id of the task collection
 *           example: ABCDEFG12345
 *         taskSubject:
 *           type: string
 *           description: Subject of the task
 *           example: Complete Project Proposal
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due date of the task
 *           example: "2023-12-31"
 *         status:
 *           type: string
 *           description: Status of the task
 *           example: In Progress
 *         priority:
 *           type: string
 *           description: Priority of the task
 *           example: High
 *         reminder:
 *           type: string
 *           description: Reminder for the task
 *           example: 15 minutes before
 *         participant:
 *           type: string
 *           description: ID of the participant associated with the task
 *           example: XYZ12345678
 *         createdBy:
 *           type: string
 *           description: ID of the user who created this task
 *           example: XYZ12345678
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated this task
 *           example: LMNOPQ98765
 *         description:
 *           type: string
 *           description: Additional description about the task
 *           example: Review and finalize the proposal document
 *       required:
 *         - taskSubject
 *         - dueDate
 *         - status
 *         - priority
 *         - createdBy
 */
