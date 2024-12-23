import express from 'express';
import projectController from '../controllers/projectController.js';

const router = express.Router();

// Middleware to pass clientid and sowid to subsequent routes
router.use((req, res, next) => {
  const match = req.baseUrl.match(/\/client\/([A-Za-z0-9_-]+)\/sow\/([A-Za-z0-9_-]+)/);
  if (match) {
    const [, clientId, sowId] = match;  // Destructure match result
    req.clientId = clientId;
    req.sowId = sowId;
  }
  next();
});

/**
 * @swagger
 * tags:
 *   name: Client-Service:Projects
 *   description: API for Getting Project Details and Creating Projects
 */

/**
 * @swagger
 * /client/{clientId}/sow/{sowId}/project:
 *   post:
 *     summary: Create a new project for the client under a specific SOW
 *     tags: [Client-Service:Projects]
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         description: The client ID of the client
 *         schema:
 *           type: string
 *       - name: sowId
 *         in: path
 *         required: true
 *         description: The SOW ID of the SOW to be associated with the project.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sowNo:
 *                 type: string
 *                 description: SOW No. of the SOW
 *                 example: "SOW67890"   
 *               description:
 *                 type: string
 *                 description: The Project Description.
 *                 example: "The Project description."
 *               projectPostingGroupId:
 *                 type: integer
 *                 description: Project Posting Group Id.
 *                 example: 1001
 *               wipMethodId:
 *                 type: integer
 *                 description: WIP Method Id.
 *                 example: 1002
 *               locationId:
 *                 type: integer
 *                 description: Location Id.
 *                 example: 1002
 *               projectCreatedDate:
 *                 type: string
 *                 description: Project Created Date.
 *                 format: date-time
 *                 example: "2024-08-29T14:00:00Z"
 *               startDate:
 *                 type: string
 *                 description: Project Start Date.
 *                 format: date-time
 *                 example: "2024-08-29T14:00:00Z"
 *               endDate:
 *                 type: string
 *                 description: Project End Date.
 *                 format: date-time
 *                 example: "2024-08-29T14:00:00Z"
 *               createdBy:
 *                 type: string
 *                 description: Project Created by in the system.
 *                 example: "sunil-inn"
 *             required:
 *               - description
 *               - createdBy
 *     responses:
 *       201:
 *         description: Project successfully created
 *         headers:
 *           Location:
 *             description: The URL of the newly created project resource.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  sowNo:
 *                      type: string
 *                      description: The SOW No. of the SOW
 *                      example: "SOW67890"   
 *                  description:
 *                      type: string
 *                      description: The Project Description.
 *                      example: "The Project description."
 *                  projectPostingGroupId:
 *                      type: integer
 *                      description: Project Posting Group Id.
 *                      example: 1001
 *                  wipMethodId:
 *                      type: integer
 *                      description: WIP Method Id.
 *                      example: 1002
 *                  locationId:
 *                      type: integer
 *                      description: Location Id.
 *                      example: 1002
 *                  projectCreatedDate:
 *                      type: string
 *                      description: Project Created Date.
 *                      format: date-time
 *                      example: "2024-08-29T14:00:00Z"
 *                  startDate:
 *                      type: string
 *                      description: Project Start Date.
 *                      format: date-time
 *                      example: "2024-08-29T14:00:00Z"
 *                  endDate:
 *                      type: string
 *                      description: Project End Date.
 *                      format: date-time
 *                      example: "2024-08-29T14:00:00Z"
 *                  createdBy:
 *                      type: string
 *                      description: Project Created by in the system.
 *                      example: "sunil-inn"
 */

router.post('/project', projectController.createProject);

/**
 * @swagger
 * /client/{clientId}/sow/{sowId}/project/{projectId}:
 *   get:
 *     summary: Get project details by project ID
 *     tags: [Client-Service:Projects]
 *     description: Retrieve the details of a specific project using its project ID.
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         description: The client ID
 *         schema:
 *           type: string
 *       - name: sowId
 *         in: path
 *         required: true
 *         description: The SOW ID of the project
 *         schema:
 *           type: string
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The project ID of the project
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     customerId:
 *                       type: string
 *                       maxLength: 20
 *                       example: "1"
 *                     customerNo:
 *                       type: string
 *                       maxLength: 20
 *                       example: "CUST001"
 *                     customerName:
 *                       type: string
 *                       maxLength: 100
 *                       example: "Customer Name"
 *                     sowId:
 *                       type: string  # Changed to string for consistency with other IDs
 *                       example: "1"  # Example updated to string
 *                     sowNo:
 *                       type: string
 *                       maxLength: 20
 *                       example: "SOW00001"
 *                     projectNo:
 *                       type: string
 *                       maxLength: 20
 *                       example: "SOW00001_001"
 *                     description:
 *                       type: string
 *                       maxLength: 100
 *                       example: "Project description goes here"
 *                     projectPostingGroupId:
 *                       type: integer
 *                       example: 1
 *                     projectPostingGroupName:
 *                       type: string
 *                       maxLength: 100
 *                       example: "Posting Group Name"
 *                     wipMethodId:
 *                       type: integer
 *                       example: 2
 *                     wipMethodName:
 *                       type: string
 *                       maxLength: 100
 *                       example: "WIP Method Name"
 *                     locationId:
 *                       type: integer
 *                       example: 3
 *                     locationName:
 *                       type: string
 *                       maxLength: 100
 *                       example: "Location Name"
 *                     createdBy:
 *                       type: string
 *                       maxLength: 50
 *                       example: "UserName"
 *                     modifiedBy:
 *                       type: string
 *                       maxLength: 50
 *                       example: "UserName"
 *                     projectCreatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-24T12:00:00Z"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-25T09:00:00Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-25T17:00:00Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-24T12:00:00Z"
 *       400:
 *         description: Bad request. Please check the request parameters.
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

router.get('/project/:projectId', projectController.getProjectByProjectId);

/**
 * @swagger
 * /client/{clientId}/sow/{sowId}/projects:
 *   get:
 *     summary: Get Projects by SOW number and search term with sorting and pagination
 *     tags: [Client-Service:Projects]
 *     description: Retrieve Projects by SOW number with search, sorting, and pagination.
 *     parameters:
 *      - name: clientId
 *        in: path
 *        required: true
 *        description: The client ID
 *        schema:
 *          type: string
 *      - name: sowId
 *        in: path
 *        required: true
 *        description: Unique number of SOW
 *        schema:
 *          type: string
 *      - name: searchTerm
 *        in: query
 *        required: false
 *        description: Search keyword for SOW details.
 *        schema:
 *          type: string
 *      - name: sortField
 *        in: query
 *        required: false
 *        description: Field name to sort by (e.g., description, sowId).
 *        schema:
 *          type: string
 *      - name: sortOrder
 *        in: query
 *        required: false
 *        description: Sorting order (asc for ascending, desc for descending).
 *        schema:
 *          type: string
 *          enum: [asc, desc]
 *      - name: pageNumber
 *        in: query
 *        required: false
 *        description: Page number for pagination (starting at 1).
 *        schema:
 *          type: integer
 *          minimum: 1
 *      - name: pageSize
 *        in: query
 *        required: false
 *        description: Number of items per page (default is 0 if not specified, which will get all the records).
 *        schema:
 *          type: integer
 *          minimum: 1
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   example: 2
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       customerId:
 *                         type: string
 *                         maxLength: 20
 *                         example: "1"
 *                       customerNo:
 *                         type: string
 *                         maxLength: 20
 *                         example: "CUST001"
 *                       customerName:
 *                         type: string
 *                         maxLength: 100
 *                         example: "Customer Name"
 *                       sowId:
 *                         type: integer
 *                         example: 1
 *                       sowNo:
 *                         type: string
 *                         maxLength: 20
 *                         example: "SOW00001"
 *                       projectNo:
 *                         type: string
 *                         maxLength: 20
 *                         example: "SOW00001_001"
 *                       description:
 *                         type: string
 *                         maxLength: 100
 *                         example: "Project description goes here"
 *                       projectPostingGroupId:
 *                         type: integer
 *                         example: 1
 *                       projectPostingGroupName:
 *                         type: string
 *                         maxLength: 100
 *                         example: "Posting Group Name"
 *                       wipMethodId:
 *                         type: integer
 *                         example: 2
 *                       wipMethodName:
 *                         type: string
 *                         maxLength: 100
 *                         example: "WIP Method Name"
 *                       locationId:
 *                         type: integer
 *                         example: 3
 *                       locationName:
 *                         type: string
 *                         maxLength: 100
 *                         example: "Location Name"
 *                       createdBy:
 *                         type: string
 *                         maxLength: 50
 *                         example: "UserName"
 *                       modifiedBy:
 *                         type: string
 *                         maxLength: 50
 *                         example: "UserName"
 *                       projectCreatedDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-24T12:00:00Z"
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-25T09:00:00Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-25T17:00:00Z"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-24T12:00:00Z"
 *             examples:
 *               application/json:
 *                 value:
 *                   totalCount: 2
 *                   page: 1
 *                   pageSize: 10
 *                   projects:
 *                     - id: 1
 *                       customerId: "1"
 *                       customerNo: "CUST001"
 *                       customerName: "Customer Name"
 *                       sowId: 1
 *                       sowNo: "SOW00001"
 *                       projectNo: "SOW00001_001"
 *                       description: "Project description goes here"
 *                       projectPostingGroupId: 1
 *                       projectPostingGroupName: "Posting Group Name"
 *                       wipMethodId: 2
 *                       wipMethodName: "WIP Method Name"
 *                       locationId: 3
 *                       locationName: "Location Name"
 *                       createdBy: "UserName"
 *                       modifiedBy: "UserName"
 *                       projectCreatedDate: "2024-09-24T12:00:00Z"
 *                       startDate: "2024-09-25T09:00:00Z"
 *                       endDate: "2025-09-25T17:00:00Z"
 *                       createdAt: "2024-09-24T12:00:00Z"
 *                       updatedAt: "2024-09-24T12:00:00Z"
 *                     - id: 2
 *                       customerId: "2"
 *                       customerNo: "CUST002"
 *                       customerName: "Another Customer"
 *                       sowId: 2
 *                       sowNo: "SOW00002"
 *                       projectNo: "SOW00002_001"
 *                       description: "Another project description"
 *                       projectPostingGroupId: 1
 *                       projectPostingGroupName: "Posting Group Name"
 *                       wipMethodId: 2
 *                       wipMethodName: "WIP Method Name"
 *                       locationId: 3
 *                       locationName: "Location Name"
 *                       createdBy: "UserName"
 *                       modifiedBy: "UserName"
 *                       projectCreatedDate: "2024-09-24T12:00:00Z"
 *                       startDate: "2024-09-25T09:00:00Z"
 *                       endDate: "2025-09-25T17:00:00Z"
 *                       createdAt: "2024-09-24T12:00:00Z"
 *                       updatedAt: "2024-09-24T12:00:00Z"
 *       400:
 *         description: Bad request. Please check the request parameters.
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: No projects found
 *       500:
 *         description: Internal server error
 */

router.get('/projects', projectController.getAllProjects);

/**
 * @swagger
 * /client/{clientId}/sow/{sowId}/project/{projectId}:
 *   patch:
 *     summary: Update an existing project under SOW
 *     tags: [Client-Service:Projects]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         description: Unique identifier of the Client to update the Project
 *         schema:
 *           type: string
 *       - in: path
 *         name: sowId
 *         required: true
 *       - in: path
 *         name: projectId
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The Project Description.
 *                 example: "The Project description."
 *               projectPostingGroupId:
 *                 type: integer
 *                 description: Project Posting Group Id.
 *                 example: 1001
 *               wipMethodId:
 *                   type: integer
 *                   description: Web Method Id.
 *                   example: 1002
 *               locationId:
 *                   type: integer
 *                   description: Location Id.
 *                   example: 1002
 *               projectCreatedDate:
 *                   type: string
 *                   description: Project Created Date.
 *                   format: date-time
 *                   example: "2024-08-29T14:00:00Z"
 *               startDate:
 *                   type: string
 *                   description: Project Start Date.
 *                   format: date-time
 *                   example: "2024-08-29T14:00:00Z"
 *               endDate:
 *                   type: string
 *                   description: Project End Date.
 *                   format: date-time
 *                   example: "2024-08-29T14:00:00Z"
 *               modifiedBy:
 *                   type: string
 *                   description: Project Created by in the system.
 *                   example: "sunil-inn"
 *           required:
 *                - description
 *                - modifiedBy
 * 
 *     responses:
 *       '200':
 *         description: SOW successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      type: number
 *                  description:
 *                      type: string
 *                      description: The Project Description.
 *                      example: "The Project description."
 *                  projectPostingGroupId:
 *                      type: integer
 *                      description: Project Posting Group Id.
 *                      example: 1001
 *                  wipMethodId:
 *                      type: integer
 *                      description: Web Method Id.
 *                      example: 1002
 *                  locationId:
 *                      type: integer
 *                      description: Location Id.
 *                      example: 1002
 *                  projectCreatedDate:
 *                      type: string
 *                      description: Project Created Date.
 *                      format: date-time
 *                      example: "2024-08-29T14:00:00Z"
 *                  startDate:
 *                      type: string
 *                      description: Project Start Date.
 *                      format: date-time
 *                      example: "2024-08-29T14:00:00Z"
 *                  endDate:
 *                      type: string
 *                      description: Project End Date.
 *                      format: date-time
 *                      example: "2024-08-29T14:00:00Z"
 *                  modifiedBy:
 *                      type: string
 *                      description: Project Created by in the system.
 *                      example: "sunil-inn"
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: SOW not found
 *       '500':
 *         description: Internal Server Error
 */

router.patch('/project/:projectId', projectController.updateProject);

export default router;
