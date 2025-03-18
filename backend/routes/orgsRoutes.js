import express from 'express';
import orgsController from '../controllers/orgsController.js'; 

const router = express.Router();

// get all organizations
// router.get('/', orgsController.getAllOrganizations);

// get organizations by cause type
router.get('/by-cause', orgsController.getOrganizationsByCause); 

// add a new organization
router.post('/', orgsController.addOrganization);

// delete an organization by ID
router.delete('/:id', orgsController.deleteOrganization);

export default router;
