import mongoose from "mongoose";

const collection1Schema = new mongoose.Schema({
    message: String,
    timestamp: Date
  });
  export default mongoose.model('Collection1', collection1Schema);
  