import mongoose from 'mongoose';

const policyCarrierSchema = new mongoose.Schema({
  companyName: String
});

export default mongoose.model('PolicyCarrier', policyCarrierSchema);