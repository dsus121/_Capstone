import mongoose from "mongoose"

const orgSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: true,
    trim: true
  },
  causeCategory: {
    type: String,
    required: true,
    enum: ['Community & Relationships', 
        'Environmental Sustainability & Animal Welfare',
        'Holistic Health',
        'Personal Development & Education']
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  ein: {  // tax ID number and can serve as an ID
    type: String,
    required: false,
    // unique: false
  },
  coloradoGivesUrl: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Org = mongoose.model('Org', orgSchema);

export default Org