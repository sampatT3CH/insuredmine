import mongoose from 'mongoose';

const policyCategorySchema = new mongoose.Schema({
  categoryName: String
});

export default mongoose.model('PolicyCategory', policyCategorySchema);