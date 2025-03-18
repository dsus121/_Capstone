import mongoose from 'mongoose';
import Org from '../models/orgs.js';
import csv from 'csv-parser';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '../.env' });
const results = [];

console.log('MONGO_URI:', process.env.MONGO_URI);
    
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

const importOrgData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Create promise to read CSV data
    const csvReadPromise = new Promise((resolve) => {
      fs.createReadStream(path.join(__dirname, '../../data/CO_nonprofits.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve();
        });
    });
    
    // Wait for CSV parsing to finish
    await csvReadPromise;
    console.log(`Read ${results.length} items from CSV`);
    
    // Clear existing data (optional - remove if you want to keep existing records)
    await Org.deleteMany({});
    console.log('Existing data cleared');
    
    // Map CSV data to schema fields with unique placeholder EINs
    let placeholderEinCounter = 1;
    
    const orgDocuments = results.map(item => {
      // If EIN is missing, generate a unique placeholder
      let einValue = item.EIN && item.EIN.trim() !== '' 
        ? item.EIN 
        : `PLACEHOLDER-${placeholderEinCounter++}`;
      
      return {
        orgName: item['Organization Name'],
        ein: einValue,
        causeCategory: item.Cause,
        description: item.Description,
        url: item.URL || '',
        coloradoGivesUrl: item['ColoradoGives URL'] || '',
        active: true,
        lastUpdated: new Date()
      };
    });
    
    console.log(`Mapped ${orgDocuments.length} organizations`);
    console.log(`Generated ${placeholderEinCounter - 1} placeholder EINs for organizations with missing EIN values`);
    
    // Handle batch insertion
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < orgDocuments.length; i++) {
      try {
        const org = new Org(orgDocuments[i]);
        await org.save();
        successCount++;
      } catch (error) {
        failCount++;
        console.error(`\nFailed to insert document ${i}:`);
        console.error(`Organization: ${orgDocuments[i].orgName}`);
        console.error(`Error: ${error.message}`);
      }
    }
    
    console.log(`\nImport summary: ${successCount} succeeded, ${failCount} failed`);
    
    mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    mongoose.connection.close();
    process.exit(1);
  }
};

importOrgData();