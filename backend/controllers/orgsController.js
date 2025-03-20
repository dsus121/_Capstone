import asyncHandler from 'express-async-handler'
import Org from '../models/orgs.js'

const orgsController = {
  // get all organizations
  getOrganizationsByCause: asyncHandler(async (req, res) => {
    const { causeType } = req.query;
  
    console.log('Received causeType:', causeType); // de🪲 log
  
    if (!causeType) {
      res.status(400);
      throw new Error('Cause type is required');
    }
  
    // map causeType to causeCategory
    const causeTypeToCategoryMap = {
      cr: 'Community & Relationships',
      ea: 'Environmental Sustainability & Animal Welfare',
      hh: 'Holistic Health',
      pde: 'Personal Development & Education',
    };
  
    const causeCategory = causeTypeToCategoryMap[causeType];
  
    if (!causeCategory) {
      res.status(400);
      throw new Error('Invalid cause type');
    }
  
    // find using the mapped causeCategory
    const organizations = await Org.find({ causeCategory });

    console.log('Organizations returned:', organizations); // Debug log

  
    res.json(organizations);
  }),

  // add a new organization
  addOrganization: asyncHandler(async (req, res) => {
    const { orgName, ein, causeCategory, description, url, coloradoGivesUrl } = req.body;

    // check if the organization already exists
    const existingOrg = await Org.findOne({ ein });
    if (existingOrg) {
      res.status(400);
      throw new Error('Organization already exists');
    }

    // create a new organization
    const newOrg = new Org({
      orgName,
      ein,
      causeCategory,
      description,
      url,
      coloradoGivesUrl,
      active: true,
      lastUpdated: new Date(),
    });

    await newOrg.save();

    res.status(201).json({ message: 'Organization added successfully', organization: newOrg });
  }),

  // delete an organization by ID
  deleteOrganization: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const organization = await Org.findById(id);

    if (!organization) {
      res.status(404);
      throw new Error('Organization not found');
    }

    await organization.remove();

    res.status(200).json({ message: 'Organization deleted successfully' });
  }),
};

export default orgsController