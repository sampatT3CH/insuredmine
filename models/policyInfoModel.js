import mongoose from 'mongoose';

const policyInfoSchema = new mongoose.Schema({
  policyNumber: String,
  policyStartDate: Date,
  policyEndDate: Date,
  policyCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PolicyCategory'
  },
  collectionId: String,
  companyCollectionId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('PolicyInfo', policyInfoSchema);